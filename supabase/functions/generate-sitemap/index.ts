import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get all states
    const { data: estados } = await supabase
      .from('contadores_estados')
      .select('uf')
      .order('uf');

    // Get top cities for each state (limit to prevent huge sitemap)
    const { data: cidades } = await supabase
      .from('cidades_com_empresas')
      .select('cidade, uf')
      .order('total_empresas', { ascending: false })
      .limit(500); // Top 500 cities

    // Get main CNAE sections
    const { data: cnaes } = await supabase
      .from('cnaes')
      .select('codigo, secao, divisao, grupo, classe, subclasse')
      .order('codigo')
      .limit(1000); // Top 1000 CNAEs

    const baseUrl = 'https://dadosdocnpj.com.br';
    const today = new Date().toISOString().split('T')[0];

    // Build sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/estados</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/cnae</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/ranking/top-empresas</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/empresas-recentes</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/categoria/startups</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/categoria/publicas</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;

    // Add state pages
    if (estados) {
      for (const estado of estados) {
        sitemap += `
  <url>
    <loc>${baseUrl}/estados/${estado.uf}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
      }
    }

    // Add city pages
    if (cidades) {
      for (const cidade of cidades) {
        const citySlug = cidade.cidade
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9\-]/g, '')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        
        sitemap += `
  <url>
    <loc>${baseUrl}/estados/${cidade.uf}/${citySlug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`;
      }
    }

    // Add CNAE pages
    if (cnaes) {
      const addedSections = new Set();
      const addedDivisoes = new Set();
      const addedGrupos = new Set();
      const addedClasses = new Set();
      
      for (const cnae of cnaes) {
        // Add section pages
        if (cnae.secao && !addedSections.has(cnae.secao)) {
          addedSections.add(cnae.secao);
          sitemap += `
  <url>
    <loc>${baseUrl}/cnae/secao/${cnae.secao}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
        }

        // Add division pages
        if (cnae.divisao && !addedDivisoes.has(cnae.divisao)) {
          addedDivisoes.add(cnae.divisao);
          sitemap += `
  <url>
    <loc>${baseUrl}/cnae/divisao/${cnae.divisao}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>`;
        }

        // Add group pages
        if (cnae.grupo && !addedGrupos.has(cnae.grupo)) {
          addedGrupos.add(cnae.grupo);
          sitemap += `
  <url>
    <loc>${baseUrl}/cnae/grupo/${cnae.grupo}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>`;
        }

        // Add class pages
        if (cnae.classe && !addedClasses.has(cnae.classe)) {
          addedClasses.add(cnae.classe);
          sitemap += `
  <url>
    <loc>${baseUrl}/cnae/classe/${cnae.classe}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>`;
        }

        // Add subclass pages (individual CNAE codes)
        if (cnae.subclasse) {
          sitemap += `
  <url>
    <loc>${baseUrl}/cnae/subclasse/${cnae.subclasse}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>`;
        }
      }
    }

    sitemap += `
</urlset>`;

    return new Response(sitemap, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to generate sitemap' }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});