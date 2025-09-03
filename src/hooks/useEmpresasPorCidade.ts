import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CNPJLookupResponse } from '@/types/cnpj';

export const useEmpresasPorCidade = (uf: string, cidade: string, page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: ['empresas-por-cidade', uf, cidade, page, limit],
    queryFn: async (): Promise<{ empresas: CNPJLookupResponse[], total: number }> => {
      if (!uf || !cidade) {
        return { empresas: [], total: 0 };
      }

      try {
        const { data, error, count } = await supabase
          .from('cnpj_cache')
          .select('json_data', { count: 'exact' })
          .eq('json_data->endereco->>uf', uf.toUpperCase())
          .eq('json_data->endereco->>municipio', cidade)
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
        console.error('Erro ao buscar empresas por cidade:', error);
        throw error;
      }
    },
    enabled: !!uf && !!cidade,
    staleTime: 1000 * 60 * 10, // 10 minutos
    gcTime: 1000 * 60 * 20, // 20 minutos
  });
};