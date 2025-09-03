import { Link } from "react-router-dom";
import { MapPin, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/PageLayout";
import { estados, regioes, getEstadosPorRegiao } from "@/data/estados";
import { useContadoresEstados } from "@/hooks/useContadoresEstados";

const EstadosPage = () => {
  const { data: contadores, isLoading } = useContadoresEstados();
  
  const getEmpresasCount = (uf: string) => {
    const contador = contadores?.find(c => c.uf === uf);
    return contador?.count || 0;
  };
  return (
    <PageLayout
      title="Estados Brasileiros"
      description="Navegue por empresas organizadas por estados e regiões do Brasil"
      breadcrumbItems={[
        { label: "Estados" }
      ]}
    >
      <div className="space-y-8">
        {regioes.map((regiao) => {
          const estadosRegiao = getEstadosPorRegiao(regiao);
          
          return (
            <div key={regiao} className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">{regiao}</h2>
                <Badge variant="secondary">{estadosRegiao.length} estados</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {estadosRegiao.map((estado) => (
                  <Link
                    key={estado.uf}
                    to={`/estados/${estado.uf.toLowerCase()}`}
                    className="block hover:scale-105 transition-transform duration-200"
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-200 border-border/50 hover:border-primary/50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-semibold text-foreground flex items-center justify-between">
                          <span>{estado.nome}</span>
                          <Badge variant="outline" className="text-xs">
                            {estado.uf}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Building2 className="h-4 w-4" />
                          <span className="text-sm">
                            {isLoading ? 'Carregando...' : (
                              `${getEmpresasCount(estado.uf)} ${getEmpresasCount(estado.uf) === 1 ? 'empresa' : 'empresas'}`
                            )}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-12 bg-muted/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Sobre a navegação por estados
        </h3>
        <p className="text-muted-foreground">
          Explore empresas organizadas geograficamente por todo o Brasil. 
          Cada estado apresenta suas cidades com dados de CNPJs ativos, 
          facilitando a busca regional por tipo de negócio ou setor econômico.
        </p>
      </div>
    </PageLayout>
  );
};

export default EstadosPage;