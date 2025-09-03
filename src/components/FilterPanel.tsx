import { useState } from "react";
import { Filter, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface FilterPanelProps {
  onFiltersChange: (filters: FilterState) => void;
  totalResults?: number;
}

export interface FilterState {
  search: string;
  situacao: string;
  cnae: string;
  porte: string;
}

const FilterPanel = ({ onFiltersChange, totalResults }: FilterPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    situacao: "",
    cnae: "",
    porte: ""
  });

  const hasActiveFilters = Object.values(filters).some(value => value !== "");

  const updateFilters = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters: FilterState = {
      search: "",
      situacao: "",
      cnae: "",
      porte: ""
    };
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  return (
    <div className="space-y-4">
      {/* Filter Toggle & Summary */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtros
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
                {Object.values(filters).filter(v => v !== "").length}
              </Badge>
            )}
          </Button>
          
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
              <X className="h-3 w-3" />
              Limpar filtros
            </Button>
          )}
        </div>
        
        {totalResults !== undefined && (
          <span className="text-sm text-muted-foreground">
            {totalResults} resultado{totalResults !== 1 ? 's' : ''} encontrado{totalResults !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Filtrar resultados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="space-y-2">
                <Label htmlFor="search">Buscar empresa</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Nome ou CNPJ..."
                    value={filters.search}
                    onChange={(e) => updateFilters("search", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Situação */}
              <div className="space-y-2">
                <Label>Situação</Label>
                <Select value={filters.situacao} onValueChange={(value) => updateFilters("situacao", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas</SelectItem>
                    <SelectItem value="ativa">Ativa</SelectItem>
                    <SelectItem value="suspensa">Suspensa</SelectItem>
                    <SelectItem value="baixada">Baixada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* CNAE */}
              <div className="space-y-2">
                <Label>Setor (CNAE)</Label>
                <Select value={filters.cnae} onValueChange={(value) => updateFilters("cnae", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="62">Tecnologia</SelectItem>
                    <SelectItem value="47">Comércio</SelectItem>
                    <SelectItem value="56">Alimentação</SelectItem>
                    <SelectItem value="68">Imobiliário</SelectItem>
                    <SelectItem value="85">Educação</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Porte */}
              <div className="space-y-2">
                <Label>Porte</Label>
                <Select value={filters.porte} onValueChange={(value) => updateFilters("porte", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="me">Microempresa</SelectItem>
                    <SelectItem value="epp">Pequeno Porte</SelectItem>
                    <SelectItem value="medio">Médio Porte</SelectItem>
                    <SelectItem value="grande">Grande Porte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FilterPanel;