import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { CNAEHierarchy } from '@/hooks/useCNAEHierarchy';

interface CNAEBreadcrumbProps {
  hierarchy: CNAEHierarchy;
  className?: string;
}

export const CNAEBreadcrumb: React.FC<CNAEBreadcrumbProps> = ({ hierarchy, className = '' }) => {
  const breadcrumbItems = [];

  if (hierarchy.secao) {
    breadcrumbItems.push({
      label: `${hierarchy.secao.codigo} - ${hierarchy.secao.nome}`,
      href: `/cnaes/secao/${hierarchy.secao.slug}`,
      type: 'Seção'
    });
  }

  if (hierarchy.divisao) {
    breadcrumbItems.push({
      label: `${hierarchy.divisao.codigo} - ${hierarchy.divisao.nome}`,
      href: `/cnaes/divisao/${hierarchy.divisao.slug}`,
      type: 'Divisão'
    });
  }

  if (hierarchy.grupo) {
    breadcrumbItems.push({
      label: `${hierarchy.grupo.codigo} - ${hierarchy.grupo.nome}`,
      href: `/cnaes/grupo/${hierarchy.grupo.slug}`,
      type: 'Grupo'
    });
  }

  if (hierarchy.classe) {
    breadcrumbItems.push({
      label: `${hierarchy.classe.codigo} - ${hierarchy.classe.nome}`,
      href: `/cnaes/classe/${hierarchy.classe.slug}`,
      type: 'Classe'
    });
  }

  if (hierarchy.subclasse) {
    breadcrumbItems.push({
      label: `${hierarchy.subclasse.codigo} - ${hierarchy.subclasse.nome}`,
      href: `/cnaes/subclasse/${hierarchy.subclasse.slug}`,
      type: 'Subclasse'
    });
  }

  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 text-sm ${className}`}>
      <span className="text-muted-foreground font-medium">Hierarquia CNAE:</span>
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.href}>
          {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">{item.type}</span>
            <Link 
              to={item.href}
              className="text-primary hover:underline font-medium"
              title={item.label}
            >
              {item.label.length > 40 ? `${item.label.substring(0, 40)}...` : item.label}
            </Link>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};