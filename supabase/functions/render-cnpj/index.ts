import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Interface para dados do CNPJ
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
  capital_social?: string;
  cnpj_formatado?: string;
  slug?: string;
  url_path?: string;
}

// Configurar cliente Supabase
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

function formatCNPJ(cnpj: string): string {
  const cleaned = cnpj.replace(/\D/g, '');
  
  if (cleaned.length !== 14) {
    throw new Error('CNPJ deve conter exatamente 14 dígitos');
  }
  
  return cleaned;
}

function generateSlug(razaoSocial: string, cnpj: string): string {
  const normalizedName = razaoSocial
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
    
  return `${cnpj}-${normalizedName}`;
}

function formatCNPJDisplay(cnpj: string): string {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

function formatDate(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  } catch {
    return dateStr;
  }
}

function generateHTML(data: CNPJData): string {
  const cnpjFormatted = formatCNPJDisplay(data.cnpj);
  const title = `${data.razao_social || 'Empresa'} - CNPJ: ${cnpjFormatted}`;
  const description = `Consulte os dados de ${data.razao_social || 'empresa'}, CNPJ ${cnpjFormatted}, em ${data.endereco?.municipio || ''}-${data.endereco?.uf || ''}. Atividade: ${data.cnae_principal?.descricao || 'Não informado'}.`;
  
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": data.razao_social || "Empresa",
    "identifier": cnpjFormatted,
    "address": data.endereco ? {
      "@type": "PostalAddress",
      "streetAddress": `${data.endereco.logradouro}, ${data.endereco.numero}`,
      "addressLocality": data.endereco.municipio,
      "addressRegion": data.endereco.uf,
      "postalCode": data.endereco.cep,
      "addressCountry": "BR"
    } : undefined,
    "foundingDate": data.data_abertura,
    "email": data.email,
    "telephone": data.telefone
  };

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pt_BR" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <link rel="canonical" href="https://ayyklhshzzfkutkrpipj.supabase.co/functions/v1/render-cnpj/${data.slug}" />
  <script type="application/ld+json">
    ${JSON.stringify(schemaOrg, null, 2)}
  </script>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 800px; 
      margin: 0 auto; 
      padding: 20px;
      line-height: 1.6;
      color: #333;
    }
    .header { border-bottom: 2px solid #e5e5e5; padding-bottom: 20px; margin-bottom: 30px; }
    .card { background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px; }
    .badge { background: #22c55e; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
    .badge.inactive { background: #ef4444; }
    h1 { color: #1f2937; margin: 0; }
    h2 { color: #374151; border-bottom: 1px solid #d1d5db; padding-bottom: 10px; }
    .cnpj { font-size: 18px; font-weight: bold; color: #059669; }
    .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
    .info-item { margin: 10px 0; }
    .info-label { font-weight: bold; color: #6b7280; display: block; }
    .info-value { margin-top: 4px; }
    address { font-style: normal; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${data.razao_social || 'Empresa'}</h1>
    <div class="cnpj">CNPJ: ${cnpjFormatted}</div>
    ${data.situacao_cadastral ? `<span class="badge ${data.situacao_cadastral.toLowerCase().includes('ativa') ? '' : 'inactive'}">${data.situacao_cadastral}</span>` : ''}
  </div>

  <main>
    <section class="card">
      <h2>Informações Básicas</h2>
      <div class="info-grid">
        ${data.razao_social ? `<div class="info-item">
          <span class="info-label">Razão Social</span>
          <div class="info-value">${data.razao_social}</div>
        </div>` : ''}
        
        ${data.nome_fantasia && data.nome_fantasia !== data.razao_social ? `<div class="info-item">
          <span class="info-label">Nome Fantasia</span>
          <div class="info-value">${data.nome_fantasia}</div>
        </div>` : ''}
        
        ${data.natureza_juridica ? `<div class="info-item">
          <span class="info-label">Natureza Jurídica</span>
          <div class="info-value">${data.natureza_juridica}</div>
        </div>` : ''}
        
        ${data.data_abertura ? `<div class="info-item">
          <span class="info-label">Data de Abertura</span>
          <div class="info-value">${formatDate(data.data_abertura)}</div>
        </div>` : ''}
        
        ${data.capital_social ? `<div class="info-item">
          <span class="info-label">Capital Social</span>
          <div class="info-value">R$ ${data.capital_social}</div>
        </div>` : ''}
      </div>
    </section>

    ${data.endereco ? `<section class="card">
      <h2>Endereço</h2>
      <address>
        <div class="info-item">
          <span class="info-label">Logradouro</span>
          <div class="info-value">${data.endereco.logradouro}, ${data.endereco.numero}${data.endereco.complemento ? ` - ${data.endereco.complemento}` : ''}</div>
        </div>
        <div class="info-item">
          <span class="info-label">Bairro</span>
          <div class="info-value">${data.endereco.bairro}</div>
        </div>
        <div class="info-item">
          <span class="info-label">Município/UF</span>
          <div class="info-value">${data.endereco.municipio} - ${data.endereco.uf}</div>
        </div>
        <div class="info-item">
          <span class="info-label">CEP</span>
          <div class="info-value">${data.endereco.cep}</div>
        </div>
      </address>
    </section>` : ''}

    ${(data.telefone || data.email) ? `<section class="card">
      <h2>Contato</h2>
      <div class="info-grid">
        ${data.telefone ? `<div class="info-item">
          <span class="info-label">Telefone</span>
          <div class="info-value">${data.telefone}</div>
        </div>` : ''}
        
        ${data.email ? `<div class="info-item">
          <span class="info-label">Email</span>
          <div class="info-value">${data.email}</div>
        </div>` : ''}
      </div>
    </section>` : ''}

    ${data.cnae_principal ? `<section class="card">
      <h2>Atividades Econômicas</h2>
      <div class="info-item">
        <span class="info-label">CNAE Principal</span>
        <div class="info-value">
          <strong>${data.cnae_principal.codigo}</strong> - ${data.cnae_principal.descricao}
        </div>
      </div>
      
      ${data.cnaes_secundarios && data.cnaes_secundarios.length > 0 ? `
        <div class="info-item" style="margin-top: 20px;">
          <span class="info-label">CNAEs Secundários</span>
          <div class="info-value">
            ${data.cnaes_secundarios.map(cnae => `<div><strong>${cnae.codigo}</strong> - ${cnae.descricao}</div>`).join('')}
          </div>
        </div>
      ` : ''}
    </section>` : ''}
  </main>

  <footer style="margin-top: 40px; text-align: center; color: #6b7280; font-size: 14px;">
    <p>Dados obtidos via consulta oficial. Última atualização: ${new Date().toLocaleDateString('pt-BR')}</p>
  </footer>
</body>
</html>`;
}

async function getCNPJData(cnpj: string): Promise<CNPJData> {
  console.log(`Buscando dados para CNPJ: ${cnpj}`);
  
  // Tentar buscar no cache primeiro
  const { data: cached } = await supabase
    .from('cnpj_cache')
    .select('json_data, expires_at')
    .eq('cnpj', cnpj)
    .gte('expires_at', new Date().toISOString())
    .single();

  if (cached) {
    console.log('Dados encontrados no cache');
    return cached.json_data as CNPJData;
  }

  // Buscar da API externa via cnpj-lookup
  console.log('Consultando API externa...');
  const { data, error } = await supabase.functions.invoke('cnpj-lookup', {
    body: { cnpj }
  });

  if (error) {
    throw new Error(`Erro ao consultar CNPJ: ${error.message}`);
  }

  if (!data || data.status === 'ERROR') {
    throw new Error('CNPJ não encontrado ou inválido');
  }

  return data as CNPJData;
}

async function saveToCache(data: CNPJData, htmlContent: string) {
  try {
    await supabase
      .from('cnpj_cache')
      .upsert({
        cnpj: data.cnpj,
        slug: data.slug,
        html_content: htmlContent,
        json_data: data,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24h
      });
    console.log('Dados salvos no cache');
  } catch (error) {
    console.error('Erro ao salvar no cache:', error);
  }
}

serve(async (req) => {
  const url = new URL(req.url);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extrair slug da URL (/functions/v1/render-cnpj/28812425000114-empresa-nome)
    const pathParts = url.pathname.split('/');
    const slug = pathParts[pathParts.length - 1];
    
    if (!slug || slug === 'render-cnpj') {
      return new Response('Slug não fornecido', { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      });
    }

    console.log(`Renderizando página para slug: ${slug}`);

    // Verificar se existe no cache primeiro
    const { data: cached } = await supabase
      .from('cnpj_cache')
      .select('html_content, expires_at')
      .eq('slug', slug)
      .gte('expires_at', new Date().toISOString())
      .single();

    if (cached) {
      console.log('HTML encontrado no cache');
      return new Response(cached.html_content, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600', // 1 hora
          ...corsHeaders
        }
      });
    }

    // Extrair CNPJ do slug
    const cnpjMatch = slug.match(/^(\d{14})/);
    if (!cnpjMatch) {
      return new Response('Formato de slug inválido', { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      });
    }

    const cnpj = cnpjMatch[1];
    
    // Buscar dados do CNPJ
    const cnpjData = await getCNPJData(cnpj);
    
    // Gerar HTML
    const htmlContent = generateHTML(cnpjData);
    
    // Salvar no cache para próximas requisições
    await saveToCache(cnpjData, htmlContent);
    
    console.log('HTML gerado e salvo no cache');

    return new Response(htmlContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // 1 hora
        ...corsHeaders
      }
    });

  } catch (error) {
    console.error('Erro na renderização:', error);
    
    // Retornar página de erro em HTML
    const errorHTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <title>Erro - Consulta CNPJ</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px;">
  <h1>Erro na Consulta</h1>
  <p>Não foi possível carregar os dados da empresa. ${error.message}</p>
  <a href="/" style="color: #059669;">← Voltar para busca</a>
</body>
</html>`;

    return new Response(errorHTML, {
      status: 500,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        ...corsHeaders
      }
    });
  }
});