import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface EstadoCount {
  uf: string;
  count: number;
}

export const useContadoresEstados = () => {
  return useQuery({
    queryKey: ['contadores-estados'],
    queryFn: async (): Promise<EstadoCount[]> => {
      try {
        // Buscar diretamente sem RPC function
        const { data, error } = await supabase
          .from('cnpj_cache')
          .select('json_data')
          .limit(10000); // Limitar para evitar sobrecarga

        if (error) {
          throw new Error(error.message);
        }

        // Agrupar e contar manualmente
        const estadosMap = new Map<string, number>();
        data?.forEach(item => {
          const jsonData = item.json_data as any;
          const uf = jsonData?.endereco?.uf;
          if (uf && typeof uf === 'string') {
            estadosMap.set(uf, (estadosMap.get(uf) || 0) + 1);
          }
        });

        return Array.from(estadosMap.entries())
          .map(([uf, count]) => ({ uf, count }))
          .sort((a, b) => a.uf.localeCompare(b.uf));
      } catch (error) {
        console.error('Erro ao buscar contadores de estados:', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 20, // 20 minutos
    gcTime: 1000 * 60 * 40, // 40 minutos
  });
};