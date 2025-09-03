import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CNPJLookupResponse } from '@/types/cnpj';

export const useEmpresasPorCategoria = (categoria: 'startups' | 'publicas', limit: number = 20) => {
  return useQuery({
    queryKey: ['empresas-por-categoria', categoria, limit],
    queryFn: async (): Promise<CNPJLookupResponse[]> => {
      try {
        let query = supabase
          .from('cnpj_cache')
          .select('json_data')
          .limit(limit);

        if (categoria === 'startups') {
          // Filtrar por CNAEs típicos de startups tecnológicas
          query = query.or(
            'json_data->atividade_principal->>codigo.like.62%,' +
            'json_data->atividade_principal->>codigo.like.63%,' +
            'json_data->atividade_principal->>codigo.like.58%,' +
            'json_data->atividade_principal->>codigo.like.72%'
          );
        } else if (categoria === 'publicas') {
          // Filtrar por natureza jurídica de empresas públicas
          query = query.or(
            'json_data->>natureza_juridica.ilike.%administra%publ%,' +
            'json_data->>natureza_juridica.ilike.%empresa%publ%,' +
            'json_data->>natureza_juridica.ilike.%autarqu%,' +
            'json_data->>natureza_juridica.ilike.%fundacao%publ%'
          );
        }

        query = query.order('created_at', { ascending: false });

        const { data, error } = await query;

        if (error) {
          throw new Error(error.message);
        }

        return data?.map(item => item.json_data as unknown as CNPJLookupResponse) || [];
      } catch (error) {
        console.error('Erro ao buscar empresas por categoria:', error);
        throw error;
      }
    },
    enabled: !!categoria,
    staleTime: 1000 * 60 * 20, // 20 minutos
    gcTime: 1000 * 60 * 40, // 40 minutos
  });
};