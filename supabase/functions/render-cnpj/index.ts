import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

// Rate limiting storage
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10;

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

// HTML sanitization function
function escapeHtml(unsafe: string): string {
  if (typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Enhanced CNPJ validation
function formatCNPJ(cnpj: string): string {
  if (!cnpj || typeof cnpj !== 'string') {
    throw new Error('CNPJ inválido');
  }
  
  const cleaned = cnpj.replace(/\D/g, '');
  
  if (cleaned.length !== 14) {
    throw new Error('CNPJ deve conter exatamente 14 dígitos');
  }
  
  // Basic CNPJ validation algorithm
  if (!/^\d{14}$/.test(cleaned) || /^(\d)\1{13}$/.test(cleaned)) {
    throw new Error('CNPJ com formato inválido');
  }
  
  return cleaned;
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

function generateSlug(razaoSocial: string, cnpj: string): string {
  if (!razaoSocial || !cnpj) return '';
  
  const sanitizedRazaoSocial = escapeHtml(razaoSocial);
  const normalizedName = sanitizedRazaoSocial
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100); // Limit length
    
  return `${cnpj}-${normalizedName}`;
}

// Validate slug format
function validateSlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string') return false;
  
  // Check for potential injection attempts
  if (slug.includes('<') || slug.includes('>') || slug.includes('&') || 
      slug.includes('"') || slug.includes("'") || slug.includes('script')) {
    return false;
  }
  
  // Must start with 14 digits followed by hyphen
  return /^(\d{14})-[a-z0-9\-]{1,100}$/.test(slug);
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
  
  // Sanitize all user data before including in HTML
  const safeRazaoSocial = escapeHtml(data.razao_social || 'Empresa');
  const safeNomeFantasia = data.nome_fantasia ? escapeHtml(data.nome_fantasia) : null;
  const safeNaturezaJuridica = data.natureza_juridica ? escapeHtml(data.natureza_juridica) : null;
  const safeSituacaoCadastral = data.situacao_cadastral ? escapeHtml(data.situacao_cadastral) : null;
  const safeDataAbertura = data.data_abertura ? escapeHtml(data.data_abertura) : null;
  const safeCapitalSocial = data.capital_social ? escapeHtml(data.capital_social) : null;
  const safeTelefone = data.telefone ? escapeHtml(data.telefone) : null;
  const safeEmail = data.email ? escapeHtml(data.email) : null;
  
  const title = `${safeRazaoSocial} - CNPJ: ${cnpjFormatted}`;
  const description = `Consulte os dados de ${safeRazaoSocial}, CNPJ ${cnpjFormatted}, em ${data.endereco?.municipio ? escapeHtml(data.endereco.municipio) : ''}-${data.endereco?.uf ? escapeHtml(data.endereco.uf) : ''}. Atividade: ${data.cnae_principal?.descricao ? escapeHtml(data.cnae_principal.descricao) : 'Não informado'}.`;
  
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": safeRazaoSocial,
    "identifier": cnpjFormatted,
    "address": data.endereco ? {
      "@type": "PostalAddress",
      "streetAddress": `${escapeHtml(data.endereco.logradouro || '')}, ${escapeHtml(data.endereco.numero || '')}`,
      "addressLocality": escapeHtml(data.endereco.municipio || ''),
      "addressRegion": escapeHtml(data.endereco.uf || ''),
      "postalCode": escapeHtml(data.endereco.cep || ''),
      "addressCountry": "BR"
    } : undefined,
    "foundingDate": safeDataAbertura,
    "email": safeEmail,
    "telephone": safeTelefone
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
  <link rel="canonical" href="https://dadosdocnpj.com.br/${data.slug}/" />
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
    <h1>${safeRazaoSocial}</h1>
    <div class="cnpj">CNPJ: ${cnpjFormatted}</div>
    ${safeSituacaoCadastral ? `<span class="badge ${safeSituacaoCadastral.toLowerCase().includes('ativa') ? '' : 'inactive'}">${safeSituacaoCadastral}</span>` : ''}
  </div>

  <main>
    <section class="card">
      <h2>Informações Básicas</h2>
      <div class="info-grid">
        ${safeRazaoSocial && safeRazaoSocial !== 'Empresa' ? `<div class="info-item">
          <span class="info-label">Razão Social</span>
          <div class="info-value">${safeRazaoSocial}</div>
        </div>` : ''}
        
        ${safeNomeFantasia && safeNomeFantasia !== safeRazaoSocial ? `<div class="info-item">
          <span class="info-label">Nome Fantasia</span>
          <div class="info-value">${safeNomeFantasia}</div>
        </div>` : ''}
        
        ${safeNaturezaJuridica ? `<div class="info-item">
          <span class="info-label">Natureza Jurídica</span>
          <div class="info-value">${safeNaturezaJuridica}</div>
        </div>` : ''}
        
        ${safeDataAbertura ? `<div class="info-item">
          <span class="info-label">Data de Abertura</span>
          <div class="info-value">${formatDate(safeDataAbertura)}</div>
        </div>` : ''}
        
        ${safeCapitalSocial ? `<div class="info-item">
          <span class="info-label">Capital Social</span>
          <div class="info-value">R$ ${safeCapitalSocial}</div>
        </div>` : ''}
      </div>
    </section>

    ${data.endereco ? `<section class="card">
      <h2>Endereço</h2>
      <address>
        <div class="info-item">
          <span class="info-label">Logradouro</span>
          <div class="info-value">${escapeHtml(data.endereco.logradouro || '')}, ${escapeHtml(data.endereco.numero || '')}${data.endereco.complemento ? ` - ${escapeHtml(data.endereco.complemento)}` : ''}</div>
        </div>
        <div class="info-item">
          <span class="info-label">Bairro</span>
          <div class="info-value">${escapeHtml(data.endereco.bairro || '')}</div>
        </div>
        <div class="info-item">
          <span class="info-label">Município/UF</span>
          <div class="info-value">${escapeHtml(data.endereco.municipio || '')} - ${escapeHtml(data.endereco.uf || '')}</div>
        </div>
        <div class="info-item">
          <span class="info-label">CEP</span>
          <div class="info-value">${escapeHtml(data.endereco.cep || '')}</div>
        </div>
      </address>
    </section>` : ''}

    ${(safeTelefone || safeEmail) ? `<section class="card">
      <h2>Contato</h2>
      <div class="info-grid">
        ${safeTelefone ? `<div class="info-item">
          <span class="info-label">Telefone</span>
          <div class="info-value">${safeTelefone}</div>
        </div>` : ''}
        
        ${safeEmail ? `<div class="info-item">
          <span class="info-label">Email</span>
          <div class="info-value">${safeEmail}</div>
        </div>` : ''}
      </div>
    </section>` : ''}

    ${data.cnae_principal ? `<section class="card">
      <h2>Atividades Econômicas</h2>
      <div class="info-item">
        <span class="info-label">CNAE Principal</span>
        <div class="info-value">
          <strong>${escapeHtml(data.cnae_principal.codigo || '')}</strong> - ${escapeHtml(data.cnae_principal.descricao || '')}
        </div>
      </div>
      
      ${data.cnaes_secundarios && data.cnaes_secundarios.length > 0 ? `
        <div class="info-item" style="margin-top: 20px;">
          <span class="info-label">CNAEs Secundários</span>
          <div class="info-value">
            ${data.cnaes_secundarios.map(cnae => `<div><strong>${escapeHtml(cnae.codigo || '')}</strong> - ${escapeHtml(cnae.descricao || '')}</div>`).join('')}
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
    // Filter sensitive data before saving to public cache
    const filteredData = {
      cnpj: data.cnpj,
      cnpj_formatado: data.cnpj_formatado,
      razao_social: data.razao_social,
      nome_fantasia: data.nome_fantasia,
      situacao_cadastral: data.situacao_cadastral,
      data_situacao_cadastral: data.data_situacao_cadastral,
      data_abertura: data.data_abertura,
      natureza_juridica: data.natureza_juridica,
      cnae_principal: data.cnae_principal,
      cnaes_secundarios: data.cnaes_secundarios,
      endereco: data.endereco ? {
        uf: data.endereco.uf,
        municipio: data.endereco.municipio,
        bairro: data.endereco.bairro
        // Removed: logradouro, numero, complemento, cep
      } : undefined,
      slug: data.slug,
      url_path: data.url_path,
      status: data.status
      // Removed: capital_social, email, telefone
    };

    // Save full data to sensitive cache (restricted access)
    await supabase
      .from('cnpj_cache')
      .upsert({
        cnpj: data.cnpj,
        slug: data.slug,
        html_content: htmlContent,
        json_data: data,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      });

    // Save filtered data to public cache
    await supabase
      .from('cnpj_public_cache')
      .upsert({
        cnpj: data.cnpj,
        slug: data.slug,
        html_content: htmlContent,
        json_data: filteredData,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      });

    console.log('Dados salvos no cache público e privado');
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
    // Rate limiting based on client IP
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    if (!checkRateLimit(clientIP)) {
      return new Response('Too Many Requests', { 
        status: 429,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'text/plain',
          'Retry-After': '60'
        }
      });
    }

    // Extrair slug da URL (/functions/v1/render-cnpj/28812425000114-empresa-nome)
    const pathParts = url.pathname.split('/');
    const slug = pathParts[pathParts.length - 1];
    
    if (!slug || slug === 'render-cnpj') {
      return new Response('Recurso não encontrado', { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      });
    }

    // Validate slug format for security
    if (!validateSlug(slug)) {
      return new Response('Parâmetro inválido', { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      });
    }

    console.log(`Renderizando página para slug validado: ${slug.substring(0, 20)}...`);

    // Verificar se existe no cache público primeiro
    const { data: cached } = await supabase
      .from('cnpj_public_cache')
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

    // Extrair e validar CNPJ do slug
    const cnpjMatch = slug.match(/^(\d{14})/);
    if (!cnpjMatch) {
      return new Response('Formato inválido', { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      });
    }

    const cnpj = formatCNPJ(cnpjMatch[1]); // This will validate the CNPJ
    
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
    // Enhanced error logging without exposing sensitive details
    console.error('Erro na renderização:', {
      message: error.message,
      timestamp: new Date().toISOString(),
      clientIP: req.headers.get('x-forwarded-for') || 'unknown'
    });
    
    // Generic error message to prevent information disclosure
    const safeErrorMessage = error.message.includes('CNPJ') 
      ? 'Dados da empresa não encontrados' 
      : 'Serviço temporariamente indisponível';
    
    // Retornar página de erro em HTML
    const errorHTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <title>Erro - Consulta CNPJ</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px;">
  <h1>Erro na Consulta</h1>
  <p>${escapeHtml(safeErrorMessage)}</p>
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