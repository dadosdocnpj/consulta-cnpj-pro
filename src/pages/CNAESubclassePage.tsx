import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EmpresaCard from "@/components/EmpresaCard";
import { useCNAESubclasses } from "@/hooks/useCNAEsData";
import { useCNAEEmpresas } from "@/hooks/useCNAEEmpresas";
import LoadingCard from "@/components/LoadingCard";
import EmptyState from "@/components/EmptyState";
import { Building2, ChevronLeft, ChevronRight } from "lucide-react";

const CNAESubclassePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState(1);
  const limit = 20;
  
  const { data: todasSubclasses, isLoading: subclassesLoading } = useCNAESubclasses();
  const subclasse = todasSubclasses?.find(s => s.slug === slug);
  const { data: empresasData, isLoading: empresasLoading, error: empresasError } = useCNAEEmpresas(subclasse?.codigo || '', page, limit);

  const totalPages = empresasData ? Math.ceil(empresasData.total / limit) : 0;

  if (subclassesLoading) {
    return (
      <PageLayout
        title="Carregando Subclasse CNAE..."
        description="Carregando informações da subclasse CNAE"
        breadcrumbItems={[
          { label: "CNAEs", href: "/cnae" },
          { label: "Carregando..." }
        ]}
      >
        <div className="grid gap-6">
          <LoadingCard />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!subclasse) {
    return (
      <PageLayout
        title="Subclasse CNAE não encontrada"
        description="A subclasse CNAE solicitada não foi encontrada"
        breadcrumbItems={[
          { label: "CNAEs", href: "/cnae" },
          { label: "Subclasse não encontrada" }
        ]}
      >
        <EmptyState 
          title="Subclasse não encontrada"
          description="A subclasse CNAE solicitada não existe ou não está disponível."
          actionLabel="Voltar para CNAEs"
          actionLink="/cnae"
        />
      </PageLayout>
    );
  }

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
      range.push(i);
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (page + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <PageLayout
      title={`CNAE ${subclasse.codigo} - ${subclasse.nome}`}
      description={subclasse.descricao || `Empresas da subclasse CNAE ${subclasse.codigo} - ${subclasse.nome}`}
      breadcrumbItems={[
        { label: "CNAEs", href: "/cnae" },
        { label: `CNAE ${subclasse.codigo}` }
      ]}
    >
      <div className="space-y-8">
        <div className="bg-muted/50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">🏢</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-semibold">CNAE {subclasse.codigo}</h2>
                {subclasse.is_principal && (
                  <Badge variant="default" className="text-xs">
                    Principal
                  </Badge>
                )}
              </div>
              <p className="text-lg font-medium">{subclasse.nome}</p>
              {subclasse.descricao && (
                <p className="text-muted-foreground mt-1">{subclasse.descricao}</p>
              )}
              {empresasData && empresasData.total > 0 && (
                <Badge variant="secondary" className="mt-2">
                  {empresasData.total.toLocaleString()} empresas
                </Badge>
              )}
            </div>
          </div>
        </div>

        {empresasError ? (
          <EmptyState 
            title="Erro ao carregar empresas"
            description="Não foi possível carregar as empresas desta subclasse"
          />
        ) : empresasLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        ) : !empresasData?.empresas?.length ? (
          <EmptyState 
            title="Nenhuma empresa encontrada"
            description="Esta subclasse ainda não possui empresas cadastradas."
          />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Empresas do CNAE {subclasse.codigo}
              </h3>
              <p className="text-sm text-muted-foreground">
                Página {page} de {totalPages} ({empresasData.total.toLocaleString()} empresas)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {empresasData.empresas.map((empresa, index) => (
                <EmpresaCard key={`${empresa.cnpj}-${index}`} empresa={empresa} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>
                
                {getVisiblePages().map((pageNum, index) => (
                  pageNum === '...' ? (
                    <span key={`dots-${index}`} className="px-2">...</span>
                  ) : (
                    <Button
                      key={pageNum}
                      variant={page === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(pageNum as number)}
                    >
                      {pageNum}
                    </Button>
                  )
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Próxima
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default CNAESubclassePage;