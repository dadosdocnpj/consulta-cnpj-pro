import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import PageLayout from "@/components/PageLayout";
import { getEstadoPorUF } from "@/data/estados";
import { useEmpresasPorCidade } from "@/hooks/useEmpresasPorCidade";
import EmpresaCard from "@/components/EmpresaCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { parseCityFromSlug } from "@/lib/utils";
import NotFound from "./NotFound";

const EmpresasPorCidadePage = () => {
  const { uf, cidade } = useParams<{ uf: string; cidade: string }>();
  const [currentPage, setCurrentPage] = useState(1);
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
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Carregando empresas...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-destructive">Erro ao carregar empresas. Tente novamente.</p>
        </div>
      ) : !data || data.empresas.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Nenhuma empresa encontrada
          </h2>
          <p className="text-muted-foreground">
            Não há empresas cadastradas em {cidadeProcessed}, {estado.nome} no momento.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
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
            <div className="flex items-center justify-center space-x-2 pt-8">
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
          )}
        </div>
      )}
    </PageLayout>
  );
};

export default EmpresasPorCidadePage;