import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface CidadeInfo {
  municipio: string;
  uf: string;
  count: number;
}

export const useCidadesComEmpresas = () => {
  return useQuery({
    queryKey: ['cidades-com-empresas'],
    queryFn: async (): Promise<CidadeInfo[]> => {
      try {
        // Buscar todas as cidades que têm empresas
        const { data, error } = await supabase
          .from('cnpj_public_cache')
          .select('json_data')
          .limit(5000); // Limitar para performance

        if (error) {
          throw new Error(error.message);
        }

        // Agrupar e contar por cidade
        const cidadesMap = new Map<string, { uf: string; count: number }>();
        data?.forEach(item => {
          const jsonData = item.json_data as any;
          const municipio = jsonData?.endereco?.municipio;
          const uf = jsonData?.endereco?.uf;
          
          if (municipio && uf && typeof municipio === 'string' && typeof uf === 'string') {
            const key = `${municipio}-${uf}`;
            const existing = cidadesMap.get(key);
            cidadesMap.set(key, {
              uf,
              count: (existing?.count || 0) + 1
            });
          }
        });

        return Array.from(cidadesMap.entries())
          .map(([key, info]) => {
            const [municipio, uf] = key.split('-');
            return { municipio, uf, count: info.count };
          })
          .sort((a, b) => b.count - a.count);
      } catch (error) {
        console.error('Erro ao buscar cidades com empresas:', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 30, // 30 minutos
    gcTime: 1000 * 60 * 60, // 1 hora
  });
};