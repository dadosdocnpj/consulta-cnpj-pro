import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CNPJLookupResponse } from '@/types/cnpj';

export const useTopEmpresas = (limit: number = 10) => {
  return useQuery({
    queryKey: ['top-empresas', limit],
    queryFn: async (): Promise<CNPJLookupResponse[]> => {
      try {
        const { data, error } = await supabase
          .from('cnpj_cache')
          .select('json_data')
          .order('created_at', { ascending: false })
          .limit(limit);

        if (error) {
          throw new Error(error.message);
        }

        return data?.map(item => item.json_data as unknown as CNPJLookupResponse) || [];
      } catch (error) {
        console.error('Erro ao buscar top empresas:', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 15, // 15 minutos
    gcTime: 1000 * 60 * 30, // 30 minutos
  });
};