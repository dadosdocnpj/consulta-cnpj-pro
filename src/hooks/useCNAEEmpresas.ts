import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CNPJLookupResponse } from '@/types/cnpj';

export const useCNAEEmpresas = (cnaeCode: string, page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: ['cnae-empresas', cnaeCode, page, limit],
    queryFn: async (): Promise<{ empresas: CNPJLookupResponse[], total: number }> => {
      if (!cnaeCode) {
        return { empresas: [], total: 0 };
      }

      try {
        // Buscar empresas que tenham esse CNAE no cache
        const { data, error, count } = await supabase
          .from('cnpj_cache')
          .select('json_data', { count: 'exact' })
          .or(`json_data->'cnae_principal'->>'codigo'.eq.${cnaeCode},json_data->'cnaes_secundarios' @> '${JSON.stringify([{codigo: cnaeCode}])}'`)
          .range((page - 1) * limit, page * limit - 1)
          .order('created_at', { ascending: false });

        if (error) {
          throw new Error(error.message);
        }

        const empresas = data?.map(item => item.json_data as unknown as CNPJLookupResponse) || [];
        
        return {
          empresas,
          total: count || 0
        };
      } catch (error) {
        console.error('Erro ao buscar empresas por CNAE:', error);
        throw error;
      }
    },
    enabled: !!cnaeCode,
    staleTime: 1000 * 60 * 10, // 10 minutos
    gcTime: 1000 * 60 * 20, // 20 minutos
  });
};