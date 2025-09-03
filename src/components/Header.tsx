import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import NavigationDropdown from "@/components/NavigationDropdown";
import SearchToggle from "@/components/SearchToggle";
import MobileMenu from "@/components/MobileMenu";
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
            <div className="hidden md:flex items-center space-x-4">
              <NavigationDropdown />
            </div>

            {/* Desktop Search (Expandable) */}
            <div className="hidden md:flex items-center">
              <SearchToggle />
            </div>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden hover:scale-105 transition-spring" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;