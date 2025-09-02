import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CNPJLookupResponse } from '@/types/cnpj';

export const useCNPJBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['cnpj-by-slug', slug],
    queryFn: async (): Promise<CNPJLookupResponse> => {
      if (!slug) {
        throw new Error('Slug não fornecido');
      }

      // Extrair CNPJ do slug (formato: cnpj-nome-da-empresa)
      const cnpjMatch = slug.match(/^(\d{14})/);
      if (!cnpjMatch) {
        throw new Error('Formato de slug inválido');
      }

      const cnpj = cnpjMatch[1];

      try {
        const { data, error } = await supabase.functions.invoke('cnpj-lookup', {
          body: { cnpj }
        });

        if (error) {
          throw new Error(error.message || 'Erro ao consultar CNPJ');
        }

        if (!data || data.status === 'ERROR') {
          throw new Error('CNPJ não encontrado ou inválido');
        }

        return data as CNPJLookupResponse;
      } catch (error) {
        console.error('Erro na consulta CNPJ por slug:', error);
        throw error;
      }
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 15, // 15 minutos
    gcTime: 1000 * 60 * 30, // 30 minutos
    retry: 1,
  });
};