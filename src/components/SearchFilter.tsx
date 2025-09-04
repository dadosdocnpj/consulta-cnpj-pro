import React, { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterOptions {
  situacao?: string;
  porte?: string;
  uf?: string;
  sortBy?: string;
}

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  placeholder?: string;
  showFilters?: boolean;
}

const SearchFilter = ({
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  placeholder = "Buscar...",
  showFilters = true
}: SearchFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const clearFilters = () => {
    onFilterChange({});
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 search-glow"
          />
        </div>
        
        {showFilters && (
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="relative">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtros
                {activeFiltersCount > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="ml-2 h-5 w-5 p-0 text-xs rounded-full bg-primary text-primary-foreground"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Filtros</h4>
                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Limpar
                    </Button>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Situação</label>
                    <Select
                      value={filters.situacao || ""}
                      onValueChange={(value) => 
                        onFilterChange({ ...filters, situacao: value || undefined })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Todas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todas</SelectItem>
                        <SelectItem value="ATIVA">Ativa</SelectItem>
                        <SelectItem value="SUSPENSA">Suspensa</SelectItem>
                        <SelectItem value="INAPTA">Inapta</SelectItem>
                        <SelectItem value="BAIXADA">Baixada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Porte</label>
                    <Select
                      value={filters.porte || ""}
                      onValueChange={(value) => 
                        onFilterChange({ ...filters, porte: value || undefined })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todos</SelectItem>
                        <SelectItem value="ME">Microempresa</SelectItem>
                        <SelectItem value="EPP">Empresa de Pequeno Porte</SelectItem>
                        <SelectItem value="DEMAIS">Demais</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Ordenar por</label>
                    <Select
                      value={filters.sortBy || "relevance"}
                      onValueChange={(value) => 
                        onFilterChange({ ...filters, sortBy: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Relevância" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevância</SelectItem>
                        <SelectItem value="name_asc">Nome A-Z</SelectItem>
                        <SelectItem value="name_desc">Nome Z-A</SelectItem>
                        <SelectItem value="date_desc">Mais recentes</SelectItem>
                        <SelectItem value="date_asc">Mais antigas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.situacao && (
            <Badge variant="secondary">
              Situação: {filters.situacao}
            </Badge>
          )}
          {filters.porte && (
            <Badge variant="secondary">
              Porte: {filters.porte}
            </Badge>
          )}
          {filters.uf && (
            <Badge variant="secondary">
              UF: {filters.uf}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;