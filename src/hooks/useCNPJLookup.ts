import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CNPJLookupResponse, CNPJLookupRequest } from '@/types/cnpj';
import { useToast } from '@/hooks/use-toast';

export const useCNPJLookup = () => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async ({ cnpj }: CNPJLookupRequest): Promise<CNPJLookupResponse> => {
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
        console.error('Erro na consulta CNPJ:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data.status === 'OK') {
        toast({
          title: "Empresa encontrada!",
          description: `Dados de ${data.razao_social || 'empresa'} carregados com sucesso.`,
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Erro na consulta",
        description: error.message || "Não foi possível consultar os dados da empresa.",
        variant: "destructive",
      });
    },
  });

  return {
    lookupCNPJ: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    reset: mutation.reset,
  };
};