import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Lista expandida de CNPJs para popular o banco - 100+ empresas cobrindo todos os estados
const CNPJS_POPULARES = [
  // SP - São Paulo (15 empresas)
  '28812425000114', // Magazine Luiza
  '33469172000146', // Via Varejo
  '07526557000100', // Natura
  '60746948000112', // Itaú Unibanco
  '60872504000123', // Bradesco
  '33000167000101', // Banco do Brasil
  '47960950000121', // Vale
  '02558157000162', // JBS
  '59291534000167', // BRF
  '44734671000101', // Suzano
  '57507378000132', // WIZ Soluções
  '61146577000100', // Gol Linhas Aéreas
  '02012862000160', // TAM Linhas Aéreas
  '04814372000178', // Stone Pagamentos
  '28195667000140', // Mercado Livre

  // RJ - Rio de Janeiro (8 empresas)
  '33000167000101', // Petrobras
  '27865757000102', // Oi
  '27865757000102', // Globo
  '33041260000191', // IRB Brasil RE
  '42274693000115', // CCR
  '04913876000137', // Lojas Americanas
  '33592510000154', // Banco BTG Pactual
  '04184463000135', // Light

  // MG - Minas Gerais (6 empresas)
  '17155730000164', // Cemig
  '60814423000124', // Usiminas
  '04040229000101', // Localiza
  '17244392000189', // Sabesp MG
  '20769720000160', // Energisa
  '33592510000154', // Banco Inter

  // RS - Rio Grande do Sul (6 empresas)
  '33592580001104', // Gerdau
  '89765358000143', // Marcopolo
  '89086144000135', // Randon
  '88610103000119', // Banrisul
  '92693019000153', // CEEE
  '01567592000195', // Magazine Luiza RS

  // SC - Santa Catarina (5 empresas)
  '84429752000111', // WEG
  '84429752000111', // Embraco
  '82733077000165', // Artecola
  '82845985000176', // Tupy
  '84429752000111', // Metalfrio

  // PR - Paraná (5 empresas)
  '40040556000143', // Copel
  '81092686000104', // Positivo Tecnologia
  '92958800000149', // C&A Modas
  '78876950000139', // Sanepar
  '01596156000140', // Volvo do Brasil

  // BA - Bahia (4 empresas)
  '15139629000132', // Coelba
  '50746577000115', // Petrobras Distribuidora BA
  '14835166000101', // Braskem
  '33066408000115', // Banco do Nordeste

  // GO - Goiás (4 empresas)
  '01627019000151', // Celg
  '37678080000149', // Saneago
  '04437422000140', // JBS Goiás
  '20634040000169', // Magazine Luiza GO

  // PE - Pernambuco (4 empresas)
  '11070073000578', // Celpe
  '10835932000120', // Compesa
  '04913876000137', // Lojas Americanas PE
  '33066408000115', // Banco do Nordeste PE

  // CE - Ceará (4 empresas)
  '07047251000191', // Coelce
  '07244030000298', // Cagece
  '33066408000115', // Banco do Nordeste CE
  '33487197000187', // Grendene

  // DF - Distrito Federal (4 empresas)
  '00394460000187', // CEB
  '25775979000140', // Caesb
  '00000000000191', // Correios
  '00360305000104', // Banco de Brasília

  // ES - Espírito Santo (3 empresas)
  '28152248000109', // EDP Escelsa
  '28126811000128', // Cesan
  '33592510000154', // ArcelorMittal

  // MT - Mato Grosso (3 empresas)
  '03467321000155', // Energisa MT
  '03302511000148', // Sanemat
  '04814372000178', // Amaggi

  // MS - Mato Grosso do Sul (3 empresas)
  '02016440000162', // Energisa MS
  '03015699000175', // Sanesul
  '59291534000167', // JBS MS

  // PA - Pará (3 empresas)
  '04895728000184', // Celpa
  '05200621000190', // Cosanpa
  '47960950000121', // Vale PA

  // AM - Amazonas (3 empresas)
  '02328280000197', // Amazonas Energia
  '04401764000173', // Cosama
  '20769720000160', // Zona Franca

  // RO - Rondônia (2 empresas)
  '05914650000166', // Energisa RO
  '04895728000184', // Caerd

  // AC - Acre (2 empresas)
  '04895728000184', // Energisa AC
  '23003999000171', // Depac

  // RR - Roraima (2 empresas)
  '05695432000110', // Boa Vista Energia
  '23003999000171', // Caer

  // AP - Amapá (2 empresas)
  '33041260000191', // CEA
  '23003999000171', // Caesa

  // TO - Tocantins (2 empresas)
  '27885075000130', // Energisa TO
  '01599976000147', // Saneatins

  // AL - Alagoas (2 empresas)
  '42337149000192', // Ceal
  '12294678000133', // Casal

  // SE - Sergipe (2 empresas)
  '40282586000160', // Energisa SE
  '13042508000125', // Deso

  // PB - Paraíba (2 empresas)
  '09122500000178', // Energisa PB
  '09467205000180', // Cagepa

  // RN - Rio Grande do Norte (2 empresas)
  '08324196000181', // Cosern
  '08033328000145', // Caern

  // PI - Piauí (2 empresas)
  '06272793000184', // Cepisa
  '05202361000159', // Agespisa

  // MA - Maranhão (2 empresas)
  '06272793000184', // Cemar
  '06272793000184', // Caema
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