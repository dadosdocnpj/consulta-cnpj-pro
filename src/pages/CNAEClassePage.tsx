import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCNAEClasses, useCNAESubclasses } from "@/hooks/useCNAEsData";
import LoadingCard from "@/components/LoadingCard";
import EmptyState from "@/components/EmptyState";
import { Building2 } from "lucide-react";

const CNAEClassePage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: todasClasses, isLoading: classesLoading } = useCNAEClasses();
  const classe = todasClasses?.find(c => c.slug === slug);
  const { data: subclasses, isLoading: subclassesLoading, error: subclassesError } = useCNAESubclasses(classe?.id);

  if (classesLoading || subclassesLoading) {
    return (
      <PageLayout
        title="Carregando Classe CNAE..."
        description="Carregando informações da classe CNAE"
        breadcrumbItems={[
          { label: "CNAEs", href: "/cnae" },
          { label: "Carregando..." }
        ]}
      >
        <div className="grid gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </PageLayout>
    );
  }

  if (!classe) {
    return (
      <PageLayout
        title="Classe CNAE não encontrada"
        description="A classe CNAE solicitada não foi encontrada"
        breadcrumbItems={[
          { label: "CNAEs", href: "/cnae" },
          { label: "Classe não encontrada" }
        ]}
      >
        <EmptyState 
          title="Classe não encontrada"
          description="A classe CNAE solicitada não existe ou não está disponível."
          actionLabel="Voltar para CNAEs"
          actionLink="/cnae"
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={`Classe ${classe.codigo} - ${classe.nome}`}
      description={classe.descricao || `Subclasses da classe ${classe.codigo} - ${classe.nome}`}
      breadcrumbItems={[
        { label: "CNAEs", href: "/cnae" },
        { label: `Classe ${classe.codigo}` }
      ]}
    >
      <div className="space-y-8">
        <div className="bg-muted/50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">📊</div>
            <div>
              <h2 className="text-xl font-semibold">Classe {classe.codigo}</h2>
              <p className="text-lg font-medium">{classe.nome}</p>
              {classe.descricao && (
                <p className="text-muted-foreground mt-1">{classe.descricao}</p>
              )}
              {classe.total_empresas > 0 && (
                <Badge variant="secondary" className="mt-2">
                  {classe.total_empresas.toLocaleString()} empresas
                </Badge>
              )}
            </div>
          </div>
        </div>

        {subclassesError ? (
          <EmptyState 
            title="Erro ao carregar subclasses"
            description="Não foi possível carregar as subclasses desta classe"
          />
        ) : !subclasses?.length ? (
          <EmptyState 
            title="Nenhuma subclasse encontrada"
            description="Esta classe ainda não possui subclasses cadastradas."
          />
        ) : (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">
              Subclasses da Classe {classe.codigo}
            </h3>
            <div className="grid gap-6">
              {subclasses.map((subclasse) => (
                <Link key={subclasse.id} to={`/cnae/subclasse/${subclasse.slug}`}>
                  <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">
                            CNAE {subclasse.codigo} - {subclasse.nome}
                          </CardTitle>
                          {subclasse.is_principal && (
                            <Badge variant="default" className="text-xs">
                              Principal
                            </Badge>
                          )}
                        </div>
                        {subclasse.total_empresas > 0 && (
                          <Badge variant="secondary">
                            {subclasse.total_empresas.toLocaleString()} empresas
                          </Badge>
                        )}
                      </div>
                      {subclasse.descricao && (
                        <CardDescription>
                          {subclasse.descricao}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>Ver empresas desta subclasse</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default CNAEClassePage;