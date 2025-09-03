-- Fase 1: Limpeza dos dados inválidos

-- Limpar subclasses órfãs
DELETE FROM public.cnaes_subclasses 
WHERE classe_id NOT IN (SELECT id FROM public.cnaes_classes);

-- Limpar classes órfãs
DELETE FROM public.cnaes_classes 
WHERE grupo_id NOT IN (SELECT id FROM public.cnaes_grupos);

-- Limpar grupos órfãos
DELETE FROM public.cnaes_grupos 
WHERE divisao_id NOT IN (SELECT id FROM public.cnaes_divisoes);

-- Limpar divisões órfãs
DELETE FROM public.cnaes_divisoes 
WHERE secao_id NOT IN (SELECT id FROM public.cnaes_secoes);

-- Remover seções inválidas (códigos numéricos 0-9)
DELETE FROM public.cnaes_secoes 
WHERE codigo ~ '^[0-9]$';

-- Resetar contadores para nova importação
UPDATE public.cnaes_secoes SET total_empresas = 0;
UPDATE public.cnaes_divisoes SET total_empresas = 0;
UPDATE public.cnaes_grupos SET total_empresas = 0;
UPDATE public.cnaes_classes SET total_empresas = 0;
UPDATE public.cnaes_subclasses SET total_empresas = 0;