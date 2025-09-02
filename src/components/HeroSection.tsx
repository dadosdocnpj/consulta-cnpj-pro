import { Search, TrendingUp, Shield, Clock, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCNPJLookup } from "@/hooks/useCNPJLookup";
import { isValidCNPJFormat, normalizeCNPJInput, formatCNPJ } from "@/utils/cnpj";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isValidInput, setIsValidInput] = useState(true);
  const navigate = useNavigate();
  const { lookupCNPJ, isLoading, data, isSuccess } = useCNPJLookup();

  const validateInput = (input: string) => {
    if (!input.trim()) return true;
    
    const normalized = normalizeCNPJInput(input);
    if (normalized.type === 'cnpj') {
      return isValidCNPJFormat(normalized.value);
    }
    return true; // Nomes de empresa são sempre válidos
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsValidInput(validateInput(value));
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    if (!validateInput(searchQuery)) {
      setIsValidInput(false);
      return;
    }

    const normalized = normalizeCNPJInput(searchQuery);
    lookupCNPJ({ cnpj: normalized.value });
  };

  // Redirecionar quando a busca for bem-sucedida
  useEffect(() => {
    if (isSuccess && data?.success && data.path) {
      navigate(data.path);
    }
  }, [isSuccess, data, navigate]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading && searchQuery.trim() && isValidInput) {
      handleSearch();
    }
  };

  return (
    <section className="relative bg-gradient-hero py-16 md:py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-primary-foreground">100% Gratuito • Dados Atualizados</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-8 leading-tight font-heading">
              Descubra tudo sobre qualquer{" "}
              <span className="text-gradient bg-gradient-accent bg-clip-text text-transparent">empresa</span>{" "}
              do Brasil em segundos
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              Milhões de empresas na palma da sua mão. Informações sempre atualizadas para suas decisões importantes.
            </p>
          </div>

          {/* Main Search Card */}
          <div className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl p-8 max-w-3xl mx-auto mb-16 animate-slide-up shadow-2xl" style={{animationDelay: '0.3s'}}>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Ex: Petrobras, 11.222.333/0001-81 ou Magazine Luiza"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className={`pl-12 h-16 text-lg bg-white border-2 ${
                    !isValidInput 
                      ? 'border-destructive focus:border-destructive focus:ring-destructive/20' 
                      : 'border-input focus:border-primary focus:ring-primary/20'
                  } rounded-xl font-medium text-foreground placeholder:text-muted-foreground search-glow transition-all duration-300`}
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isLoading || !searchQuery.trim() || !isValidInput}
                variant="hero"
                size="lg"
                className="h-16 px-10 text-lg font-bold rounded-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Buscar Agora
                  </>
                )}
              </Button>
            </div>
            
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
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div className="bg-white/90 backdrop-blur-md border border-white/30 rounded-2xl p-8 text-center hover:bg-white/95 transition-all duration-300 hover:scale-105 shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 border border-primary/20">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
               <h3 className="font-bold text-gray-900 mb-3 text-xl">Sempre Atualizado</h3>
               <p className="text-gray-600 text-base leading-relaxed">Informações em tempo real para decisões certeiras</p>
             </div>
             
             <div className="bg-white/90 backdrop-blur-md border border-white/30 rounded-2xl p-8 text-center hover:bg-white/95 transition-all duration-300 hover:scale-105 shadow-xl">
               <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-6 border border-accent/20">
                 <Shield className="h-8 w-8 text-accent" />
               </div>
               <h3 className="font-bold text-gray-900 mb-3 text-xl">Totalmente Grátis</h3>
               <p className="text-gray-600 text-base leading-relaxed">Consultas ilimitadas sem pegadinhas ou custos ocultos</p>
             </div>
             
             <div className="bg-white/90 backdrop-blur-md border border-white/30 rounded-2xl p-8 text-center hover:bg-white/95 transition-all duration-300 hover:scale-105 shadow-xl">
               <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-2xl mb-6 border border-secondary/20">
                 <Clock className="h-8 w-8 text-secondary" />
               </div>
               <h3 className="font-bold text-gray-900 mb-3 text-xl">Resultados Instantâneos</h3>
               <p className="text-gray-600 text-base leading-relaxed">Encontre o que precisa em poucos cliques</p>
            </div>
          </div>

          {/* AdSense Placeholder */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl p-8 max-w-2xl mx-auto animate-slide-up shadow-lg" style={{animationDelay: '0.9s'}}>
            <p className="text-gray-500 text-sm font-medium text-center">
              [Espaço reservado para AdSense - 728x90]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;