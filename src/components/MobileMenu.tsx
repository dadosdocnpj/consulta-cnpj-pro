import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Factory, 
  TrendingUp, 
  Sparkles, 
  Shield, 
  Building,
  Users,
  ChevronRight
} from 'lucide-react';
import SearchWithSuggestions from '@/components/SearchWithSuggestions';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  const empresasItems = [
    { title: "Top 10 Empresas", href: "/ranking/top-empresas", icon: TrendingUp },
    { title: "Empresas Recentes", href: "/empresas-recentes", icon: Building2 },
    { title: "Startups Brasileiras", href: "/categoria/startups", icon: Sparkles },
    { title: "Empresas Públicas", href: "/categoria/publicas", icon: Shield }
  ];

  const localizacaoItems = [
    { title: "Estados", href: "/estados", icon: MapPin },
    { title: "Principais Cidades", href: "/estados", icon: Building }
  ];

  const setoresItems = [
    { title: "CNAEs por Seção", href: "/cnaes", icon: Factory },
    { title: "CNAEs Mais Comuns", href: "/cnaes/populares", icon: Users }
  ];

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 animate-slide-up sticky top-16 z-40">
      <nav className="container mx-auto px-4 py-6 space-y-6">
        {/* Search */}
        <div>
          <SearchWithSuggestions 
            placeholder="Buscar CNPJ, razão social..."
            className="w-full"
          />
        </div>

        <Separator />

        {/* Empresas Section */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Building2 className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-foreground">Empresas</h3>
          </div>
          <div className="space-y-2 ml-6">
            {empresasItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={handleLinkClick}
                className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-primary transition-smooth"
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </div>
                <ChevronRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>

        <Separator />

        {/* Localização Section */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-foreground">Localização</h3>
          </div>
          <div className="space-y-2 ml-6">
            {localizacaoItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={handleLinkClick}
                className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-primary transition-smooth"
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </div>
                <ChevronRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>

        <Separator />

        {/* Setores Section */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Factory className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-foreground">Setores</h3>
          </div>
          <div className="space-y-2 ml-6">
            {setoresItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={handleLinkClick}
                className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-primary transition-smooth"
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </div>
                <ChevronRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>

        <Separator />

        {/* Como Usar */}
        <Link
          to="/como-usar"
          onClick={handleLinkClick}
          className="flex items-center justify-between py-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
        >
          <span>Como Usar</span>
          <ChevronRight className="h-3 w-3" />
        </Link>
      </nav>
    </div>
  );
};

export default MobileMenu;