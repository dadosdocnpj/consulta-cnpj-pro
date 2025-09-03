import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface CNAESecao {
  id: string;
  codigo: string;
  nome: string;
  descricao: string;
  icone: string;
  slug: string;
  total_empresas: number;
}

interface CNAEDivisao {
  id: string;
  codigo: string;
  nome: string;
  descricao: string;
  slug: string;
  secao_id: string;
  total_empresas: number;
}

interface CNAEGrupo {
  id: string;
  codigo: string;
  nome: string;
  descricao: string;
  slug: string;
  divisao_id: string;
  total_empresas: number;
}

interface CNAEClasse {
  id: string;
  codigo: string;
  nome: string;
  descricao: string;
  slug: string;
  grupo_id: string;
  total_empresas: number;
}

interface CNAESubclasse {
  id: string;
  codigo: string;
  nome: string;
  descricao: string;
  slug: string;
  classe_id: string;
  total_empresas: number;
  is_principal: boolean;
}

// Hook para buscar todas as seções CNAEs
export const useCNAESecoes = () => {
  return useQuery({
    queryKey: ['cnae-secoes'],
    queryFn: async (): Promise<CNAESecao[]> => {
      const { data, error } = await supabase
        .from('cnaes_secoes')
        .select('*')
        .order('codigo');

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
    staleTime: 1000 * 60 * 10, // 10 minutos
    gcTime: 1000 * 60 * 30, // 30 minutos
  });
};

// Hook para buscar divisões por seção
export const useCNAEDivisoes = (secaoId?: string) => {
  return useQuery({
    queryKey: ['cnae-divisoes', secaoId],
    queryFn: async (): Promise<CNAEDivisao[]> => {
      let query = supabase
        .from('cnaes_divisoes')
        .select('*')
        .order('codigo');

      if (secaoId) {
        query = query.eq('secao_id', secaoId);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
    enabled: true,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};

// Hook para buscar grupos por divisão
export const useCNAEGrupos = (divisaoId?: string) => {
  return useQuery({
    queryKey: ['cnae-grupos', divisaoId],
    queryFn: async (): Promise<CNAEGrupo[]> => {
      let query = supabase
        .from('cnaes_grupos')
        .select('*')
        .order('codigo');

      if (divisaoId) {
        query = query.eq('divisao_id', divisaoId);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
    enabled: true,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};

// Hook para buscar classes por grupo
export const useCNAEClasses = (grupoId?: string) => {
  return useQuery({
    queryKey: ['cnae-classes', grupoId],
    queryFn: async (): Promise<CNAEClasse[]> => {
      let query = supabase
        .from('cnaes_classes')
        .select('*')
        .order('codigo');

      if (grupoId) {
        query = query.eq('grupo_id', grupoId);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
    enabled: true,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};

// Hook para buscar subclasses por classe
export const useCNAESubclasses = (classeId?: string) => {
  return useQuery({
    queryKey: ['cnae-subclasses', classeId],
    queryFn: async (): Promise<CNAESubclasse[]> => {
      let query = supabase
        .from('cnaes_subclasses')
        .select('*')
        .order('codigo');

      if (classeId) {
        query = query.eq('classe_id', classeId);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
    enabled: true,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};

// Hook para importar CNAEs
export const useImportarCNAEs = () => {
  return useQuery({
    queryKey: ['importar-cnaes'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('importar-cnaes');
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    enabled: false, // Só executa quando chamado manualmente
    retry: false,
  });
};

// Hook para buscar CNAE por slug
export const useCNAEBySlug = (slug: string, tipo: 'secao' | 'divisao' | 'grupo' | 'classe' | 'subclasse') => {
  return useQuery({
    queryKey: ['cnae-by-slug', slug, tipo],
    queryFn: async () => {
      let tabela: string;
      switch (tipo) {
        case 'secao': tabela = 'cnaes_secoes'; break;
        case 'divisao': tabela = 'cnaes_divisoes'; break;
        case 'grupo': tabela = 'cnaes_grupos'; break;
        case 'classe': tabela = 'cnaes_classes'; break;
        case 'subclasse': tabela = 'cnaes_subclasses'; break;
        default: throw new Error('Tipo de CNAE inválido');
      }
      
      const { data, error } = await supabase
        .from(tabela as any)
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!slug && !!tipo,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};