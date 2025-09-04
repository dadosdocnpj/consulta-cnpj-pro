import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Building2, TrendingUp, Award, Filter } from "lucide-react";
import ModernPageLayout from "@/components/ModernPageLayout";
import SearchFilter from "@/components/SearchFilter";
import StatisticsChart from "@/components/StatisticsChart";
import EmpresaCard from "@/components/EmpresaCard";
import LoadingCard from "@/components/LoadingCard";
import EmptyState from "@/components/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTopEmpresas } from "@/hooks/useTopEmpresas";

interface FilterState {
  situacao?: string;
  uf?: string;
  sortBy?: string;
}

const TopEmpresasPage = () => {
  const { data: empresas, isLoading, error } = useTopEmpresas(100);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterState>({});

  const breadcrumbItems = [
    { label: "Início", href: "/" },
    { label: "Ranking", href: "/ranking" },
    { label: "Top Empresas" }
  ];

  const filteredEmpresas = useMemo(() => {
    if (!empresas) return [];
    
    let filtered = empresas.filter(empresa => {
      const matchesSearch = !searchTerm || 
        empresa.razao_social?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        empresa.nome_fantasia?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        empresa.cnpj.includes(searchTerm);
      
      const matchesSituacao = !filters.situacao || empresa.situacao_cadastral === filters.situacao;
      const matchesUf = !filters.uf || empresa.endereco?.uf === filters.uf;
      
      return matchesSearch && matchesSituacao && matchesUf;
    });

    // Aplicar ordenação
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'name_asc':
          filtered.sort((a, b) => (a.razao_social || '').localeCompare(b.razao_social || ''));
          break;
        case 'name_desc':
          filtered.sort((a, b) => (b.razao_social || '').localeCompare(a.razao_social || ''));
          break;
        case 'date_desc':
          filtered.sort((a, b) => new Date(b.data_abertura || '').getTime() - new Date(a.data_abertura || '').getTime());
          break;
        case 'date_asc':
          filtered.sort((a, b) => new Date(a.data_abertura || '').getTime() - new Date(b.data_abertura || '').getTime());
          break;
      }
    }

    return filtered;
  }, [empresas, searchTerm, filters]);

  const chartData = useMemo(() => {
    if (!empresas) return [];
    
    const ufCount = empresas.reduce((acc, empresa) => {
      const uf = empresa.endereco?.uf || 'Não informado';
      acc[uf] = (acc[uf] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(ufCount)
      .map(([uf, count]) => ({ name: uf, value: count }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [empresas]);

  const situacaoData = useMemo(() => {
    if (!empresas) return [];
    
    const situacaoCount = empresas.reduce((acc, empresa) => {
      const situacao = empresa.situacao_cadastral || 'Não informado';
      acc[situacao] = (acc[situacao] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(situacaoCount)
      .map(([situacao, count]) => ({ name: situacao, value: count }));
  }, [empresas]);

  return (
    <ModernPageLayout 
      title="Top 100 Empresas do Brasil"
      description="Principais empresas brasileiras organizadas por relevância e atividade"
      breadcrumbItems={breadcrumbItems}
      icon={<Award className="h-8 w-8" />}
      keywords="top empresas brasil, maiores empresas, ranking empresas, corporações brasileiras"
      gradient="hero"
    >
      <div className="space-y-8">
        {/* Estatísticas Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-modern">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Total Listadas
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {filteredEmpresas.length}
                  </p>
                </div>
                <Building2 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-modern">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Estados
                  </p>
                  <p className="text-3xl font-bold text-secondary">
                    {chartData.length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-modern">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Ativas
                  </p>
                  <p className="text-3xl font-bold text-accent">
                    {filteredEmpresas.filter(e => e.situacao_cadastral === 'ATIVA').length}
                  </p>
                </div>
                <Award className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-modern">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Filtros Ativos
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {Object.values(filters).filter(Boolean).length}
                  </p>
                </div>
                <Filter className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Busca e Filtros */}
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFilterChange={setFilters}
          placeholder="Buscar empresas por nome ou CNPJ..."
        />

        {/* Gráficos de Análise */}
        {!isLoading && chartData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <StatisticsChart
              data={chartData}
              title="Distribuição por Estado"
              type="bar"
              height={300}
            />
            
            <StatisticsChart
              data={situacaoData}
              title="Distribuição por Situação"
              type="pie"
              height={300}
            />
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        )}

        {error && (
          <Card className="p-8 text-center card-modern">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Erro ao carregar empresas
            </h2>
            <p className="text-muted-foreground">
              Ocorreu um erro ao buscar as empresas. Tente novamente em alguns instantes.
            </p>
          </Card>
        )}

        {!isLoading && !error && filteredEmpresas.length === 0 && (
          <EmptyState 
            title="Nenhuma empresa encontrada"
            description="Não foram encontradas empresas com os filtros aplicados."
            icon="building"
          />
        )}

        {!isLoading && !error && filteredEmpresas.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredEmpresas.map((empresa, index) => (
                <div key={empresa.cnpj} className="relative">
                  {index < 3 && (
                    <div className="absolute -top-2 -left-2 z-10">
                      <Badge className="bg-gradient-primary text-white font-bold px-3 py-1 rounded-full shadow-glow">
                        #{index + 1}
                      </Badge>
                    </div>
                  )}
                  <EmpresaCard empresa={empresa} />
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Explore mais empresas por localização
              </p>
              <Link 
                to="/estados" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium btn-gradient px-6 py-3 rounded-lg transition-all duration-300"
              >
                <Building2 className="h-4 w-4" />
                Ver empresas por estado
              </Link>
            </div>
          </>
        )}
      </div>
    </ModernPageLayout>
  );
};

export default TopEmpresasPage;