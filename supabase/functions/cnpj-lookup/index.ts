import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
      natureza_juridica: data.natureza_juridica,
      cnae_principal: {
        codigo: data.atividade_principal.codigo,
        descricao: data.atividade_principal.descricao
      },
      cnaes_secundarios: data.atividades_secundarias.map((atividade) => ({
        codigo: atividade.codigo,
        descricao: atividade.descricao
      })),
      endereco: {
        logradouro: data.endereco.logradouro,
        numero: data.endereco.numero,
        complemento: data.endereco.complemento,
        bairro: data.endereco.bairro,
        municipio: data.endereco.municipio,
        uf: data.endereco.uf,
        cep: data.endereco.cep
      },
      telefone: data.telefone1,
      email: data.email,
      data_abertura: data.data_inicio,
      capital_social: data.capital_social
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