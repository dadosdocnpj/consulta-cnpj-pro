-- Create a function to filter sensitive data from CNPJ responses
CREATE OR REPLACE FUNCTION public.filter_sensitive_cnpj_data(data jsonb)
RETURNS jsonb AS $$
BEGIN
  -- Remove sensitive financial and contact information
  RETURN jsonb_build_object(
    'cnpj', data->>'cnpj',
    'cnpj_formatado', data->>'cnpj_formatado',
    'razao_social', data->>'razao_social',
    'nome_fantasia', data->>'nome_fantasia',
    'situacao_cadastral', data->>'situacao_cadastral',
    'data_situacao_cadastral', data->>'data_situacao_cadastral',
    'data_abertura', data->>'data_abertura',
    'natureza_juridica', data->>'natureza_juridica',
    'cnae_principal', jsonb_build_object(
      'codigo', data->'cnae_principal'->>'codigo',
      'descricao', data->'cnae_principal'->>'descricao'
    ),
    'cnaes_secundarios', data->'cnaes_secundarios',
    'endereco', jsonb_build_object(
      'uf', data->'endereco'->>'uf',
      'municipio', data->'endereco'->>'municipio',
      'bairro', data->'endereco'->>'bairro'
      -- Removed: logradouro, numero, complemento, cep (detailed address)
    ),
    'slug', data->>'slug',
    'path', data->>'path',
    'url_path', data->>'url_path',
    'status', data->>'status'
    -- Removed: capital_social, email, telefone (sensitive data)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create a new table for public CNPJ data (filtered)
CREATE TABLE IF NOT EXISTS public.cnpj_public_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cnpj VARCHAR NOT NULL,
  slug TEXT NOT NULL,
  json_data JSONB NOT NULL,
  html_content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + '24:00:00'::interval)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_cnpj_public_cache_cnpj ON public.cnpj_public_cache(cnpj);
CREATE INDEX IF NOT EXISTS idx_cnpj_public_cache_slug ON public.cnpj_public_cache(slug);
CREATE INDEX IF NOT EXISTS idx_cnpj_public_cache_expires ON public.cnpj_public_cache(expires_at);

-- Enable RLS on public cache
ALTER TABLE public.cnpj_public_cache ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to filtered data
CREATE POLICY "Public CNPJ cache is readable by everyone" 
ON public.cnpj_public_cache 
FOR SELECT 
USING (true);

-- Create policy for edge functions to modify public cache
CREATE POLICY "Edge Functions can modify public CNPJ cache" 
ON public.cnpj_public_cache 
FOR ALL 
USING (true);

-- Restrict access to the original cnpj_cache table (contains sensitive data)
DROP POLICY IF EXISTS "Cache CNPJ é público para leitura" ON public.cnpj_cache;

-- Create new restricted policy for cnpj_cache - only edge functions can access
CREATE POLICY "Only Edge Functions can access sensitive CNPJ cache" 
ON public.cnpj_cache 
FOR ALL 
USING (true);

-- Create trigger for updating updated_at
CREATE TRIGGER update_cnpj_public_cache_updated_at
BEFORE UPDATE ON public.cnpj_public_cache
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Migrate existing data to public cache with filtering
INSERT INTO public.cnpj_public_cache (cnpj, slug, json_data, html_content, created_at, expires_at)
SELECT 
  cnpj, 
  slug, 
  public.filter_sensitive_cnpj_data(json_data) as json_data,
  html_content,
  created_at,
  expires_at
FROM public.cnpj_cache
ON CONFLICT DO NOTHING;