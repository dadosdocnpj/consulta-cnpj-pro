import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCNAEDivisoes, useCNAEGrupos } from "@/hooks/useCNAEsData";
import LoadingCard from "@/components/LoadingCard";
import EmptyState from "@/components/EmptyState";
import { Building2 } from "lucide-react";

const CNAEDivisaoPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: todasDivisoes, isLoading: divisoesLoading } = useCNAEDivisoes();
  const divisao = todasDivisoes?.find(d => d.slug === slug);
  const { data: grupos, isLoading: gruposLoading, error: gruposError } = useCNAEGrupos(divisao?.id);

  if (divisoesLoading || gruposLoading) {
    return (
      <PageLayout
        title="Carregando Divisão CNAE..."
        description="Carregando informações da divisão CNAE"
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

  if (!divisao) {
    return (
      <PageLayout
        title="Divisão CNAE não encontrada"
        description="A divisão CNAE solicitada não foi encontrada"
        breadcrumbItems={[
          { label: "CNAEs", href: "/cnae" },
          { label: "Divisão não encontrada" }
        ]}
      >
        <EmptyState 
          title="Divisão não encontrada"
          description="A divisão CNAE solicitada não existe ou não está disponível."
          actionLabel="Voltar para CNAEs"
          actionLink="/cnae"
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={`Divisão ${divisao.codigo} - ${divisao.nome}`}
      description={divisao.descricao || `Grupos da divisão ${divisao.codigo} - ${divisao.nome}`}
      breadcrumbItems={[
        { label: "CNAEs", href: "/cnae" },
        { label: `Divisão ${divisao.codigo}` }
      ]}
    >
      <div className="space-y-8">
        <div className="bg-muted/50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">📊</div>
            <div>
              <h2 className="text-xl font-semibold">Divisão {divisao.codigo}</h2>
              <p className="text-lg font-medium">{divisao.nome}</p>
              {divisao.descricao && (
                <p className="text-muted-foreground mt-1">{divisao.descricao}</p>
              )}
              {divisao.total_empresas > 0 && (
                <Badge variant="secondary" className="mt-2">
                  {divisao.total_empresas.toLocaleString()} empresas
                </Badge>
              )}
            </div>
          </div>
        </div>

        {gruposError ? (
          <EmptyState 
            title="Erro ao carregar grupos"
            description="Não foi possível carregar os grupos desta divisão"
          />
        ) : !grupos?.length ? (
          <EmptyState 
            title="Nenhum grupo encontrado"
            description="Esta divisão ainda não possui grupos cadastrados."
          />
        ) : (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">
              Grupos da Divisão {divisao.codigo}
            </h3>
            <div className="grid gap-6">
              {grupos.map((grupo) => (
                <Link key={grupo.id} to={`/cnae/grupo/${grupo.slug}`}>
                  <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          Grupo {grupo.codigo} - {grupo.nome}
                        </CardTitle>
                        {grupo.total_empresas > 0 && (
                          <Badge variant="secondary">
                            {grupo.total_empresas.toLocaleString()} empresas
                          </Badge>
                        )}
                      </div>
                      {grupo.descricao && (
                        <CardDescription>
                          {grupo.descricao}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>Ver classes deste grupo</span>
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

export default CNAEDivisaoPage;