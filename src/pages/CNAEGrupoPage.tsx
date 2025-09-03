import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCNAEGrupos, useCNAEClasses } from "@/hooks/useCNAEsData";
import LoadingCard from "@/components/LoadingCard";
import EmptyState from "@/components/EmptyState";
import { Building2 } from "lucide-react";

const CNAEGrupoPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: todosGrupos, isLoading: gruposLoading } = useCNAEGrupos();
  const grupo = todosGrupos?.find(g => g.slug === slug);
  const { data: classes, isLoading: classesLoading, error: classesError } = useCNAEClasses(grupo?.id);

  if (gruposLoading || classesLoading) {
    return (
      <PageLayout
        title="Carregando Grupo CNAE..."
        description="Carregando informações do grupo CNAE"
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

  if (!grupo) {
    return (
      <PageLayout
        title="Grupo CNAE não encontrado"
        description="O grupo CNAE solicitado não foi encontrado"
        breadcrumbItems={[
          { label: "CNAEs", href: "/cnae" },
          { label: "Grupo não encontrado" }
        ]}
      >
        <EmptyState 
          title="Grupo não encontrado"
          description="O grupo CNAE solicitado não existe ou não está disponível."
          actionLabel="Voltar para CNAEs"
          actionLink="/cnae"
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={`Grupo ${grupo.codigo} - ${grupo.nome}`}
      description={grupo.descricao || `Classes do grupo ${grupo.codigo} - ${grupo.nome}`}
      breadcrumbItems={[
        { label: "CNAEs", href: "/cnae" },
        { label: `Grupo ${grupo.codigo}` }
      ]}
    >
      <div className="space-y-8">
        <div className="bg-muted/50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">📈</div>
            <div>
              <h2 className="text-xl font-semibold">Grupo {grupo.codigo}</h2>
              <p className="text-lg font-medium">{grupo.nome}</p>
              {grupo.descricao && (
                <p className="text-muted-foreground mt-1">{grupo.descricao}</p>
              )}
              {grupo.total_empresas > 0 && (
                <Badge variant="secondary" className="mt-2">
                  {grupo.total_empresas.toLocaleString()} empresas
                </Badge>
              )}
            </div>
          </div>
        </div>

        {classesError ? (
          <EmptyState 
            title="Erro ao carregar classes"
            description="Não foi possível carregar as classes deste grupo"
          />
        ) : !classes?.length ? (
          <EmptyState 
            title="Nenhuma classe encontrada"
            description="Este grupo ainda não possui classes cadastradas."
          />
        ) : (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">
              Classes do Grupo {grupo.codigo}
            </h3>
            <div className="grid gap-6">
              {classes.map((classe) => (
                <Link key={classe.id} to={`/cnae/classe/${classe.slug}`}>
                  <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          Classe {classe.codigo} - {classe.nome}
                        </CardTitle>
                        {classe.total_empresas > 0 && (
                          <Badge variant="secondary">
                            {classe.total_empresas.toLocaleString()} empresas
                          </Badge>
                        )}
                      </div>
                      {classe.descricao && (
                        <CardDescription>
                          {classe.descricao}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>Ver subclasses desta classe</span>
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

export default CNAEGrupoPage;