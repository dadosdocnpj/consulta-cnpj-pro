import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CNPJLookupResponse } from '@/types/cnpj';

export const useEmpresasRecentes = (limit: number = 20) => {
  return useQuery({
    queryKey: ['empresas-recentes', limit],
    queryFn: async (): Promise<CNPJLookupResponse[]> => {
      try {
        const { data, error } = await supabase
          .from('cnpj_public_cache')
          .select('json_data')
          .order('created_at', { ascending: false })
          .limit(limit);

        if (error) {
          throw new Error(error.message);
        }

        return data?.map(item => item.json_data as unknown as CNPJLookupResponse) || [];
      } catch (error) {
        console.error('Erro ao buscar empresas recentes:', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 15, // 15 minutos
  });
};