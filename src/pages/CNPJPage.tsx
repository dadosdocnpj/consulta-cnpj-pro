import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCNPJBySlug } from '@/hooks/useCNPJBySlug';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Helmet } from 'react-helmet-async';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  DollarSign, 
  FileText, 
  Copy, 
  Share2, 
  ExternalLink,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';
import PageLayout from '@/components/PageLayout';

const CNPJPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError, error } = useCNPJBySlug(slug || '');

  // Bot detection for SEO
  useEffect(() => {
    if (slug && typeof window !== 'undefined') {
      const userAgent = navigator.userAgent.toLowerCase();
      const isBotUserAgent = /bot|crawl|spider|scraper|facebookexternalhit|twitterbot|slurp|linkedinbot|whatsapp|telegrambot|skypeuri|semrushbot|ahrefsbot|mj12bot/i.test(userAgent);
      
      if (isBotUserAgent) {
        // Redirect bots to the Edge Function for SSR
        window.location.href = `https://ayyklhshzzfkutkrpipj.supabase.co/functions/v1/render-cnpj/${slug}`;
        return;
      }
    }
  }, [slug]);

  const handleCopyCNPJ = (formatted: boolean = true) => {
    if (!data?.cnpj) return;
    
    const cnpjToCopy = formatted ? data.cnpj_formatado || data.cnpj : data.cnpj;
    navigator.clipboard.writeText(cnpjToCopy);
    toast.success(`CNPJ ${formatted ? 'formatado' : 'sem formatação'} copiado!`);
  };

  const handleCopyAllData = () => {
    if (!data) return;
    
    const allData = `
${data.razao_social}
CNPJ: ${data.cnpj_formatado || data.cnpj}
${data.nome_fantasia ? `Nome Fantasia: ${data.nome_fantasia}` : ''}
Situação: ${data.situacao_cadastral || 'N/A'}
${data.endereco ? `Endereço: ${data.endereco.logradouro}, ${data.endereco.numero}${data.endereco.complemento ? `, ${data.endereco.complemento}` : ''} - ${data.endereco.bairro}, ${data.endereco.municipio}/${data.endereco.uf} - CEP: ${data.endereco.cep}` : ''}
${data.telefone ? `Telefone: ${data.telefone}` : ''}
${data.email ? `Email: ${data.email}` : ''}
${data.data_abertura ? `Data de Abertura: ${new Date(data.data_abertura).toLocaleDateString('pt-BR')}` : ''}
${data.capital_social ? `Capital Social: R$ ${data.capital_social}` : ''}
${data.cnae_principal ? `CNAE Principal: ${data.cnae_principal.codigo} - ${data.cnae_principal.descricao}` : ''}
    `.trim();
    
    navigator.clipboard.writeText(allData);
    toast.success('Todos os dados copiados!');
  };

  const handleShare = async () => {
    if (!data) return;
    
    const shareData = {
      title: `${data.razao_social} - CNPJ: ${data.cnpj_formatado}`,
      text: `Consulte os dados da empresa ${data.razao_social}`,
      url: window.location.href
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado para a área de transferência!');
    }
  };

  const getSituacaoColor = (situacao?: string) => {
    if (!situacao) return 'bg-muted text-muted-foreground';
    
    const situacaoLower = situacao.toLowerCase();
    if (situacaoLower.includes('ativa')) return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
    if (situacaoLower.includes('suspensa')) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
    if (situacaoLower.includes('inapta') || situacaoLower.includes('baixada')) return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
    return 'bg-muted text-muted-foreground';
  };

  const getSituacaoIcon = (situacao?: string) => {
    if (!situacao) return AlertCircle;
    
    const situacaoLower = situacao.toLowerCase();
    if (situacaoLower.includes('ativa')) return CheckCircle;
    if (situacaoLower.includes('suspensa')) return AlertCircle;
    if (situacaoLower.includes('inapta') || situacaoLower.includes('baixada')) return XCircle;
    return AlertCircle;
  };

  if (isLoading) {
    return (
      <PageLayout 
        title="Carregando..." 
        description="Carregando dados da empresa"
        breadcrumbItems={[]}
      >
        <div className="space-y-6 animate-slide-up">
          <Skeleton className="h-32 w-full rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
      </PageLayout>
    );
  }

  if (isError || !data) {
    return (
      <PageLayout 
        title="Empresa não encontrada" 
        description="Não foi possível encontrar os dados desta empresa"
        breadcrumbItems={[]}
      >
        <div className="text-center space-y-4">
          <div className="max-w-md mx-auto">
            <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <p className="text-muted-foreground mb-6">
              {error?.message || 'Não foi possível encontrar os dados desta empresa.'}
            </p>
            <Link to="/">
              <Button>
                Voltar à busca
              </Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  const pageTitle = `${data.razao_social || 'Empresa'} - CNPJ: ${data.cnpj_formatado}`;
  const pageDescription = `Consulte os dados completos da empresa ${data.razao_social}. CNPJ ${data.cnpj_formatado}, situada em ${data.endereco?.municipio}, ${data.endereco?.uf}. Informações atualizadas sobre situação cadastral, atividades e endereço.`;

  const breadcrumbItems = [
    { label: data.razao_social || 'Empresa', href: undefined }
  ];

  const SituacaoIcon = getSituacaoIcon(data.situacao_cadastral);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${window.location.origin}/${slug}/`} />
      </Helmet>

      <PageLayout
        title={data.razao_social || 'Empresa'}
        description={`CNPJ: ${data.cnpj_formatado || data.cnpj} • ${data.endereco?.municipio || ''}, ${data.endereco?.uf || ''}`}
        breadcrumbItems={breadcrumbItems}
      >
        <div className="space-y-8">
          {/* Header Card with Main Info */}
          <Card className="card-modern">
            <CardHeader className="pb-4">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="space-y-2">
                  <CardTitle className="text-2xl lg:text-3xl flex items-center gap-3">
                    <Building2 className="h-7 w-7 text-primary" />
                    {data.razao_social}
                  </CardTitle>
                  {data.nome_fantasia && (
                    <p className="text-lg text-muted-foreground">
                      Nome Fantasia: {data.nome_fantasia}
                    </p>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleCopyAllData}
                    className="w-full sm:w-auto"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copiar Todos os Dados
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleShare}
                    className="w-full sm:w-auto"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* CNPJ Section */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  CNPJ
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Formatado</p>
                    <div className="flex items-center gap-2">
                      <code className="bg-background px-3 py-2 rounded border text-lg font-mono">
                        {data.cnpj_formatado || data.cnpj}
                      </code>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCopyCNPJ(true)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Apenas números</p>
                    <div className="flex items-center gap-2">
                      <code className="bg-background px-3 py-2 rounded border text-lg font-mono">
                        {data.cnpj}
                      </code>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCopyCNPJ(false)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3">
                <Badge className={`${getSituacaoColor(data.situacao_cadastral)} flex items-center gap-2 px-3 py-2`}>
                  <SituacaoIcon className="h-4 w-4" />
                  {data.situacao_cadastral || 'Status não informado'}
                </Badge>
                {data.data_situacao_cadastral && (
                  <span className="text-sm text-muted-foreground">
                    desde {new Date(data.data_situacao_cadastral).toLocaleDateString('pt-BR')}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Data Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Informações Básicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.data_abertura && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Data de Abertura</p>
                      <p className="font-medium">{new Date(data.data_abertura).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                )}
                
                {data.natureza_juridica && (
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Natureza Jurídica</p>
                      <p className="font-medium">{data.natureza_juridica}</p>
                    </div>
                  </div>
                )}
                
                {data.capital_social && (
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Capital Social</p>
                      <p className="font-medium">R$ {data.capital_social}</p>
                    </div>
                  </div>
                )}
                
                {data.regime_tributario && (
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Regime Tributário</p>
                      <p className="font-medium">{data.regime_tributario}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Contato e Localização
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.endereco && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Endereço</p>
                      <div className="font-medium">
                        <p>{data.endereco.logradouro}, {data.endereco.numero}</p>
                        {data.endereco.complemento && <p>{data.endereco.complemento}</p>}
                        <p>{data.endereco.bairro}</p>
                        <p>
                          <Link 
                            to={`/cidades/${data.endereco.uf.toLowerCase()}/${data.endereco.municipio.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-primary hover:underline"
                          >
                            {data.endereco.municipio}
                          </Link>
                          , {data.endereco.uf} - CEP: {data.endereco.cep}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {data.telefone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Telefone</p>
                      <p className="font-medium">{data.telefone}</p>
                    </div>
                  </div>
                )}
                
                {data.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{data.email}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Activities Section */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Atividades Econômicas (CNAEs)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.cnae_principal && (
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-primary">Atividade Principal</h4>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <Link 
                      to={`/cnaes/subclasse/${data.cnae_principal.codigo}`}
                      className="flex items-center justify-between group hover:bg-primary/10 -m-4 p-4 rounded-lg transition-smooth"
                    >
                      <div>
                        <p className="font-mono text-sm text-primary font-semibold">
                          {data.cnae_principal.codigo}
                        </p>
                        <p className="font-medium group-hover:text-primary transition-smooth">
                          {data.cnae_principal.descricao}
                        </p>
                      </div>
                      <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-smooth" />
                    </Link>
                  </div>
                </div>
              )}

              {data.cnaes_secundarios && data.cnaes_secundarios.length > 0 && (
                <div>
                  <h4 className="font-semibold text-lg mb-3">Atividades Secundárias</h4>
                  <div className="space-y-2">
                    {data.cnaes_secundarios.map((cnae, index) => (
                      <Link 
                        key={index}
                        to={`/cnaes/subclasse/${cnae.codigo}`}
                        className="flex items-center justify-between group hover:bg-muted/50 p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-smooth"
                      >
                        <div>
                          <p className="font-mono text-sm text-muted-foreground font-semibold">
                            {cnae.codigo}
                          </p>
                          <p className="font-medium group-hover:text-primary transition-smooth">
                            {cnae.descricao}
                          </p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-smooth" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Button */}
          <div className="text-center">
            <Link to="/">
              <Button size="lg" className="btn-gradient min-w-[200px]">
                Fazer Nova Consulta
              </Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default CNPJPage;