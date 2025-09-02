import { Search, TrendingUp, Shield, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Future: implement search logic
      console.log("Searching for:", searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
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
              Encontre as informações completas de qualquer{" "}
              <span className="text-gradient bg-gradient-accent bg-clip-text text-transparent">CNPJ</span>{" "}
              no Brasil
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              Milhões de empresas catalogadas, atualizadas e prontas para sua consulta.
              Dados oficiais da Receita Federal.
            </p>
          </div>

          {/* Main Search Card */}
          <div className="card-modern bg-white/10 backdrop-blur-xl border-white/20 p-8 max-w-3xl mx-auto mb-16 animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Digite o CNPJ, razão social ou nome fantasia"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-12 h-16 text-lg bg-background/90 border-0 focus:bg-background search-glow rounded-xl font-medium"
                />
              </div>
              <Button
                onClick={handleSearch}
                variant="hero"
                size="lg"
                className="h-16 px-10 text-lg font-bold rounded-xl"
              >
                <Search className="h-5 w-5 mr-2" />
                Pesquisar
              </Button>
            </div>
            
            <p className="text-primary-foreground/70 text-sm mt-4">
              Exemplo: <span className="text-accent font-semibold">11.222.333/0001-81</span> ou{" "}
              <span className="text-accent font-semibold">"Petrobras"</span> ou{" "}
              <span className="text-accent font-semibold">"Banco do Brasil"</span>
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div className="card-modern bg-white/8 backdrop-blur-md border-white/15 p-8 text-center hover:bg-white/12 transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-sm rounded-2xl mb-6 shadow-glow border border-white/20">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-primary-foreground mb-3 text-xl">Dados Atualizados</h3>
              <p className="text-primary-foreground/85 text-base leading-relaxed">Informações sempre atualizadas mensalmente da Receita Federal</p>
            </div>
            
            <div className="card-modern bg-white/8 backdrop-blur-md border-white/15 p-8 text-center hover:bg-white/12 transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-sm rounded-2xl mb-6 shadow-glow border border-white/20">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-primary-foreground mb-3 text-xl">100% Gratuito</h3>
              <p className="text-primary-foreground/85 text-base leading-relaxed">Consultas ilimitadas sem custo algum. Sempre será gratuito</p>
            </div>
            
            <div className="card-modern bg-white/8 backdrop-blur-md border-white/15 p-8 text-center hover:bg-white/12 transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-sm rounded-2xl mb-6 shadow-glow border border-white/20">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-primary-foreground mb-3 text-xl">Consulta Rápida</h3>
              <p className="text-primary-foreground/85 text-base leading-relaxed">Resultados em segundos com interface moderna e intuitiva</p>
            </div>
          </div>

          {/* AdSense Placeholder */}
          <div className="card-modern bg-white/5 backdrop-blur-sm border-white/10 p-8 max-w-2xl mx-auto animate-slide-up" style={{animationDelay: '0.9s'}}>
            <p className="text-primary-foreground/60 text-sm font-medium">
              [Espaço reservado para AdSense - 728x90]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;