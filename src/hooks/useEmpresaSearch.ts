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
  const [lastQuery, setLastQuery] = useState<string>('');

  const searchEmpresas = useCallback(async (query: string, limit: number = 10) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      setError(null);
      return;
    }

    // Evitar busca duplicada
    if (query === lastQuery && suggestions.length > 0) {
      return;
    }

    setIsSearching(true);
    setError(null);
    setLastQuery(query);

    try {
      const { data, error } = await supabase.functions.invoke('empresa-search', {
        body: { query, limit }
      });

      if (error) {
        console.error('Erro na função empresa-search:', error);
        throw new Error(error.message || 'Erro na busca');
      }

      console.log('Resposta da busca:', data);
      
      if (data?.suggestions) {
        setSuggestions(data.suggestions);
        
        // Log para debugging
        if (data.suggestions.length === 0) {
          console.log('Nenhuma empresa encontrada para:', query);
        } else {
          console.log(`${data.suggestions.length} empresas encontradas para:`, query);
        }
      } else {
        setSuggestions([]);
        setError('Resposta inválida do servidor');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido na busca';
      console.error('Erro na busca de empresas:', errorMessage);
      setError(errorMessage);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  }, [lastQuery, suggestions.length]);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setError(null);
    setLastQuery('');
  }, []);

  return {
    suggestions,
    isSearching,
    error,
    searchEmpresas,
    clearSuggestions
  };
};