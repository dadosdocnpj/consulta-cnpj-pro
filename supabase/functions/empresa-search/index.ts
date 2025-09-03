import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SearchRequest {
  query: string;
  limit?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { query, limit = 10 }: SearchRequest = await req.json();

    if (!query || query.length < 2) {
      return new Response(
        JSON.stringify({ suggestions: [], message: 'Query muito curta' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Buscando empresas com query:', query);

    // Escape caracteres especiais para busca segura
    const escapedQuery = query.replace(/[%_]/g, '\\$&');
    
    // Buscar por nome da empresa (ILIKE para busca aproximada)
    const { data, error } = await supabaseClient
      .from('cnpj_cache')
      .select('json_data, cnpj, slug')
      .or(`json_data->>'razao_social'.ilike.%${escapedQuery}%,json_data->>'nome_fantasia'.ilike.%${escapedQuery}%`)
      .limit(limit)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro na busca:', error);
      throw error;
    }

    const suggestions = data?.map(item => {
      const empresa = item.json_data as any;
      return {
        cnpj: item.cnpj,
        slug: item.slug,
        razao_social: empresa.razao_social,
        nome_fantasia: empresa.nome_fantasia,
        cnae_principal: empresa.cnae_principal?.texto,
        situacao: empresa.situacao,
        uf: empresa.uf,
        municipio: empresa.municipio
      };
    }) || [];

    console.log('Encontradas', suggestions.length, 'empresas');

    return new Response(
      JSON.stringify({ 
        suggestions,
        total: suggestions.length,
        query: query 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Erro na função empresa-search:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        suggestions: [] 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});