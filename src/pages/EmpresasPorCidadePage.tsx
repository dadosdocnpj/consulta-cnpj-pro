import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import PageLayout from "@/components/PageLayout";
import { getEstadoPorUF } from "@/data/estados";
import { useEmpresasPorCidade } from "@/hooks/useEmpresasPorCidade";
import EmpresaCard from "@/components/EmpresaCard";
import LoadingCard from "@/components/LoadingCard";
import EmptyState from "@/components/EmptyState";
import FilterPanel, { FilterState } from "@/components/FilterPanel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { parseCityFromSlug } from "@/lib/utils";
import NotFound from "./NotFound";

const EmpresasPorCidadePage = () => {
  const { uf, cidade } = useParams<{ uf: string; cidade: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    situacao: "",
    cnae: "",
    porte: ""
  });
  const pageSize = 20;
  
  const estado = uf ? getEstadoPorUF(uf) : undefined;
  
  // Processa o slug da cidade para obter o nome original
  const cidadeProcessed = useMemo(() => {
    if (!cidade) return '';
    return parseCityFromSlug(cidade);
  }, [cidade]);
  
  const { data, isLoading, error } = useEmpresasPorCidade(
    uf || '', 
    cidadeProcessed, 
    currentPage, 
    pageSize
  );

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  if (!estado || !cidade) {
    return <NotFound />;
  }

  const totalPages = data ? Math.ceil(data.total / pageSize) : 0;

  return (
    <PageLayout
      title={`Empresas em ${cidadeProcessed}`}
      description={`Lista de empresas cadastradas em ${cidadeProcessed}, ${estado.nome}`}
      breadcrumbItems={[
        { label: "Estados", href: "/estados" },
        { label: estado.nome, href: `/estados/${uf}` },
        { label: cidadeProcessed }
      ]}
    >
      <FilterPanel 
        onFiltersChange={handleFiltersChange}
        totalResults={data?.total}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      ) : error ? (
        <EmptyState
          title="Erro ao carregar empresas"
          description="Ocorreu um erro ao buscar as empresas desta cidade. Tente novamente."
          icon="building"
          actionLabel="Tentar novamente"
          actionLink={window.location.pathname}
        />
      ) : !data || data.empresas.length === 0 ? (
        <EmptyState
          title="Nenhuma empresa encontrada"
          description={`Não há empresas cadastradas em ${cidadeProcessed}, ${estado.nome} no momento.`}
          icon="building"
          actionLabel={`Ver outras cidades de ${estado.nome}`}
          actionLink={`/estados/${uf}`}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">
              Mostrando {data.empresas.length} de {data.total} empresas
            </p>
            <div className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.empresas.map((empresa) => (
              <EmpresaCard key={empresa.cnpj} empresa={empresa} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t">
              <div className="text-sm text-muted-foreground">
                Total: {data.total} empresas em {totalPages} páginas
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Anterior
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="min-w-[2.5rem]"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Próximo
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </PageLayout>
  );
};

export default EmpresasPorCidadePage;