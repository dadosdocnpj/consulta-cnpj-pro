import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Building2, TrendingUp } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import EmpresaCard from "@/components/EmpresaCard";
import LoadingCard from "@/components/LoadingCard";
import EmptyState from "@/components/EmptyState";
import { Card } from "@/components/ui/card";
import { useTopEmpresas } from "@/hooks/useTopEmpresas";

const TopEmpresasPage = () => {
  const { data: empresas, isLoading, error } = useTopEmpresas(50);

  const breadcrumbItems = [
    { label: "Início", href: "/" },
    { label: "Ranking", href: "/ranking" },
    { label: "Top Empresas" }
  ];

  return (
    <PageLayout 
      title="Top 50 Empresas do Brasil"
      description="Principais empresas brasileiras organizadas por relevância e atividade"
      breadcrumbItems={breadcrumbItems}
    >
      <Helmet>
        <title>Top 50 Empresas do Brasil | Dados do CNPJ</title>
        <meta 
          name="description" 
          content="Descubra as principais empresas do Brasil. Lista atualizada com informações detalhadas das maiores corporações brasileiras."
        />
        <meta name="keywords" content="top empresas brasil, maiores empresas, ranking empresas, corporações brasileiras" />
      </Helmet>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Top 50 Empresas</h1>
            <p className="text-muted-foreground">
              As principais empresas do Brasil por relevância
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
            Ocorreu um erro ao buscar as empresas. Tente novamente em alguns instantes.
          </p>
        </Card>
      )}

      {!isLoading && !error && empresas && empresas.length === 0 && (
        <EmptyState 
          title="Nenhuma empresa encontrada"
          description="Não foram encontradas empresas para exibir."
          icon="building"
        />
      )}

      {!isLoading && !error && empresas && empresas.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {empresas.map((empresa, index) => (
              <div key={empresa.cnpj} className="relative">
                {index < 3 && (
                  <div className="absolute -top-2 -left-2 z-10">
                    <div className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                      #{index + 1}
                    </div>
                  </div>
                )}
                <EmpresaCard empresa={empresa} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Explore mais empresas por localização
            </p>
            <Link 
              to="/estados" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
            >
              <Building2 className="h-4 w-4" />
              Ver empresas por estado
            </Link>
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default TopEmpresasPage;