import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface VirtualizedListItem {
  id: string | number;
  [key: string]: any;
}

interface VirtualizedListProps {
  items: VirtualizedListItem[];
  itemHeight?: number;
  height?: number;
  renderItem: (item: VirtualizedListItem, index: number) => React.ReactNode;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchFields?: string[];
  pageSize?: number;
  loading?: boolean;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
}

const VirtualizedList = ({
  items = [],
  itemHeight = 80,
  height = 400,
  renderItem,
  searchable = true,
  searchPlaceholder = "Buscar...",
  searchFields = [],
  pageSize = 50,
  loading = false,
  onLoadMore,
  hasNextPage = false
}: VirtualizedListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const filteredItems = React.useMemo(() => {
    if (!searchTerm) return items;
    
    return items.filter(item => {
      if (searchFields.length === 0) {
        // Se não especificou campos, busca em todas as propriedades string
        return Object.values(item).some(value => 
          typeof value === 'string' && 
          value.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      return searchFields.some(field => {
        const value = item[field];
        return typeof value === 'string' && 
               value.toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  }, [items, searchTerm, searchFields]);

  const paginatedItems = React.useMemo(() => {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    return filteredItems.slice(0, end);
  }, [filteredItems, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredItems.length / pageSize);

  const loadMore = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    } else if (onLoadMore && hasNextPage) {
      onLoadMore();
    }
  };

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  return (
    <Card className="card-modern">
      <CardContent className="p-0">
        {searchable && (
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {searchTerm && (
              <p className="text-sm text-muted-foreground mt-2">
                {filteredItems.length} resultados encontrados
              </p>
            )}
          </div>
        )}

        <div className="relative" style={{ height: `${height}px`, overflowY: 'auto' }}>
          <div className="space-y-2 p-4">
            {paginatedItems.map((item, index) => (
              <div key={item.id || index} style={{ minHeight: `${itemHeight}px` }}>
                {renderItem(item, index)}
              </div>
            ))}
            
            {loading && Array.from({ length: 5 }).map((_, i) => (
              <div key={`loading-${i}`} className="p-4">
                <Skeleton className="h-12 w-full" />
              </div>
            ))}
          </div>

          {loading && (
            <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                <span className="text-sm">Carregando...</span>
              </div>
            </div>
          )}
        </div>

        {/* Pagination/Load More */}
        <div className="p-4 border-t border-border flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {paginatedItems.length} de {filteredItems.length} itens
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="text-sm font-medium px-2">
              {currentPage + 1} de {Math.max(1, totalPages)}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={loadMore}
              disabled={currentPage >= totalPages - 1 && !hasNextPage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VirtualizedList;