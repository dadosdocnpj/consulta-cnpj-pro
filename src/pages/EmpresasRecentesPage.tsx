import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Building2, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import EmpresaCard from "@/components/EmpresaCard";
import LoadingCard from "@/components/LoadingCard";
import EmptyState from "@/components/EmptyState";
import { Card } from "@/components/ui/card";
import { useEmpresasRecentes } from "@/hooks/useEmpresasRecentes";

const EmpresasRecentesPage = () => {
  const { data: empresas, isLoading, error } = useEmpresasRecentes(30);

  const breadcrumbItems = [
    { label: "Início", href: "/" },
    { label: "Empresas Recentes" }
  ];

  return (
    <PageLayout 
      title="Empresas Recentes"
      description="Últimas empresas consultadas e adicionadas à nossa base de dados"
      breadcrumbItems={breadcrumbItems}
    >
      <Helmet>
        <title>Empresas Recentes | Dados do CNPJ</title>
        <meta 
          name="description" 
          content="Confira as empresas mais recentemente consultadas em nossa plataforma. Informações atualizadas e detalhadas."
        />
        <meta name="keywords" content="empresas recentes, últimas consultas, novos cnpj, empresas atualizadas" />
      </Helmet>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl">
            <Clock className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Empresas Recentes</h1>
            <p className="text-muted-foreground">
              Últimas empresas consultadas e atualizadas
            </p>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      )}

      {error && (
        <Card className="p-8 text-center">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Erro ao carregar empresas
          </h2>
          <p className="text-muted-foreground">
            Ocorreu um erro ao buscar as empresas recentes. Tente novamente em alguns instantes.
          </p>
        </Card>
      )}

      {!isLoading && !error && empresas && empresas.length === 0 && (
        <EmptyState 
          title="Nenhuma empresa encontrada"
          description="Não foram encontradas empresas recentes para exibir."
          icon="building"
        />
      )}

      {!isLoading && !error && empresas && empresas.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {empresas.map((empresa) => (
              <EmpresaCard key={empresa.cnpj} empresa={empresa} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Explore mais empresas
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                to="/ranking/top-empresas" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
              >
                <Building2 className="h-4 w-4" />
                Top empresas
              </Link>
              <Link 
                to="/estados" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
              >
                <Building2 className="h-4 w-4" />
                Por estado
              </Link>
            </div>
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default EmpresasRecentesPage;