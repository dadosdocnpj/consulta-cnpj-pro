import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CNPJLookupResponse } from '@/types/cnpj';

export const useEmpresasPorEstado = (uf: string) => {
  return useQuery({
    queryKey: ['empresas-por-estado', uf],
    queryFn: async (): Promise<{ empresas: CNPJLookupResponse[], total: number }> => {
      if (!uf) {
        return { empresas: [], total: 0 };
      }

      try {
        const { data, error, count } = await supabase
          .from('cnpj_cache')
          .select('json_data', { count: 'exact' })
          .eq('json_data->endereco->>uf', uf.toUpperCase())
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
        console.error('Erro ao buscar empresas por estado:', error);
        throw error;
      }
    },
    enabled: !!uf,
    staleTime: 1000 * 60 * 10, // 10 minutos
    gcTime: 1000 * 60 * 20, // 20 minutos
  });
};