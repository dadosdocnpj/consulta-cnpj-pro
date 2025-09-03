import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface EmpresaSuggestion {
  cnpj: string;
  slug: string;
  razao_social: string;
  nome_fantasia?: string;
  cnae_principal?: string;
  situacao: string;
  uf: string;
  municipio: string;
}

interface SearchResult {
  suggestions: EmpresaSuggestion[];
  total: number;
  query: string;
}

export const useEmpresaSearch = () => {
  const [suggestions, setSuggestions] = useState<EmpresaSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchEmpresas = useCallback(async (query: string, limit: number = 10) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('empresa-search', {
        body: { query, limit }
      });

      if (error) {
        throw new Error(error.message || 'Erro na busca');
      }

      setSuggestions(data?.suggestions || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido na busca';
      setError(errorMessage);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setError(null);
  }, []);

  return {
    suggestions,
    isSearching,
    error,
    searchEmpresas,
    clearSuggestions
  };
};