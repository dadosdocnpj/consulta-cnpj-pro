import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-primary">
              dadosdocnpj.com.br
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/sobre" className="text-foreground hover:text-primary transition-smooth">
              Sobre
            </a>
            <a href="/contato" className="text-foreground hover:text-primary transition-smooth">
              Contato
            </a>
            <a href="/faq" className="text-foreground hover:text-primary transition-smooth">
              FAQ
            </a>
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex items-center space-x-2 max-w-md">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Buscar CNPJ, razão social ou nome fantasia"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;