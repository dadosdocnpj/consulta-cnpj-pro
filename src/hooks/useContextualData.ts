import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ContextualData {
  cnaeStats: {
    totalEmpresas: number;
    empresasNaCidade: number;
    empresasNoEstado: number;
  };
  regionalStats: {
    principaisCnaes: Array<{
      codigo: string;
      nome: string;
      total: number;
    }>;
    cidadeInfo: {
      totalEmpresas: number;
      principalSetor: string;
    };
    estadoInfo: {
      totalEmpresas: number;
      ranking: number;
    };
  };
}

export const useContextualData = (cnaeCode?: string, cidade?: string, uf?: string) => {
  return useQuery({
    queryKey: ['contextual-data', cnaeCode, cidade, uf],
    queryFn: async (): Promise<ContextualData> => {
      try {
        // Inicializar dados padrão
        const contextualData: ContextualData = {
          cnaeStats: {
            totalEmpresas: 0,
            empresasNaCidade: 0,
            empresasNoEstado: 0,
          },
          regionalStats: {
            principaisCnaes: [],
            cidadeInfo: {
              totalEmpresas: 0,
              principalSetor: 'N/A',
            },
            estadoInfo: {
              totalEmpresas: 0,
              ranking: 0,
            },
          },
        };

        // Buscar dados do CNAE específico
        if (cnaeCode) {
          // Total de empresas com este CNAE
          const { data: cnaeSubclasse } = await supabase
            .from('cnaes_subclasses')
            .select('total_empresas')
            .eq('codigo', cnaeCode)
            .single();

          if (cnaeSubclasse) {
            contextualData.cnaeStats.totalEmpresas = cnaeSubclasse.total_empresas || 0;
          }

          // Simular contagem por cidade e estado (como não temos tabela de empresas)
          // Em um cenário real, você faria joins com uma tabela de empresas
          if (cidade && uf) {
            // Estimativa baseada no total nacional
            const baseCount = contextualData.cnaeStats.totalEmpresas;
            contextualData.cnaeStats.empresasNoEstado = Math.floor(baseCount * 0.15); // ~15% no estado
            contextualData.cnaeStats.empresasNaCidade = Math.floor(baseCount * 0.03); // ~3% na cidade
          }
        }

        // Buscar principais CNAEs (top 5)
        const { data: principaisCnaes } = await supabase
          .from('cnaes_subclasses')
          .select('codigo, nome, total_empresas')
          .order('total_empresas', { ascending: false })
          .limit(5);

        if (principaisCnaes) {
          contextualData.regionalStats.principaisCnaes = principaisCnaes.map(cnae => ({
            codigo: cnae.codigo,
            nome: cnae.nome,
            total: cnae.total_empresas || 0,
          }));
        }

        // Estatísticas simuladas da cidade
        if (cidade && uf) {
          // Em um cenário real, estes dados viriam de agregações das empresas reais
          const totalEstimadoCidade = Math.floor(Math.random() * 50000) + 10000;
          contextualData.regionalStats.cidadeInfo = {
            totalEmpresas: totalEstimadoCidade,
            principalSetor: contextualData.regionalStats.principaisCnaes[0]?.nome || 'Comércio',
          };

          // Ranking estimado da cidade no estado
          contextualData.regionalStats.estadoInfo = {
            totalEmpresas: totalEstimadoCidade * 8, // Estimativa do estado
            ranking: Math.floor(Math.random() * 20) + 1, // Ranking entre 1-20
          };
        }

        return contextualData;
      } catch (error) {
        console.error('Erro ao buscar dados contextuais:', error);
        return {
          cnaeStats: {
            totalEmpresas: 0,
            empresasNaCidade: 0,
            empresasNoEstado: 0,
          },
          regionalStats: {
            principaisCnaes: [],
            cidadeInfo: {
              totalEmpresas: 0,
              principalSetor: 'N/A',
            },
            estadoInfo: {
              totalEmpresas: 0,
              ranking: 0,
            },
          },
        };
      }
    },
    enabled: true,
    staleTime: 1000 * 60 * 10, // 10 minutos
    gcTime: 1000 * 60 * 30, // 30 minutos
  });
};

// Hook para buscar empresas similares (simulado)
export const useSimilarCompanies = (cnaeCode?: string, cidade?: string, uf?: string) => {
  return useQuery({
    queryKey: ['similar-companies', cnaeCode, cidade, uf],
    queryFn: async () => {
      // Simular empresas similares
      // Em um cenário real, você buscaria no cache de CNPJs ou em uma tabela de empresas
      const similarCompanies = [
        {
          cnpj: '11222333000145',
          razao_social: 'Empresa Similar A Ltda',
          nome_fantasia: 'Similar A',
          cidade: cidade || 'São Paulo',
          uf: uf || 'SP',
          situacao: 'ATIVA',
        },
        {
          cnpj: '11222333000246',
          razao_social: 'Empresa Similar B Ltda',
          nome_fantasia: 'Similar B',
          cidade: cidade || 'São Paulo',
          uf: uf || 'SP',
          situacao: 'ATIVA',
        },
        {
          cnpj: '11222333000347',
          razao_social: 'Empresa Similar C Ltda',
          nome_fantasia: 'Similar C',
          cidade: cidade || 'São Paulo',
          uf: uf || 'SP',
          situacao: 'ATIVA',
        },
      ];

      return similarCompanies;
    },
    enabled: !!cnaeCode,
    staleTime: 1000 * 60 * 15, // 15 minutos
    gcTime: 1000 * 60 * 30, // 30 minutos
  });
};