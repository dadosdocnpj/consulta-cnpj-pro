import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
};

// Rate limiting storage
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20;

// Interface para a resposta da API Invertexto
interface InvertextoAPIResponse {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  natureza_juridica: string;
  capital_social: string;
  data_inicio: string;
  porte: string;
  tipo: string;
  telefone1: string;
  telefone2?: string;
  email: string;
  situacao: {
    nome: string;
    data: string;
    motivo: string;
  };
  endereco: {
    tipo_logradouro: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    uf: string;
    municipio: string;
  };
  atividade_principal: {
    codigo: string;
    descricao: string;
  };
  atividades_secundarias: Array<{
    codigo: string;
    descricao: string;
  }>;
  status?: string;
}

// Rate limiting function
function checkRateLimit(clientIP: string): boolean {
  const now = Date.now();
  const clientData = requestCounts.get(clientIP);
  
  if (!clientData || now > clientData.resetTime) {
    requestCounts.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  clientData.count++;
  return true;
}

// Enhanced CNPJ validation
function formatCNPJ(cnpj: string): string {
  if (!cnpj || typeof cnpj !== 'string') {
    throw new Error('CNPJ inválido');
  }
  
  // Remove todos os caracteres não numéricos
  const cleanCNPJ = cnpj.replace(/\D/g, '');
  
  // Verifica se tem 14 dígitos
  if (cleanCNPJ.length !== 14) {
    throw new Error('CNPJ deve ter 14 dígitos');
  }
  
  // Basic CNPJ validation algorithm
  if (!/^\d{14}$/.test(cleanCNPJ) || /^(\d)\1{13}$/.test(cleanCNPJ)) {
    throw new Error('CNPJ com formato inválido');
  }
  
  return cleanCNPJ;
}

function generateSlug(razaoSocial: string, cnpj: string): string {
  const cleanName = razaoSocial
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .replace(/^-|-$/g, ''); // Remove hífens do início e fim
  
  return `${cnpj}-${cleanName}`;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting based on client IP
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({ 
          error: 'Muitas requisições. Tente novamente em alguns instantes.' 
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': '60'
          } 
        }
      );
    }

    const { cnpj } = await req.json();
    
    if (!cnpj) {
      return new Response(
        JSON.stringify({ error: 'CNPJ é obrigatório' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Formatar e validar CNPJ
    let formattedCNPJ: string;
    try {
      formattedCNPJ = formatCNPJ(cnpj);
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Buscar token da API
    const apiToken = Deno.env.get('INVERTEXTO_API_TOKEN');
    if (!apiToken) {
      console.error('INVERTEXTO_API_TOKEN não configurado');
      return new Response(
        JSON.stringify({ error: 'Configuração de API não encontrada' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Consultar API da Invertexto
    console.log(`Consultando CNPJ: ${formattedCNPJ.substring(0, 8)}...`);
    const apiUrl = `https://api.invertexto.com/v1/cnpj/${formattedCNPJ}?token=${apiToken}`;
    
    const response = await fetch(apiUrl);
    const data: InvertextoAPIResponse = await response.json();

    console.log('Resposta da API:', response.status);

    if (!response.ok || !data.cnpj) {
      return new Response(
        JSON.stringify({ 
          error: 'CNPJ não encontrado ou inválido',
          details: data
        }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Normalizar dados da API Invertexto para o formato esperado pelo frontend
    const normalizedData = {
      status: 'OK',
      cnpj: formattedCNPJ,
      razao_social: data.razao_social,
      nome_fantasia: data.nome_fantasia,
      situacao_cadastral: data.situacao.nome,
      data_situacao_cadastral: data.situacao.data,
      motivo_situacao_cadastral: data.situacao.motivo,
      natureza_juridica: data.natureza_juridica,
      porte: data.porte,
      tipo: data.tipo,
      cnae_principal: {
        codigo: data.atividade_principal.codigo,
        descricao: data.atividade_principal.descricao
      },
      cnaes_secundarios: data.atividades_secundarias.map((atividade) => ({
        codigo: atividade.codigo,
        descricao: atividade.descricao
      })),
      endereco: {
        tipo_logradouro: data.endereco.tipo_logradouro,
        logradouro: data.endereco.logradouro,
        numero: data.endereco.numero,
        complemento: data.endereco.complemento,
        bairro: data.endereco.bairro,
        municipio: data.endereco.municipio,
        uf: data.endereco.uf,
        cep: data.endereco.cep
      },
      telefone: data.telefone1,
      telefone2: data.telefone2,
      email: data.email,
      data_abertura: data.data_inicio,
      capital_social: data.capital_social,
      regime_tributario: data.regime_tributario
    };

    // Gerar slug para URL amigável
    const slug = normalizedData.razao_social ? generateSlug(normalizedData.razao_social, formattedCNPJ) : formattedCNPJ;

    // Retornar dados processados
    const processedData = {
      ...normalizedData,
      cnpj_formatado: formattedCNPJ.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5'),
      slug,
      url_path: `/${slug}/`,
      path: `/${slug}/`
    };

    // Cache the complete data in the private cache (with sensitive info)
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      try {
        // Store in private cache with full data
        await supabase
          .from('cnpj_cache')
          .upsert({
            cnpj: formattedCNPJ,
            json_data: processedData,
            html_content: '',
            slug: slug,
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          }, { onConflict: 'cnpj' });

        // Store in public cache - the trigger will automatically filter sensitive data
        await supabase
          .from('cnpj_public_cache')
          .upsert({
            cnpj: formattedCNPJ,
            json_data: processedData, // Will be filtered by the trigger
            html_content: '',
            slug: slug,
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          }, { onConflict: 'cnpj' });

        console.log(`Dados cachados para CNPJ: ${formattedCNPJ.substring(0, 8)}...`);
      } catch (cacheError) {
        console.error('Erro ao cachear dados:', cacheError);
        // Don't fail the request if caching fails
      }
    }

    return new Response(
      JSON.stringify(processedData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    // Enhanced error logging without exposing sensitive details
    console.error('Erro na função cnpj-lookup:', {
      message: error.message,
      timestamp: new Date().toISOString(),
      clientIP: req.headers.get('x-forwarded-for') || 'unknown'
    });
    
    // Generic error message to prevent information disclosure
    const safeErrorMessage = error.message.includes('CNPJ') || error.message.includes('formato')
      ? 'CNPJ inválido ou não encontrado'
      : 'Serviço temporariamente indisponível';
    
    return new Response(
      JSON.stringify({ 
        error: safeErrorMessage
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});