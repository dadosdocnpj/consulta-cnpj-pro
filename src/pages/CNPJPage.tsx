import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCNPJBySlug } from '@/hooks/useCNPJBySlug';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbSeparator, 
  BreadcrumbPage 
} from '@/components/ui/breadcrumb';
import { ChevronLeft, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import CompanySummaryCard from '@/components/CompanySummaryCard';
import CompanyDataTabs from '@/components/CompanyDataTabs';

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6 animate-fade-in">
            <Skeleton className="h-6 w-96" />
            <Skeleton className="h-40 w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-64 w-full rounded-lg" />
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
        <div className="container mx-auto px-4 py-8 animate-fade-in">
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
                <BreadcrumbPage className="max-w-xs truncate">
                  {data.razao_social}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Company Summary Card */}
          <div className="mb-8">
            <CompanySummaryCard data={data} />
          </div>

          {/* Company Data Tabs */}
          <CompanyDataTabs data={data} />

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