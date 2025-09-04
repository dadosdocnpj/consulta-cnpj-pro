import { useParams, Link } from "react-router-dom";
import CNAEPageLayout from "@/components/CNAEPageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCNAESecoes, useCNAEDivisoes } from "@/hooks/useCNAEsData";
import { useCNAEHierarchy } from "@/hooks/useCNAEHierarchy";
import LoadingCard from "@/components/LoadingCard";
import EmptyState from "@/components/EmptyState";
import { Building2 } from "lucide-react";

const CNAESecaoPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: secoes, isLoading: secoesLoading } = useCNAESecoes();
  const secao = secoes?.find(s => s.slug === slug);
  const { data: divisoes, isLoading: divisoesLoading, error: divisoesError } = useCNAEDivisoes(secao?.id);
  const { data: hierarchy } = useCNAEHierarchy(secao?.codigo || '');

  if (secoesLoading || divisoesLoading) {
    return (
      <CNAEPageLayout
        title="Carregando Seção CNAE..."
        description="Carregando informações da seção CNAE"
      >
        <div className="grid gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </CNAEPageLayout>
    );
  }

  if (!secao) {
    return (
      <CNAEPageLayout
        title="Seção CNAE não encontrada"
        description="A seção CNAE solicitada não foi encontrada"
      >
        <EmptyState 
          title="Seção não encontrada"
          description="A seção CNAE solicitada não existe ou não está disponível."
          actionLabel="Voltar para CNAEs"
          actionLink="/cnae"
        />
      </CNAEPageLayout>
    );
  }

  return (
    <CNAEPageLayout
      title={`Seção ${secao.codigo} - ${secao.nome}`}
      description={secao.descricao || `Divisões da seção ${secao.codigo} - ${secao.nome}`}
      hierarchy={hierarchy}
      cnaeCode={secao.codigo}
      cnaeType="secao"
      totalEmpresas={secao.total_empresas}
    >
      <div className="space-y-8">
        <div className="bg-muted/50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">{secao.icone || "📋"}</div>
            <div>
              <h2 className="text-xl font-semibold">Seção {secao.codigo}</h2>
              <p className="text-muted-foreground">{secao.descricao}</p>
              {secao.total_empresas > 0 && (
                <Badge variant="secondary" className="mt-2">
                  {secao.total_empresas.toLocaleString()} empresas
                </Badge>
              )}
            </div>
          </div>
        </div>

        {divisoesError ? (
          <EmptyState 
            title="Erro ao carregar divisões"
            description="Não foi possível carregar as divisões desta seção"
          />
        ) : !divisoes?.length ? (
          <EmptyState 
            title="Nenhuma divisão encontrada"
            description="Esta seção ainda não possui divisões cadastradas."
          />
        ) : (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">
              Divisões da Seção {secao.codigo}
            </h3>
            <div className="grid gap-6">
              {divisoes.map((divisao) => (
                <Link key={divisao.id} to={`/cnae/divisao/${divisao.slug}`}>
                  <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          Divisão {divisao.codigo} - {divisao.nome}
                        </CardTitle>
                        {divisao.total_empresas > 0 && (
                          <Badge variant="secondary">
                            {divisao.total_empresas.toLocaleString()} empresas
                          </Badge>
                        )}
                      </div>
                      {divisao.descricao && (
                        <CardDescription>
                          {divisao.descricao}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>Ver grupos desta divisão</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </CNAEPageLayout>
  );
};

export default CNAESecaoPage;