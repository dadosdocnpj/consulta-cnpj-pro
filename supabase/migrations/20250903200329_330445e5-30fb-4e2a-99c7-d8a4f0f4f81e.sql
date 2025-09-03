-- Criar tabelas para estrutura completa dos CNAEs brasileiros

-- Tabela de seções CNAEs (A-U)
CREATE TABLE public.cnaes_secoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL UNIQUE,
  nome TEXT NOT NULL,
  descricao TEXT,
  icone TEXT,
  slug TEXT NOT NULL UNIQUE,
  total_empresas INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de divisões CNAEs
CREATE TABLE public.cnaes_divisoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL UNIQUE,
  nome TEXT NOT NULL,
  descricao TEXT,
  slug TEXT NOT NULL UNIQUE,
  secao_id UUID NOT NULL REFERENCES public.cnaes_secoes(id) ON DELETE CASCADE,
  total_empresas INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de grupos CNAEs
CREATE TABLE public.cnaes_grupos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL UNIQUE,
  nome TEXT NOT NULL,
  descricao TEXT,
  slug TEXT NOT NULL UNIQUE,
  divisao_id UUID NOT NULL REFERENCES public.cnaes_divisoes(id) ON DELETE CASCADE,
  total_empresas INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de classes CNAEs
CREATE TABLE public.cnaes_classes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL UNIQUE,
  nome TEXT NOT NULL,
  descricao TEXT,
  slug TEXT NOT NULL UNIQUE,
  grupo_id UUID NOT NULL REFERENCES public.cnaes_grupos(id) ON DELETE CASCADE,
  total_empresas INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de subclasses CNAEs (códigos de 7 dígitos)
CREATE TABLE public.cnaes_subclasses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL UNIQUE,
  nome TEXT NOT NULL,
  descricao TEXT,
  slug TEXT NOT NULL UNIQUE,
  classe_id UUID NOT NULL REFERENCES public.cnaes_classes(id) ON DELETE CASCADE,
  total_empresas INTEGER DEFAULT 0,
  is_principal BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Índices para otimização
CREATE INDEX idx_cnaes_secoes_codigo ON public.cnaes_secoes(codigo);
CREATE INDEX idx_cnaes_secoes_slug ON public.cnaes_secoes(slug);
CREATE INDEX idx_cnaes_divisoes_codigo ON public.cnaes_divisoes(codigo);
CREATE INDEX idx_cnaes_divisoes_slug ON public.cnaes_divisoes(slug);
CREATE INDEX idx_cnaes_divisoes_secao ON public.cnaes_divisoes(secao_id);
CREATE INDEX idx_cnaes_grupos_codigo ON public.cnaes_grupos(codigo);
CREATE INDEX idx_cnaes_grupos_slug ON public.cnaes_grupos(slug);
CREATE INDEX idx_cnaes_grupos_divisao ON public.cnaes_grupos(divisao_id);
CREATE INDEX idx_cnaes_classes_codigo ON public.cnaes_classes(codigo);
CREATE INDEX idx_cnaes_classes_slug ON public.cnaes_classes(slug);
CREATE INDEX idx_cnaes_classes_grupo ON public.cnaes_classes(grupo_id);
CREATE INDEX idx_cnaes_subclasses_codigo ON public.cnaes_subclasses(codigo);
CREATE INDEX idx_cnaes_subclasses_slug ON public.cnaes_subclasses(slug);
CREATE INDEX idx_cnaes_subclasses_classe ON public.cnaes_subclasses(classe_id);
CREATE INDEX idx_cnaes_subclasses_principal ON public.cnaes_subclasses(is_principal);

-- Habilitar RLS
ALTER TABLE public.cnaes_secoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cnaes_divisoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cnaes_grupos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cnaes_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cnaes_subclasses ENABLE ROW LEVEL SECURITY;

-- Políticas RLS (dados públicos)
CREATE POLICY "CNAEs são públicos" ON public.cnaes_secoes FOR SELECT USING (true);
CREATE POLICY "CNAEs são públicos" ON public.cnaes_divisoes FOR SELECT USING (true);
CREATE POLICY "CNAEs são públicos" ON public.cnaes_grupos FOR SELECT USING (true);
CREATE POLICY "CNAEs são públicos" ON public.cnaes_classes FOR SELECT USING (true);
CREATE POLICY "CNAEs são públicos" ON public.cnaes_subclasses FOR SELECT USING (true);

-- Edge Functions podem modificar CNAEs
CREATE POLICY "Edge Functions podem modificar CNAEs" ON public.cnaes_secoes FOR ALL USING (true);
CREATE POLICY "Edge Functions podem modificar CNAEs" ON public.cnaes_divisoes FOR ALL USING (true);
CREATE POLICY "Edge Functions podem modificar CNAEs" ON public.cnaes_grupos FOR ALL USING (true);
CREATE POLICY "Edge Functions podem modificar CNAEs" ON public.cnaes_classes FOR ALL USING (true);
CREATE POLICY "Edge Functions podem modificar CNAEs" ON public.cnaes_subclasses FOR ALL USING (true);

-- Triggers para updated_at
CREATE TRIGGER update_cnaes_secoes_updated_at BEFORE UPDATE ON public.cnaes_secoes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cnaes_divisoes_updated_at BEFORE UPDATE ON public.cnaes_divisoes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cnaes_grupos_updated_at BEFORE UPDATE ON public.cnaes_grupos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cnaes_classes_updated_at BEFORE UPDATE ON public.cnaes_classes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cnaes_subclasses_updated_at BEFORE UPDATE ON public.cnaes_subclasses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();