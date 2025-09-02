import { Search } from "lucide-react";
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
    <section className="bg-gradient-hero py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Encontre as informações completas de qualquer CNPJ no Brasil
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            Milhões de empresas catalogadas, atualizadas e prontas para sua consulta
          </p>

          {/* Main Search Bar */}
          <div className="max-w-2xl mx-auto bg-background/95 backdrop-blur-sm rounded-lg p-6 shadow-glow">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Digite o CNPJ, razão social ou nome fantasia"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-12 text-lg border-primary/20 focus:border-primary"
                />
              </div>
              <Button
                onClick={handleSearch}
                variant="search"
                size="lg"
                className="h-12 px-8"
              >
                <Search className="h-5 w-5 mr-2" />
                Pesquisar
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-3">
              Exemplo: 11.222.333/0001-81 ou "Petrobras" ou "Banco do Brasil"
            </p>
          </div>

          {/* AdSense Placeholder */}
          <div className="mt-8">
            <div className="bg-muted/50 rounded-lg p-4 border-2 border-dashed border-border">
              <p className="text-sm text-muted-foreground">
                [Espaço reservado para AdSense - 728x90]
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;