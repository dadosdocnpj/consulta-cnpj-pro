import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { getEstadoPorUF } from "@/data/estados";
import { useCidadesDoEstado } from "@/hooks/useCidadesDoEstado";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Building2 } from "lucide-react";
import { createCitySlug } from "@/lib/utils";
import NotFound from "./NotFound";

const CidadesPage = () => {
  const { uf } = useParams<{ uf: string }>();
  const estado = uf ? getEstadoPorUF(uf) : undefined;
  const { data: cidades, isLoading, error } = useCidadesDoEstado(uf || '');

  if (!estado) {
    return <NotFound />;
  }

  return (
    <PageLayout
      title={`Cidades - ${estado.nome}`}
      description={`Explore empresas por cidades do estado ${estado.nome} (${estado.uf})`}
      breadcrumbItems={[
        { label: "Estados", href: "/estados" },
        { label: estado.nome }
      ]}
      >
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando cidades...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">Erro ao carregar cidades. Tente novamente.</p>
          </div>
        ) : !cidades || cidades.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Nenhuma cidade encontrada
            </h2>
            <p className="text-muted-foreground">
              Não há empresas cadastradas para o estado {estado.nome} no momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cidades.map((cidadeInfo) => {
              const citySlug = createCitySlug(cidadeInfo.municipio);
              return (
                <Link
                  key={cidadeInfo.municipio}
                  to={`/estados/${uf}/${citySlug}`}
                >)
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="line-clamp-1">{cidadeInfo.municipio}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span className="text-sm">
                        {cidadeInfo.count} {cidadeInfo.count === 1 ? 'empresa' : 'empresas'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
                </Link>
              );
            })}
          </div>
        )}
    </PageLayout>
  );
};

export default CidadesPage;