import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { MapPin, Building2, Users, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ModernPageLayout from "@/components/ModernPageLayout";
import SearchFilter from "@/components/SearchFilter";
import RegionalMap from "@/components/RegionalMap";
import StatisticsChart from "@/components/StatisticsChart";
import { estados, regioes, getEstadosPorRegiao } from "@/data/estados";
import { useContadoresEstados } from "@/hooks/useContadoresEstados";

const EstadosPage = () => {
  const { data: contadores, isLoading } = useContadoresEstados();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  
  const getEmpresasCount = (uf: string) => {
    const contador = contadores?.find(c => c.uf === uf);
    return contador?.count || 0;
  };

  const regionalData = useMemo(() => {
    const colors = {
      "Norte": "#10b981",
      "Nordeste": "#f59e0b", 
      "Centro-Oeste": "#ef4444",
      "Sudeste": "#3b82f6",
      "Sul": "#8b5cf6"
    };

    return regioes.map(regiao => {
      const estadosRegiao = getEstadosPorRegiao(regiao);
      const companies = estadosRegiao.reduce((total, estado) => 
        total + getEmpresasCount(estado.uf), 0
      );
      
      return {
        name: regiao,
        states: estadosRegiao.length,
        companies,
        color: colors[regiao as keyof typeof colors] || "#64748b"
      };
    });
  }, [contadores]);

  const chartData = useMemo(() => {
    if (!contadores) return [];
    return contadores
      .map(contador => {
        const estado = estados.find(e => e.uf === contador.uf);
        return {
          name: estado?.nome || contador.uf,
          value: contador.count
        };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [contadores]);

  const filteredStates = useMemo(() => {
    if (!searchTerm) return estados;
    
    return estados.filter(estado => 
      estado.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estado.uf.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalEmpresas = useMemo(() => {
    return contadores?.reduce((total, contador) => total + contador.count, 0) || 0;
  }, [contadores]);
  return (
    <ModernPageLayout
      title="Estados Brasileiros"
      description="Navegue por empresas organizadas por estados e regiões do Brasil"
      breadcrumbItems={[{ label: "Estados" }]}
      icon={<MapPin className="h-8 w-8" />}
      keywords="estados brasileiros, empresas por estado, regiões brasil, distribuição geográfica empresas"
      gradient="secondary"
    >
      <div className="space-y-8">
        {/* Estatísticas Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-modern">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Total de Estados
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {estados.length}
                  </p>
                </div>
                <MapPin className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-modern">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Regiões
                  </p>
                  <p className="text-3xl font-bold text-secondary">
                    {regioes.length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-modern">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Total de Empresas
                  </p>
                  <p className="text-3xl font-bold text-accent">
                    {totalEmpresas.toLocaleString('pt-BR')}
                  </p>
                </div>
                <Building2 className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-modern">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Análises
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {chartData.length}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Busca */}
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFilterChange={setFilters}
          placeholder="Buscar estados..."
          showFilters={false}
        />

        {/* Visualizações */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mapa Regional */}
          <RegionalMap regions={regionalData} />
          
          {/* Gráfico dos Top Estados */}
          {chartData.length > 0 && (
            <StatisticsChart
              data={chartData}
              title="Top 10 Estados por Número de Empresas"
              type="bar"
              height={400}
            />
          )}
        </div>

        {/* Estados por Região */}
        {regioes.map((regiao) => {
          const estadosRegiao = getEstadosPorRegiao(regiao)
            .filter(estado => filteredStates.includes(estado));
          
          if (estadosRegiao.length === 0) return null;
          
          return (
            <div key={regiao} className="space-y-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: regionalData.find(r => r.name === regiao)?.color }}
                />
                <h2 className="text-2xl font-semibold text-gradient">{regiao}</h2>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {estadosRegiao.length} {estadosRegiao.length === 1 ? 'estado' : 'estados'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {estadosRegiao.map((estado) => (
                  <Link
                    key={estado.uf}
                    to={`/estados/${estado.uf.toLowerCase()}`}
                    className="block hover:scale-105 transition-transform duration-200"
                  >
                    <Card className="h-full card-modern hover:shadow-elegant transition-all duration-300 hover:border-primary/50 group">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-semibold text-foreground flex items-center justify-between">
                          <span className="group-hover:text-primary transition-colors duration-300">
                            {estado.nome}
                          </span>
                          <Badge variant="outline" className="text-xs group-hover:border-primary/50 transition-colors duration-300">
                            {estado.uf}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Building2 className="h-4 w-4 group-hover:text-primary transition-colors duration-300" />
                          <span className="text-sm">
                            {isLoading ? 'Carregando...' : (
                              `${getEmpresasCount(estado.uf).toLocaleString('pt-BR')} ${getEmpresasCount(estado.uf) === 1 ? 'empresa' : 'empresas'}`
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
        
        {/* Informações sobre navegação */}
        <div className="bg-gradient-subtle rounded-xl p-8 border border-border/50">
          <h3 className="text-2xl font-semibold text-gradient mb-4">
            Sobre a navegação por estados
          </h3>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Explore empresas organizadas geograficamente por todo o Brasil. 
            Cada estado apresenta suas cidades com dados de CNPJs ativos, 
            facilitando a busca regional por tipo de negócio ou setor econômico.
          </p>
        </div>
      </div>
    </ModernPageLayout>
  );
};

export default EstadosPage;