import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCNAESecoes } from "@/hooks/useCNAEsData";
import LoadingCard from "@/components/LoadingCard";
import EmptyState from "@/components/EmptyState";

const CNAEsPage = () => {
  const { data: secoes, isLoading, error } = useCNAESecoes();

  if (isLoading) {
    return (
      <PageLayout
        title="Classificação Nacional de Atividades Econômicas (CNAE)"
        description="Navegue por empresas organizadas por setores e atividades econômicas"
        breadcrumbItems={[{ label: "CNAEs" }]}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </PageLayout>
    );
  }

  if (error || !secoes?.length) {
    return (
      <PageLayout
        title="Classificação Nacional de Atividades Econômicas (CNAE)"
        description="Navegue por empresas organizadas por setores e atividades econômicas"
        breadcrumbItems={[{ label: "CNAEs" }]}
      >
        <EmptyState 
          title="Erro ao carregar CNAEs"
          description="Não foi possível carregar as seções CNAE"
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Classificação Nacional de Atividades Econômicas (CNAE)"
      description="Navegue por empresas organizadas por setores e atividades econômicas"
      breadcrumbItems={[
        { label: "CNAEs" }
      ]}
    >
      <div className="space-y-8">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            Explore empresas brasileiras organizadas por atividade econômica oficial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {secoes.map((secao) => (
            <Link key={secao.id} to={`/cnae/secao/${secao.slug}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{secao.icone || "📋"}</div>
                  <CardTitle className="text-lg">
                    Seção {secao.codigo}
                  </CardTitle>
                  <CardDescription className="font-medium text-foreground">
                    {secao.nome}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground text-center">
                      {secao.descricao}
                    </p>
                    {secao.total_empresas > 0 && (
                      <div className="flex justify-center">
                        <Badge variant="secondary">
                          {secao.total_empresas.toLocaleString()} empresas
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="bg-muted/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">O que é CNAE?</h2>
          <p className="text-muted-foreground leading-relaxed">
            A Classificação Nacional de Atividades Econômicas (CNAE) é o instrumento 
            de padronização nacional dos códigos de atividade econômica e dos critérios 
            de enquadramento utilizados pelos diversos órgãos da Administração Tributária 
            do país. É aplicada a todos os agentes econômicos que estão engajados na 
            produção de bens e serviços.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default CNAEsPage;