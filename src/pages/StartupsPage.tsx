import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Building2, Rocket } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import EmpresaCard from "@/components/EmpresaCard";
import LoadingCard from "@/components/LoadingCard";
import EmptyState from "@/components/EmptyState";
import { Card } from "@/components/ui/card";
import { useEmpresasPorCategoria } from "@/hooks/useEmpresasPorCategoria";

const StartupsPage = () => {
  const { data: empresas, isLoading, error } = useEmpresasPorCategoria('startups', 40);

  const breadcrumbItems = [
    { label: "Início", href: "/" },
    { label: "Categorias", href: "/categoria" },
    { label: "Startups Brasileiras" }
  ];

  return (
    <PageLayout 
      title="Startups Brasileiras"
      description="Empresas inovadoras e tecnológicas do ecossistema brasileiro"
      breadcrumbItems={breadcrumbItems}
    >
      <Helmet>
        <title>Startups Brasileiras | Dados do CNPJ</title>
        <meta 
          name="description" 
          content="Descubra startups e empresas de tecnologia no Brasil. Informações detalhadas sobre o ecossistema de inovação brasileiro."
        />
        <meta name="keywords" content="startups brasil, empresas tecnologia, inovação, empresas digitais, ecossistema startup" />
      </Helmet>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-xl">
            <Rocket className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Startups Brasileiras</h1>
            <p className="text-muted-foreground">
              Empresas inovadoras do ecossistema tecnológico brasileiro
            </p>
          </div>
        </div>
        
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            <strong>Critérios de seleção:</strong> Empresas com CNAEs relacionados a atividades de tecnologia, 
            desenvolvimento de software, processamento de dados e outras atividades típicas do setor de inovação.
          </p>
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
            Erro ao carregar startups
          </h2>
          <p className="text-muted-foreground">
            Ocorreu um erro ao buscar as startups. Tente novamente em alguns instantes.
          </p>
        </Card>
      )}

      {!isLoading && !error && empresas && empresas.length === 0 && (
        <EmptyState 
          title="Nenhuma startup encontrada"
          description="Não foram encontradas startups para exibir no momento."
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
              Explore mais categorias de empresas
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                to="/categoria/publicas" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
              >
                <Building2 className="h-4 w-4" />
                Empresas públicas
              </Link>
              <Link 
                to="/ranking/top-empresas" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
              >
                <Building2 className="h-4 w-4" />
                Top empresas
              </Link>
            </div>
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default StartupsPage;