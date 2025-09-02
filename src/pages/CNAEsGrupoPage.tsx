import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cnaeSections, cnaeGrupos } from "@/data/cnaes";
import { Building2 } from "lucide-react";

const CNAEsGrupoPage = () => {
  const { grupo } = useParams<{ grupo: string }>();
  
  const secao = cnaeSections.find(s => s.slug === grupo);
  const grupoDetalhado = cnaeGrupos.find(g => g.slug === grupo);

  if (!secao) {
    return (
      <PageLayout
        title="Seção CNAE não encontrada"
        description="A seção CNAE solicitada não foi encontrada"
        breadcrumbItems={[
          { label: "CNAEs", href: "/cnae" },
          { label: "Seção não encontrada" }
        ]}
      >
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Seção não encontrada
          </h2>
          <p className="text-muted-foreground mb-6">
            A seção CNAE solicitada não existe ou não está disponível.
          </p>
          <Link 
            to="/cnae" 
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Voltar para CNAEs
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={`Seção ${secao.codigo} - ${secao.nome}`}
      description={secao.descricao}
      breadcrumbItems={[
        { label: "CNAEs", href: "/cnae" },
        { label: `Seção ${secao.codigo}` }
      ]}
    >
      <div className="space-y-8">
        <div className="bg-muted/50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">{secao.icon}</div>
            <div>
              <h2 className="text-xl font-semibold">Seção {secao.codigo}</h2>
              <p className="text-muted-foreground">{secao.descricao}</p>
            </div>
          </div>
        </div>

        {grupoDetalhado ? (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Divisões da Seção {secao.codigo}</h3>
            <div className="grid gap-6">
              {grupoDetalhado.divisoes.map((divisao) => (
                <Card key={divisao.codigo}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        Divisão {divisao.codigo} - {divisao.nome}
                      </CardTitle>
                      <Badge variant="secondary">
                        {divisao.classes.length} classe{divisao.classes.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {divisao.classes.map((classe) => (
                        <Link
                          key={classe.codigo}
                          to={`/cnae/${classe.codigo}-${classe.slug}`}
                          className="flex items-center gap-3 p-3 rounded-md border hover:bg-muted/50 transition-colors"
                        >
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <div className="font-medium">CNAE {classe.codigo}</div>
                            <div className="text-sm text-muted-foreground">{classe.nome}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Divisões em desenvolvimento
            </h3>
            <p className="text-muted-foreground">
              As divisões específicas desta seção serão implementadas em breve.
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default CNAEsGrupoPage;