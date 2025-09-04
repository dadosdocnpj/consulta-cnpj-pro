import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { CNPJLookupResponse } from "@/types/cnpj";
import { getEstadoPorUF } from "@/data/estados";
import { createCitySlug } from "@/lib/utils";

interface GeographicalBreadcrumbProps {
  empresa?: CNPJLookupResponse;
}

const GeographicalBreadcrumb = ({ empresa }: GeographicalBreadcrumbProps) => {
  if (!empresa?.endereco) {
    return null;
  }

  const { uf, municipio } = empresa.endereco;
  const estado = getEstadoPorUF(uf);
  const citySlug = createCitySlug(municipio);

  const breadcrumbItems = [
    {
      href: "/",
      label: "Início",
      title: "Voltar à página inicial - Dados do CNPJ"
    },
    {
      href: "/estados",
      label: "Estados",
      title: "Ver todos os estados brasileiros"
    },
    {
      href: `/estados/${uf.toLowerCase()}`,
      label: estado?.nome || uf,
      title: `Ver cidades e empresas de ${estado?.nome || uf}`
    },
    {
      href: `/estados/${uf.toLowerCase()}/${citySlug}`,
      label: municipio,
      title: `Ver empresas de ${municipio}, ${estado?.nome || uf}`
    },
    {
      label: empresa.razao_social || empresa.nome_fantasia || "Empresa",
      title: `Dados completos da empresa ${empresa.razao_social || empresa.nome_fantasia}`
    }
  ];

  return (
    <nav 
      className="flex items-center space-x-1 text-sm text-muted-foreground mb-6 bg-muted/30 rounded-lg p-3"
      aria-label="Navegação hierárquica"
    >
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": item.href ? `https://dadosdocnpj.com.br${item.href}` : undefined
          }))
        })}
      </script>
      
      <Link 
        to="/" 
        className="flex items-center hover:text-primary transition-colors p-1.5 rounded-md hover:bg-background/80"
        title="Página inicial - Dados do CNPJ"
        aria-label="Ir para a página inicial"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Início</span>
      </Link>
      
      {breadcrumbItems.slice(1).map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRight className="h-4 w-4 text-muted-foreground/60" aria-hidden="true" />
          {item.href ? (
            <Link 
              to={item.href}
              className="hover:text-primary transition-colors p-1.5 rounded-md hover:bg-background/80 line-clamp-1"
              title={item.title}
              aria-label={`Ir para ${item.label}`}
            >
              {item.label}
            </Link>
          ) : (
            <span 
              className="text-foreground font-medium p-1.5 bg-background/50 rounded-md line-clamp-1" 
              title={item.title}
              aria-current="page"
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default GeographicalBreadcrumb;