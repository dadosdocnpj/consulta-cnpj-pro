import React from 'react';
import { Link } from 'react-router-dom';
import { CNPJLookupResponse } from '@/types/cnpj';
import { getEstadoPorUF } from '@/data/estados';
import { createCitySlug } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building2, TrendingUp, Users } from 'lucide-react';

interface InternalLinkingProps {
  empresa: CNPJLookupResponse;
}

const InternalLinking: React.FC<InternalLinkingProps> = ({ empresa }) => {
  const estado = empresa.endereco?.uf ? getEstadoPorUF(empresa.endereco.uf) : undefined;
  const cidade = empresa.endereco?.municipio;
  const citySlug = cidade ? createCitySlug(cidade) : '';

  const linkItems = [
    ...(estado ? [{
      href: `/estados/${empresa.endereco?.uf.toLowerCase()}`,
      label: `Empresas de ${estado.nome}`,
      description: `Ver todas as empresas do estado ${estado.nome}`,
      icon: MapPin
    }] : []),
    ...(cidade && estado ? [{
      href: `/estados/${empresa.endereco?.uf.toLowerCase()}/${citySlug}`,
      label: `Empresas de ${cidade}`,
      description: `Outras empresas em ${cidade}, ${estado.nome}`,
      icon: Building2
    }] : []),
    ...(empresa.cnae_principal ? [{
      href: `/cnaes/${empresa.cnae_principal.codigo}`,
      label: `Setor: ${empresa.cnae_principal.descricao}`,
      description: `Empresas do mesmo setor econômico`,
      icon: TrendingUp
    }] : []),
    {
      href: '/estados',
      label: 'Explorar por Estados',
      description: 'Navegue por empresas de todo o Brasil',
      icon: Users
    }
  ];

  if (linkItems.length === 0) return null;

  return (
    <section className="bg-muted/30 rounded-lg p-6" aria-labelledby="internal-links-title">
      <h3 id="internal-links-title" className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <TrendingUp className="h-5 w-5 mr-2" />
        Explorar Relacionados
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {linkItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={index}
              to={item.href}
              className="block p-4 bg-background rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all duration-200 group"
              title={item.description}
            >
              <div className="flex items-start space-x-3">
                <IconComponent className="h-5 w-5 text-primary mt-1 group-hover:scale-110 transition-transform" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {item.label}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <Badge variant="outline" className="ml-2 opacity-70 group-hover:opacity-100">
                  Ver
                </Badge>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default InternalLinking;