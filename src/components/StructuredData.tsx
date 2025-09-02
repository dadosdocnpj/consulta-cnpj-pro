import { useEffect } from 'react';

const StructuredData = () => {
  useEffect(() => {
    // Website Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Dados do CNPJ",
      "description": "Consulte gratuitamente CNPJs, razão social, nome fantasia, CNAE e situação cadastral de milhões de empresas brasileiras.",
      "url": "https://dadosdocnpj.com.br",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://dadosdocnpj.com.br/busca?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Dados do CNPJ",
        "url": "https://dadosdocnpj.com.br"
      }
    };

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "O serviço de consulta CNPJ é realmente gratuito?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Nosso serviço de consulta CNPJ é 100% gratuito. Você pode pesquisar quantas empresas quiser sem qualquer custo ou limitação. Mantemos o serviço gratuito através de publicidade não intrusiva."
          }
        },
        {
          "@type": "Question",
          "name": "Com que frequência os dados são atualizados?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nossos dados são atualizados mensalmente com as informações mais recentes da Receita Federal. Isso garante que você tenha acesso às informações mais precisas sobre situação cadastral, endereços e demais dados empresariais."
          }
        },
        {
          "@type": "Question",
          "name": "Que informações posso encontrar sobre uma empresa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Você pode consultar: CNPJ, razão social, nome fantasia, situação cadastral, CNAE principal e secundários, endereço completo, telefone, email, capital social, natureza jurídica, quadro societário e histórico de alterações."
          }
        },
        {
          "@type": "Question",
          "name": "Os dados são oficiais e confiáveis?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Todas as informações são extraídas diretamente da Receita Federal e outros órgãos oficiais. Trabalhamos apenas com fontes governamentais para garantir a veracidade e precisão dos dados apresentados."
          }
        }
      ]
    };

    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Dados do CNPJ",
      "description": "Plataforma gratuita de consulta CNPJ com milhões de empresas brasileiras catalogadas",
      "url": "https://dadosdocnpj.com.br",
      "logo": "https://dadosdocnpj.com.br/logo.png",
      "sameAs": [
        "https://dadosdocnpj.com.br"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "availableLanguage": "Portuguese"
      }
    };

    // Add schemas to document head
    const addSchema = (schema: object, id: string) => {
      const existing = document.getElementById(id);
      if (existing) {
        existing.remove();
      }
      
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    addSchema(websiteSchema, 'website-schema');
    addSchema(faqSchema, 'faq-schema');
    addSchema(organizationSchema, 'organization-schema');

    // Cleanup function
    return () => {
      ['website-schema', 'faq-schema', 'organization-schema'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          element.remove();
        }
      });
    };
  }, []);

  return null;
};

export default StructuredData;