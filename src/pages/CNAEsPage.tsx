import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cnaeSections } from "@/data/cnaes";

const CNAEsPage = () => {
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
          {cnaeSections.map((secao) => (
            <Link key={secao.codigo} to={`/cnae/${secao.slug}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{secao.icon}</div>
                  <CardTitle className="text-lg">
                    Seção {secao.codigo}
                  </CardTitle>
                  <CardDescription className="font-medium text-foreground">
                    {secao.nome}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {secao.descricao}
                  </p>
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