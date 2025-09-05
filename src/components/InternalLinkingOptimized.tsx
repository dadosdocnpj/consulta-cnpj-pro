import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, TrendingUp, Clock } from 'lucide-react';

interface InternalLink {
  title: string;
  href: string;
  description: string;
  category: 'estado' | 'cnae' | 'ranking' | 'categoria';
  priority: 'high' | 'medium' | 'low';
}

interface InternalLinkingOptimizedProps {
  currentPage?: string;
  relatedLinks?: InternalLink[];
  showCategoryBadges?: boolean;
}

const InternalLinkingOptimized = ({ 
  currentPage, 
  relatedLinks = [],
  showCategoryBadges = true 
}: InternalLinkingOptimizedProps) => {
  
  // Default internal links for better discoverability
  const defaultLinks: InternalLink[] = [
    {
      title: 'Ranking das Maiores Empresas',
      href: '/ranking/top-empresas',
      description: 'Descubra as maiores empresas do Brasil por capital social',
      category: 'ranking',
      priority: 'high'
    },
    {
      title: 'Empresas Recentes',
      href: '/empresas-recentes',
      description: 'Últimas empresas registradas no CNPJ',
      category: 'ranking',
      priority: 'high'
    },
    {
      title: 'Startups Brasileiras',
      href: '/categoria/startups',
      description: 'Explore o ecossistema de startups do Brasil',
      category: 'categoria',
      priority: 'medium'
    },
    {
      title: 'Empresas Públicas',
      href: '/categoria/publicas',
      description: 'Órgãos públicos e empresas estatais',
      category: 'categoria',
      priority: 'medium'
    },
    {
      title: 'CNAEs por Categoria',
      href: '/cnae',
      description: 'Navegue pelos códigos de atividade econômica',
      category: 'cnae',
      priority: 'medium'
    },
    {
      title: 'Empresas por Estado',
      href: '/estados',
      description: 'Explore empresas por localização geográfica',
      category: 'estado',
      priority: 'medium'
    }
  ];

  const allLinks = [...relatedLinks, ...defaultLinks];
  
  // Filter out current page and prioritize links
  const filteredLinks = allLinks
    .filter(link => link.href !== currentPage)
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    })
    .slice(0, 6); // Limit to 6 links for better UX

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'estado':
        return <MapPin className="h-4 w-4" />;
      case 'cnae':
        return <Building2 className="h-4 w-4" />;
      case 'ranking':
        return <TrendingUp className="h-4 w-4" />;
      case 'categoria':
        return <Clock className="h-4 w-4" />;
      default:
        return <Building2 className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'estado':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'cnae':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'ranking':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'categoria':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  if (filteredLinks.length === 0) return null;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Páginas Relacionadas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="group block p-4 border rounded-lg hover:border-primary/50 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getCategoryIcon(link.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                      {link.title}
                    </h3>
                    {showCategoryBadges && (
                      <Badge
                        variant="secondary"
                        className={`text-xs ${getCategoryColor(link.category)}`}
                      >
                        {link.category}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {link.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InternalLinkingOptimized;