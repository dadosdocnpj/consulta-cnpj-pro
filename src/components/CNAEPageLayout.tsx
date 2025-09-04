import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CNAEBreadcrumb } from "@/components/CNAEBreadcrumb";
import { CNAEHierarchy } from "@/hooks/useCNAEHierarchy";

interface CNAEPageLayoutProps {
  title: string;
  description: string;
  hierarchy?: CNAEHierarchy;
  cnaeCode?: string;
  cnaeType?: 'secao' | 'divisao' | 'grupo' | 'classe' | 'subclasse';
  totalEmpresas?: number;
  children: React.ReactNode;
}

const CNAEPageLayout = ({ 
  title, 
  description, 
  hierarchy, 
  cnaeCode,
  cnaeType,
  totalEmpresas,
  children 
}: CNAEPageLayoutProps) => {
  const getCurrentUrl = () => {
    if (typeof window !== 'undefined') {
      return `https://dadosdocnpj.com.br${window.location.pathname}`;
    }
    return `https://dadosdocnpj.com.br/cnae`;
  };

  const getStructuredData = () => {
    const baseStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": title,
      "description": description,
      "url": getCurrentUrl(),
      "inLanguage": "pt-BR",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Dados do CNPJ",
        "url": "https://dadosdocnpj.com.br"
      }
    };

    // Add breadcrumb structured data if hierarchy exists
    if (hierarchy) {
      const breadcrumbItems = [];
      let position = 1;

      breadcrumbItems.push({
        "@type": "ListItem",
        "position": position++,
        "name": "Início",
        "item": "https://dadosdocnpj.com.br"
      });

      breadcrumbItems.push({
        "@type": "ListItem",
        "position": position++,
        "name": "CNAEs",
        "item": "https://dadosdocnpj.com.br/cnae"
      });

      if (hierarchy.secao) {
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": position++,
          "name": `Seção ${hierarchy.secao.codigo}`,
          "item": `https://dadosdocnpj.com.br/cnae/secao/${hierarchy.secao.slug}`
        });
      }

      if (hierarchy.divisao) {
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": position++,
          "name": `Divisão ${hierarchy.divisao.codigo}`,
          "item": `https://dadosdocnpj.com.br/cnae/divisao/${hierarchy.divisao.slug}`
        });
      }

      if (hierarchy.grupo) {
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": position++,
          "name": `Grupo ${hierarchy.grupo.codigo}`,
          "item": `https://dadosdocnpj.com.br/cnae/grupo/${hierarchy.grupo.slug}`
        });
      }

      if (hierarchy.classe) {
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": position++,
          "name": `Classe ${hierarchy.classe.codigo}`,
          "item": `https://dadosdocnpj.com.br/cnae/classe/${hierarchy.classe.slug}`
        });
      }

      if (hierarchy.subclasse) {
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": position++,
          "name": `CNAE ${hierarchy.subclasse.codigo}`,
          "item": `https://dadosdocnpj.com.br/cnae/subclasse/${hierarchy.subclasse.slug}`
        });
      }

      return [
        baseStructuredData,
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbItems
        }
      ];
    }

    return [baseStructuredData];
  };

  const getMetaKeywords = () => {
    const baseKeywords = ["cnae", "classificação nacional", "atividades econômicas", "empresas", "cnpj"];
    
    if (cnaeCode) {
      baseKeywords.push(`cnae ${cnaeCode}`, cnaeCode);
    }

    if (hierarchy?.secao) {
      baseKeywords.push(hierarchy.secao.nome.toLowerCase());
    }

    return baseKeywords.join(", ");
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={getMetaKeywords()} />
        <link rel="canonical" href={getCurrentUrl()} />
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={getCurrentUrl()} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Dados do CNPJ" />
        <meta property="og:locale" content="pt_BR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Dados do CNPJ" />
        
        {/* Structured Data */}
        {getStructuredData().map((data, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        ))}
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8" itemScope itemType="https://schema.org/WebPage">
        {hierarchy && (
          <CNAEBreadcrumb hierarchy={hierarchy} className="mb-6" />
        )}
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4" itemProp="name">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground" itemProp="description">
            {description}
          </p>
          {totalEmpresas && totalEmpresas > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              {totalEmpresas.toLocaleString()} empresas cadastradas
            </p>
          )}
        </header>
        
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default CNAEPageLayout;