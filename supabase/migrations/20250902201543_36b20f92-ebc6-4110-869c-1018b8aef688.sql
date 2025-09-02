-- Criar função para atualizar timestamps primeiro
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Criar tabela para cache de consultas CNPJ e HTML renderizado
CREATE TABLE public.cnpj_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cnpj VARCHAR(14) NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  html_content TEXT NOT NULL,
  json_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '24 hours')
);

-- Criar índices para performance
CREATE INDEX idx_cnpj_cache_cnpj ON public.cnpj_cache(cnpj);
CREATE INDEX idx_cnpj_cache_slug ON public.cnpj_cache(slug);
CREATE INDEX idx_cnpj_cache_expires_at ON public.cnpj_cache(expires_at);

-- Função para limpar cache expirado
CREATE OR REPLACE FUNCTION public.cleanup_expired_cache()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.cnpj_cache 
  WHERE expires_at < now();
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at
CREATE TRIGGER update_cnpj_cache_updated_at
  BEFORE UPDATE ON public.cnpj_cache
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();