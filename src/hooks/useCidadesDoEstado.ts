import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface CidadeInfo {
  municipio: string;
  count: number;
}

export const useCidadesDoEstado = (uf: string) => {
  return useQuery({
    queryKey: ['cidades-do-estado', uf],
    queryFn: async (): Promise<CidadeInfo[]> => {
      if (!uf) {
        return [];
      }

      try {
        // Buscar diretamente sem RPC function
        const { data, error } = await supabase
          .from('cnpj_public_cache')
          .select('json_data')
          .eq('json_data->endereco->>uf', uf.toUpperCase());

        if (error) {
          throw new Error(error.message);
        }

        // Agrupar e contar manualmente
        const cidadesMap = new Map<string, number>();
        data?.forEach(item => {
          const jsonData = item.json_data as any;
          const municipio = jsonData?.endereco?.municipio;
          if (municipio && typeof municipio === 'string') {
            cidadesMap.set(municipio, (cidadesMap.get(municipio) || 0) + 1);
          }
        });

        return Array.from(cidadesMap.entries())
          .map(([municipio, count]) => ({ municipio, count }))
          .sort((a, b) => b.count - a.count);
      } catch (error) {
        console.error('Erro ao buscar cidades:', error);
        throw error;
      }
    },
    enabled: !!uf,
    staleTime: 1000 * 60 * 15, // 15 minutos
    gcTime: 1000 * 60 * 30, // 30 minutos
  });
};