import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchWithSuggestions from '@/components/SearchWithSuggestions';

interface SearchToggleProps {
  className?: string;
}

const SearchToggle = ({ className = "" }: SearchToggleProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isExpanded]);

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {!isExpanded ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(true)}
          className="text-muted-foreground hover:text-foreground transition-smooth"
          aria-label="Expandir busca"
        >
          <Search className="h-5 w-5" />
        </Button>
      ) : (
        <div className="flex items-center space-x-2 animate-slide-up">
          <div className="w-72">
            <SearchWithSuggestions 
              placeholder="Buscar CNPJ, razão social..."
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(false)}
            className="text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Fechar busca"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchToggle;