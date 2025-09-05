/**
 * Utility functions for SEO optimization
 */

export const generateCanonicalUrl = (path: string): string => {
  const baseUrl = 'https://dadosdocnpj.com.br';
  return `${baseUrl}${path}`;
};

export const generateMetaDescription = (content: string, maxLength: number = 160): string => {
  if (content.length <= maxLength) return content;
  
  const truncated = content.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return `${truncated.substring(0, lastSpace)}...`;
};

export const generateKeywords = (terms: string[]): string => {
  return terms.join(', ').toLowerCase();
};

export const generateStructuredDataBreadcrumb = (items: Array<{label: string, href?: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://dadosdocnpj.com.br/"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        ...(item.href && { "item": `https://dadosdocnpj.com.br${item.href}` })
      }))
    ]
  };
};

export const generateOrganizationStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Dados do CNPJ",
    "url": "https://dadosdocnpj.com.br",
    "logo": "https://dadosdocnpj.com.br/src/assets/logo.png",
    "description": "Plataforma gratuita para consulta de CNPJs e informações de empresas brasileiras",
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "Portuguese"
    }
  };
};

export const generateWebsiteStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Dados do CNPJ",
    "url": "https://dadosdocnpj.com.br",
    "description": "Consulta gratuita de CNPJs e informações de empresas brasileiras",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://dadosdocnpj.com.br/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
};