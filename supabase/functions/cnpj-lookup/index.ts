import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CNPJData {
  status: string;
  cnpj: string;
  razao_social?: string;
  nome_fantasia?: string;
  situacao_cadastral?: string;
  data_situacao_cadastral?: string;
  natureza_juridica?: string;
  cnae_principal?: {
    codigo: string;
    descricao: string;
  };
  cnaes_secundarios?: Array<{
    codigo: string;
    descricao: string;
  }>;
  endereco?: {
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    municipio: string;
    uf: string;
    cep: string;
  };
  telefone?: string;
  email?: string;
  data_abertura?: string;
  regime_tributario?: string;
  capital_social?: string;
}

function formatCNPJ(cnpj: string): string {
  // Remove todos os caracteres não numéricos
  const cleanCNPJ = cnpj.replace(/\D/g, '');
  
  // Verifica se tem 14 dígitos
  if (cleanCNPJ.length !== 14) {
    throw new Error('CNPJ deve ter 14 dígitos');
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
    console.log(`Consultando CNPJ: ${formattedCNPJ}`);
    const apiUrl = `https://api.invertexto.com/v1/cnpj/${formattedCNPJ}?token=${apiToken}`;
    
    const response = await fetch(apiUrl);
    const data: CNPJData = await response.json();

    console.log('Resposta da API:', data.status);

    if (data.status === 'ERROR' || !response.ok) {
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

    // Gerar slug para URL amigável
    const slug = data.razao_social ? generateSlug(data.razao_social, formattedCNPJ) : formattedCNPJ;

    // Retornar dados processados
    const processedData = {
      ...data,
      cnpj_formatado: formattedCNPJ.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5'),
      slug,
      url_path: `/${slug}/`
    };

    return new Response(
      JSON.stringify(processedData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Erro na função cnpj-lookup:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno do servidor',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});