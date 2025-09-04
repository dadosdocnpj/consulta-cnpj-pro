import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Building2, Clock, Filter } from "lucide-react";
import ModernPageLayout from "@/components/ModernPageLayout";
import SearchFilter from "@/components/SearchFilter";
import EmpresaCard from "@/components/EmpresaCard";
import LoadingCard from "@/components/LoadingCard";
import EmptyState from "@/components/EmptyState";
import { Card } from "@/components/ui/card";
import { useEmpresasRecentes } from "@/hooks/useEmpresasRecentes";

const EmpresasRecentesPage = () => {
  const { data: empresas, isLoading, error } = useEmpresasRecentes(50);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  const filteredEmpresas = useMemo(() => {
    if (!empresas) return [];
    return empresas.filter(empresa => {
      const matchesSearch = !searchTerm || 
        empresa.razao_social?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        empresa.nome_fantasia?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        empresa.cnpj.includes(searchTerm);
      return matchesSearch;
    });
  }, [empresas, searchTerm]);

  const breadcrumbItems = [
    { label: "Início", href: "/" },
    { label: "Empresas Recentes" }
  ];

  return (
    <ModernPageLayout 
      title="Empresas Recentes"
      description="Últimas empresas consultadas e adicionadas à nossa base de dados"
      breadcrumbItems={breadcrumbItems}
      icon={<Clock className="h-8 w-8" />}
      keywords="empresas recentes, últimas consultas, novos cnpj, empresas atualizadas"
      gradient="secondary"
    >
      <div className="space-y-8">
        {/* Busca */}
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFilterChange={setFilters}
          placeholder="Buscar empresas recentes..."
          showFilters={false}
        />

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      )}

      {error && (
        <Card className="p-8 text-center">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Erro ao carregar empresas
          </h2>
          <p className="text-muted-foreground">
            Ocorreu um erro ao buscar as empresas recentes. Tente novamente em alguns instantes.
          </p>
        </Card>
      )}

      {!isLoading && !error && empresas && empresas.length === 0 && (
        <EmptyState 
          title="Nenhuma empresa encontrada"
          description="Não foram encontradas empresas recentes para exibir."
          icon="building"
        />
      )}

      {!isLoading && !error && filteredEmpresas.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredEmpresas.map((empresa) => (
              <EmpresaCard key={empresa.cnpj} empresa={empresa} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Explore mais empresas
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                to="/ranking/top-empresas" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
              >
                <Building2 className="h-4 w-4" />
                Top empresas
              </Link>
              <Link 
                to="/estados" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
              >
                <Building2 className="h-4 w-4" />
                Por estado
              </Link>
            </div>
          </div>
        </>
      )}
      </div>
    </ModernPageLayout>
  );
};

export default EmpresasRecentesPage;