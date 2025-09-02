import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCNPJBySlug } from '@/hooks/useCNPJBySlug';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbSeparator, 
  BreadcrumbPage 
} from '@/components/ui/breadcrumb';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  Hash,
  Search,
  ChevronLeft
} from 'lucide-react';
import { formatCNPJ } from '@/utils/cnpj';
import { Helmet } from 'react-helmet-async';

const CNPJPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError, error } = useCNPJBySlug(slug || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-6 w-96" />
            <Skeleton className="h-12 w-full" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Empresa não encontrada</h1>
          <p className="text-muted-foreground">
            {error?.message || 'Não foi possível encontrar os dados desta empresa.'}
          </p>
          <Link to="/">
            <Button>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Voltar à busca
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const pageTitle = `${data.razao_social || 'Empresa'} - CNPJ: ${data.cnpj_formatado}`;
  const pageDescription = `Consulte os dados completos da empresa ${data.razao_social}. CNPJ ${data.cnpj_formatado}, situada em ${data.endereco?.municipio}, ${data.endereco?.uf}. Informações atualizadas sobre situação cadastral, atividades e endereço.`;

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

      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Início</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{data.razao_social}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  {data.razao_social}
                </h1>
                {data.nome_fantasia && (
                  <p className="text-xl text-muted-foreground mb-2">
                    Nome Fantasia: {data.nome_fantasia}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-sm">
                    <Hash className="mr-1 h-3 w-3" />
                    CNPJ: {data.cnpj_formatado}
                  </Badge>
                  <Badge 
                    variant={data.situacao_cadastral === 'ATIVA' ? 'default' : 'secondary'}
                  >
                    {data.situacao_cadastral}
                  </Badge>
                </div>
              </div>
              <Link to="/">
                <Button variant="outline" size="lg">
                  <Search className="mr-2 h-4 w-4" />
                  Nova Busca
                </Button>
              </Link>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Dados Básicos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Dados Básicos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Razão Social</label>
                  <p className="text-foreground">{data.razao_social}</p>
                </div>
                {data.nome_fantasia && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Nome Fantasia</label>
                    <p className="text-foreground">{data.nome_fantasia}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">CNPJ</label>
                  <p className="text-foreground font-mono">{data.cnpj_formatado}</p>
                </div>
                {data.natureza_juridica && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Natureza Jurídica</label>
                    <p className="text-foreground">{data.natureza_juridica}</p>
                  </div>
                )}
                {data.data_abertura && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Data de Abertura</label>
                    <p className="text-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {data.data_abertura}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Endereço */}
            {data.endereco && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Endereço
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Logradouro</label>
                    <p className="text-foreground">
                      {data.endereco.logradouro}, {data.endereco.numero}
                      {data.endereco.complemento && ` - ${data.endereco.complemento}`}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Bairro</label>
                    <p className="text-foreground">{data.endereco.bairro}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Município/UF</label>
                    <p className="text-foreground">{data.endereco.municipio}, {data.endereco.uf}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">CEP</label>
                    <p className="text-foreground font-mono">{data.endereco.cep}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contato */}
            {(data.telefone || data.email) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contato
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.telefone && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                      <p className="text-foreground flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {data.telefone}
                      </p>
                    </div>
                  )}
                  {data.email && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-foreground flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {data.email}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* CNAEs */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Atividades Econômicas (CNAEs)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {data.cnae_principal && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Atividade Principal
                    </label>
                    <Badge variant="default" className="text-sm">
                      {data.cnae_principal.codigo} - {data.cnae_principal.descricao}
                    </Badge>
                  </div>
                )}

                {data.cnaes_secundarios && data.cnaes_secundarios.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Atividades Secundárias
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {data.cnaes_secundarios.map((cnae, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {cnae.codigo} - {cnae.descricao}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 text-center">
            <Link to="/">
              <Button size="lg" className="min-w-[200px]">
                <Search className="mr-2 h-4 w-4" />
                Fazer Nova Consulta
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CNPJPage;