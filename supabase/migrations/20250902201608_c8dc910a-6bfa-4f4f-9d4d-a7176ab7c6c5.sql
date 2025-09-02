-- Habilitar RLS na tabela cnpj_cache
ALTER TABLE public.cnpj_cache ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir leitura pública dos dados de cache
-- (necessário para Edge Functions funcionarem sem autenticação)
CREATE POLICY "Cache CNPJ é público para leitura" 
ON public.cnpj_cache 
FOR SELECT 
USING (true);

-- Criar política para permitir inserção e atualização pelos Edge Functions
CREATE POLICY "Edge Functions podem modificar cache" 
ON public.cnpj_cache 
FOR ALL 
USING (true);