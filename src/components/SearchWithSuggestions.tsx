import { Search, Loader2, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCNPJLookup } from "@/hooks/useCNPJLookup";
import { useEmpresaSearch } from "@/hooks/useEmpresaSearch";
import { isValidCNPJFormat, normalizeCNPJInput } from "@/utils/cnpj";

interface SearchWithSuggestionsProps {
  placeholder?: string;
  className?: string;
  size?: "default" | "lg";
  variant?: "default" | "hero";
}

const SearchWithSuggestions = ({ 
  placeholder = "Ex: Petrobras, 11.222.333/0001-81 ou Magazine Luiza",
  className = "",
  size = "default",
  variant = "default"
}: SearchWithSuggestionsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isValidInput, setIsValidInput] = useState(true);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const { lookupCNPJ, isLoading: isCNPJLoading, data, isSuccess } = useCNPJLookup();
  const { suggestions, isSearching, searchEmpresas, clearSuggestions } = useEmpresaSearch();

  const validateInput = (input: string) => {
    if (!input.trim()) return true;
    
    const normalized = normalizeCNPJInput(input);
    if (normalized.type === 'cnpj') {
      return isValidCNPJFormat(normalized.value);
    }
    return true;
  };

  // Debounce para evitar muitas requisições
  const debounceTimeout = useRef<NodeJS.Timeout>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsValidInput(validateInput(value));

    // Limpar timeout anterior
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Se não for CNPJ válido, buscar sugestões por nome
    const normalized = normalizeCNPJInput(value);
    if (normalized.type !== 'cnpj' && value.length >= 2) {
      // Adicionar debounce de 300ms
      debounceTimeout.current = setTimeout(() => {
        searchEmpresas(value, 8);
        setShowSuggestions(true);
      }, 300);
    } else {
      clearSuggestions();
      setShowSuggestions(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() || !validateInput(searchQuery)) return;
    
    const normalized = normalizeCNPJInput(searchQuery);
    lookupCNPJ({ cnpj: normalized.value });
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (slug: string) => {
    navigate(`/${slug}`);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  useEffect(() => {
    if (isSuccess && data?.status === 'OK' && data?.url_path) {
      navigate(data.url_path);
      setSearchQuery("");
    }
  }, [isSuccess, data, navigate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isCNPJLoading && searchQuery.trim() && isValidInput) {
      handleSearch();
    }
  };

  const inputHeight = size === "lg" ? "h-16" : "h-12";
  const buttonHeight = size === "lg" ? "h-16" : "h-12";
  const textSize = size === "lg" ? "text-lg" : "text-base";

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className={`flex ${variant === "hero" ? "flex-col sm:flex-row" : "flex-row"} gap-4`}>
        <div className="flex-1 relative">
          <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${size === "lg" ? "h-6 w-6" : "h-5 w-5"} text-gray-500`} />
          <Input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className={`${size === "lg" ? "pl-12" : "pl-10"} ${inputHeight} ${textSize} ${
              variant === "hero" 
                ? "bg-white border-2" 
                : "bg-background/50"
            } ${
              !isValidInput 
                ? 'border-destructive focus:border-destructive focus:ring-destructive/20' 
                : 'border-input focus:border-primary focus:ring-primary/20'
            } ${variant === "hero" ? "rounded-xl" : "rounded-lg"} font-medium text-foreground placeholder:text-muted-foreground search-glow transition-all duration-300`}
          />
        </div>
        
        <Button
          onClick={handleSearch}
          disabled={isCNPJLoading || !searchQuery.trim() || !isValidInput}
          variant={variant === "hero" ? "hero" : "default"}
          size={size}
          className={`${buttonHeight} ${size === "lg" ? "px-10 text-lg" : "px-6"} font-bold ${variant === "hero" ? "rounded-xl" : "rounded-lg"}`}
        >
          {isCNPJLoading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Buscando...
            </>
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              {variant === "hero" ? "Buscar Agora" : "Buscar"}
            </>
          )}
        </Button>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && (suggestions.length > 0 || isSearching) && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center">
              <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2" />
              <span className="text-sm text-muted-foreground">Buscando empresas...</span>
            </div>
          ) : (
            <>
              <div className="p-3 border-b border-border bg-muted/50">
                <span className="text-sm font-medium text-foreground">
                  {suggestions.length} empresa{suggestions.length !== 1 ? 's' : ''} encontrada{suggestions.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              {suggestions.map((empresa) => (
                <button
                  key={empresa.cnpj}
                  onClick={() => handleSuggestionClick(empresa.slug)}
                  className="w-full p-4 text-left hover:bg-muted/50 transition-colors border-b border-border/30 last:border-b-0"
                >
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">
                        {empresa.razao_social}
                      </div>
                      {empresa.nome_fantasia && empresa.nome_fantasia !== empresa.razao_social && (
                        <div className="text-sm text-muted-foreground truncate">
                          {empresa.nome_fantasia}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground mt-1">
                        {empresa.cnae_principal && (
                          <span className="inline-block mr-3">{empresa.cnae_principal}</span>
                        )}
                        <span>{empresa.municipio}/{empresa.uf}</span>
                      </div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                      empresa.situacao === 'ATIVA' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {empresa.situacao}
                    </div>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      )}

      {/* Validation message */}
      {variant === "hero" && (
        <p className={`text-sm mt-4 transition-colors duration-200 ${
          !isValidInput 
            ? 'text-destructive' 
            : 'text-muted-foreground'
        }`}>
          {!isValidInput ? (
            <>
              <strong>CNPJ inválido:</strong> Digite um CNPJ com 14 dígitos ou o nome da empresa
            </>
          ) : (
            <>
              Exemplo: <span className="text-primary font-semibold">11.222.333/0001-81</span> ou{" "}
              <span className="text-primary font-semibold">"Petrobras"</span> ou{" "}
              <span className="text-primary font-semibold">"Banco do Brasil"</span>
            </>
          )}
        </p>
      )}
    </div>
  );
};

export default SearchWithSuggestions;