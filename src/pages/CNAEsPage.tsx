import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Building2, TrendingUp } from "lucide-react";
import ModernPageLayout from "@/components/ModernPageLayout";
import SearchFilter from "@/components/SearchFilter";
import StatisticsChart from "@/components/StatisticsChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCNAESecoes } from "@/hooks/useCNAEsData";
import LoadingCard from "@/components/LoadingCard";
import EmptyState from "@/components/EmptyState";

const CNAEsPage = () => {
  const { data: secoes, isLoading, error } = useCNAESecoes();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  const filteredSecoes = useMemo(() => {
    if (!secoes) return [];
    
    return secoes.filter(secao => {
      const matchesSearch = !searchTerm || 
        secao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        secao.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (secao.descricao && secao.descricao.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesSearch;
    });
  }, [secoes, searchTerm]);

  const chartData = useMemo(() => {
    if (!secoes) return [];
    return secoes
      .filter(s => s.total_empresas > 0)
      .map(secao => ({
        name: `Seção ${secao.codigo}`,
        value: secao.total_empresas
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [secoes]);

  const totalEmpresas = useMemo(() => {
    return secoes?.reduce((total, secao) => total + (secao.total_empresas || 0), 0) || 0;
  }, [secoes]);

  if (isLoading) {
    return (
      <ModernPageLayout
        title="Classificação Nacional de Atividades Econômicas (CNAE)"
        description="Navegue por empresas organizadas por setores e atividades econômicas"
        breadcrumbItems={[{ label: "CNAEs" }]}
        icon={<Briefcase className="h-8 w-8" />}
        keywords="CNAE, classificação nacional atividades econômicas, setores empresariais, atividades empresariais"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </ModernPageLayout>
    );
  }

  if (error || !secoes?.length) {
    return (
      <ModernPageLayout
        title="Classificação Nacional de Atividades Econômicas (CNAE)"
        description="Navegue por empresas organizadas por setores e atividades econômicas"
        breadcrumbItems={[{ label: "CNAEs" }]}
        icon={<Briefcase className="h-8 w-8" />}
        keywords="CNAE, classificação nacional atividades econômicas, setores empresariais, atividades empresariais"
      >
        <EmptyState 
          title="Erro ao carregar CNAEs"
          description="Não foi possível carregar as seções CNAE"
        />
      </ModernPageLayout>
    );
  }

  return (
    <ModernPageLayout
      title="Classificação Nacional de Atividades Econômicas (CNAE)"
      description="Navegue por empresas organizadas por setores e atividades econômicas"
      breadcrumbItems={[{ label: "CNAEs" }]}
      icon={<Briefcase className="h-8 w-8" />}
      keywords="CNAE, classificação nacional atividades econômicas, setores empresariais, atividades empresariais"
    >
      <div className="space-y-8">
        {/* Estatísticas Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-modern">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Total de Seções
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {secoes.length}
                  </p>
                </div>
                <Briefcase className="h-8 w-8 text-primary" />
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
                  <p className="text-3xl font-bold text-secondary">
                    {totalEmpresas.toLocaleString('pt-BR')}
                  </p>
                </div>
                <Building2 className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-modern">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Seções Ativas
                  </p>
                  <p className="text-3xl font-bold text-accent">
                    {secoes.filter(s => s.total_empresas > 0).length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-accent" />
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
          placeholder="Buscar seções CNAE..."
          showFilters={false}
        />

        {/* Gráfico das Top Seções */}
        {chartData.length > 0 && (
          <StatisticsChart
            data={chartData}
            title="Top 10 Seções por Número de Empresas"
            type="bar"
            height={400}
          />
        )}

        {/* Grid de Seções */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSecoes.map((secao) => (
            <Link key={secao.id} to={`/cnae/secao/${secao.slug}`}>
              <Card className="h-full card-modern hover:shadow-elegant transition-all duration-300 hover:scale-105 cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {secao.icone || "📋"}
                  </div>
                  <CardTitle className="text-lg">
                    Seção {secao.codigo}
                  </CardTitle>
                  <CardDescription className="font-medium text-foreground">
                    {secao.nome}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground text-center line-clamp-2">
                      {secao.descricao}
                    </p>
                    {secao.total_empresas > 0 && (
                      <div className="flex justify-center">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {secao.total_empresas.toLocaleString('pt-BR')} empresas
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Informações sobre CNAE */}
        <div className="bg-gradient-subtle rounded-xl p-8 border border-border/50">
          <h2 className="text-2xl font-semibold mb-4 text-gradient">O que é CNAE?</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            A Classificação Nacional de Atividades Econômicas (CNAE) é o instrumento 
            de padronização nacional dos códigos de atividade econômica e dos critérios 
            de enquadramento utilizados pelos diversos órgãos da Administração Tributária 
            do país. É aplicada a todos os agentes econômicos que estão engajados na 
            produção de bens e serviços.
          </p>
        </div>
      </div>
    </ModernPageLayout>
  );
};

export default CNAEsPage;