import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Lista de CNPJs para popular o banco
const CNPJS_POPULARES = [
  '28812425000114',
  '33469172000146', 
  '07526557000100',
  '07777777000187',
  '19131243000197',
  '02940525000142',
  '04252011000110',
  '33147118000150',
  '48764634000182',
  '08800887000100',
  '03994461000188',
  '00000000000191',
  '00476595000110',
  '00230506000135',
  '00776574000160',
  '08187168000160',
  '07270748000120',
  '60811295000141',
  '61585838000117',
  '53016911000190'
];

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Iniciando população do cache CNPJ...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    const results = {
      processed: 0,
      success: 0,
      skipped: 0,
      errors: 0,
      errorDetails: [] as string[]
    };

    // Processar cada CNPJ
    for (const cnpj of CNPJS_POPULARES.slice(0, 50)) {
      try {
        console.log(`📋 Processando CNPJ: ${cnpj}`);
        results.processed++;

        // Verificar se já existe no cache
        const { data: existing } = await supabase
          .from('cnpj_cache')
          .select('cnpj')
          .eq('cnpj', cnpj)
          .single();

        if (existing) {
          console.log(`⏭️ CNPJ ${cnpj} já existe no cache, pulando...`);
          results.skipped++;
          continue;
        }

        // Buscar dados via cnpj-lookup function
        const { data: cnpjData, error: lookupError } = await supabase.functions.invoke('cnpj-lookup', {
          body: { cnpj }
        });

        if (lookupError || !cnpjData || cnpjData.status !== 'OK') {
          const errorMsg = `Erro ao buscar CNPJ ${cnpj}: ${lookupError?.message || 'Dados inválidos'}`;
          console.error(`❌ ${errorMsg}`);
          results.errors++;
          results.errorDetails.push(errorMsg);
          continue;
        }

        // Gerar slug
        const razaoSocial = cnpjData.razao_social || cnpjData.nome_fantasia || 'empresa';
        const slug = `${cnpj}-${slugify(razaoSocial)}`;

        // Gerar HTML content via render-cnpj function
        const { data: htmlData, error: renderError } = await supabase.functions.invoke('render-cnpj', {
          body: cnpjData
        });

        const htmlContent = renderError ? `<h1>${razaoSocial}</h1><p>CNPJ: ${cnpj}</p>` : (htmlData || '');

        // Inserir no cache
        const { error: insertError } = await supabase
          .from('cnpj_cache')
          .insert({
            cnpj,
            slug,
            json_data: cnpjData,
            html_content: htmlContent,
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24h TTL
          });

        if (insertError) {
          const errorMsg = `Erro ao inserir CNPJ ${cnpj}: ${insertError.message}`;
          console.error(`❌ ${errorMsg}`);
          results.errors++;
          results.errorDetails.push(errorMsg);
          continue;
        }

        console.log(`✅ CNPJ ${cnpj} (${razaoSocial}) inserido com sucesso!`);
        results.success++;

        // Delay pequeno para evitar sobrecarga
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        const errorMsg = `Erro inesperado ao processar CNPJ ${cnpj}: ${error.message}`;
        console.error(`❌ ${errorMsg}`);
        results.errors++;
        results.errorDetails.push(errorMsg);
      }
    }

    console.log('🎉 População do cache finalizada!');
    console.log(`📊 Resultados: ${results.success} sucessos, ${results.skipped} pulados, ${results.errors} erros de ${results.processed} processados`);

    return new Response(JSON.stringify({
      message: 'População do cache CNPJ finalizada',
      results,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    console.error('❌ Erro geral na população do cache:', error);
    return new Response(JSON.stringify({ 
      error: 'Erro interno na população do cache',
      message: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});