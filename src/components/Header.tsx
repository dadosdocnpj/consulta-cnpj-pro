import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SearchWithSuggestions from "@/components/SearchWithSuggestions";
const logoImage = "/lovable-uploads/d54f0af5-d59b-4d5e-9876-ba7766fd200c.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-background/95 border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-smooth">
              <img 
                src={logoImage} 
                alt="Dados do CNPJ - Portal de consulta empresarial" 
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/estados" className="text-foreground hover:text-primary transition-smooth relative group font-medium">
                Estados
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/cnaes" className="text-foreground hover:text-primary transition-smooth relative group font-medium">
                CNAEs
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/como-usar" className="text-foreground hover:text-primary transition-smooth relative group font-medium">
                Como Usar
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Search Bar (Desktop) */}
            <div className="hidden lg:flex items-center space-x-2 max-w-md">
              <SearchWithSuggestions 
                placeholder="Buscar CNPJ, razão social..."
                className="flex-1"
              />
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
            <Link to="/estados" className="block text-foreground hover:text-primary transition-smooth font-medium">
              Estados
            </Link>
            <Link to="/cnaes" className="block text-foreground hover:text-primary transition-smooth font-medium">
              CNAEs
            </Link>
            <Link to="/como-usar" className="block text-foreground hover:text-primary transition-smooth font-medium">
              Como Usar
            </Link>
            <div className="pt-4">
              <SearchWithSuggestions 
                placeholder="Buscar CNPJ, razão social..."
              />
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;