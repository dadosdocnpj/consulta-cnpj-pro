import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
const logoImage = "/lovable-uploads/d54f0af5-d59b-4d5e-9876-ba7766fd200c.png";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-background/95 border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img 
                src={logoImage} 
                alt="Dados do CNPJ - Portal de consulta empresarial" 
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/sobre" className="text-foreground hover:text-primary transition-smooth relative group font-medium">
                Sobre
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="/contato" className="text-foreground hover:text-primary transition-smooth relative group font-medium">
                Contato
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="/faq" className="text-foreground hover:text-primary transition-smooth relative group font-medium">
                FAQ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>

            {/* Search Bar (Desktop) */}
            <div className="hidden lg:flex items-center space-x-2 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar CNPJ, razão social..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 search-glow border-border/50 bg-background/50"
                />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden hover:scale-105 transition-spring" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 animate-slide-up sticky top-16 z-40">
          <nav className="container mx-auto px-4 py-6 space-y-4">
            <a href="/sobre" className="block text-foreground hover:text-primary transition-smooth font-medium">
              Sobre
            </a>
            <a href="/contato" className="block text-foreground hover:text-primary transition-smooth font-medium">
              Contato
            </a>
            <a href="/faq" className="block text-foreground hover:text-primary transition-smooth font-medium">
              FAQ
            </a>
            <div className="pt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar CNPJ, razão social..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 search-glow"
                />
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;