import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CNAEHierarchy {
  secao: {
    id: string;
    codigo: string;
    nome: string;
    slug: string;
  } | null;
  divisao: {
    id: string;
    codigo: string;
    nome: string;
    slug: string;
  } | null;
  grupo: {
    id: string;
    codigo: string;
    nome: string;
    slug: string;
  } | null;
  classe: {
    id: string;
    codigo: string;
    nome: string;
    slug: string;
  } | null;
  subclasse: {
    id: string;
    codigo: string;
    nome: string;
    slug: string;
  } | null;
}

export const useCNAEHierarchy = (cnaeCode: string) => {
  return useQuery({
    queryKey: ['cnae-hierarchy', cnaeCode],
    queryFn: async (): Promise<CNAEHierarchy> => {
      if (!cnaeCode) {
        return { secao: null, divisao: null, grupo: null, classe: null, subclasse: null };
      }

      try {
        // Buscar a subclasse CNAE
        const { data: subclasse, error: subclasseError } = await supabase
          .from('cnaes_subclasses')
          .select(`
            id,
            codigo,
            nome,
            slug,
            classe_id
          `)
          .eq('codigo', cnaeCode)
          .single();

        if (subclasseError || !subclasse) {
          return { secao: null, divisao: null, grupo: null, classe: null, subclasse: null };
        }

        // Buscar a classe
        const { data: classe, error: classeError } = await supabase
          .from('cnaes_classes')
          .select(`
            id,
            codigo,
            nome,
            slug,
            grupo_id
          `)
          .eq('id', subclasse.classe_id)
          .single();

        if (classeError || !classe) {
          return { secao: null, divisao: null, grupo: null, classe: null, subclasse };
        }

        // Buscar o grupo
        const { data: grupo, error: grupoError } = await supabase
          .from('cnaes_grupos')
          .select(`
            id,
            codigo,
            nome,
            slug,
            divisao_id
          `)
          .eq('id', classe.grupo_id)
          .single();

        if (grupoError || !grupo) {
          return { secao: null, divisao: null, grupo: null, classe, subclasse };
        }

        // Buscar a divisão
        const { data: divisao, error: divisaoError } = await supabase
          .from('cnaes_divisoes')
          .select(`
            id,
            codigo,
            nome,
            slug,
            secao_id
          `)
          .eq('id', grupo.divisao_id)
          .single();

        if (divisaoError || !divisao) {
          return { secao: null, divisao: null, grupo, classe, subclasse };
        }

        // Buscar a seção
        const { data: secao, error: secaoError } = await supabase
          .from('cnaes_secoes')
          .select(`
            id,
            codigo,
            nome,
            slug
          `)
          .eq('id', divisao.secao_id)
          .single();

        if (secaoError) {
          return { secao: null, divisao, grupo, classe, subclasse };
        }

        return {
          secao,
          divisao,
          grupo,
          classe,
          subclasse
        };

      } catch (error) {
        console.error('Erro ao buscar hierarquia CNAE:', error);
        return { secao: null, divisao: null, grupo: null, classe: null, subclasse: null };
      }
    },
    enabled: !!cnaeCode,
    staleTime: 1000 * 60 * 15, // 15 minutos
    gcTime: 1000 * 60 * 30, // 30 minutos
  });
};