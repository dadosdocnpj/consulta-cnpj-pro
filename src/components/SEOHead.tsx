import { Helmet } from "react-helmet-async";
import { CNPJLookupResponse } from "@/types/cnpj";
import { getEstadoPorUF } from "@/data/estados";

interface SEOHeadProps {
  empresa?: CNPJLookupResponse;
  customTitle?: string;
  customDescription?: string;
  customUrl?: string;
}

const SEOHead = ({ empresa, customTitle, customDescription, customUrl }: SEOHeadProps) => {
  const baseUrl = "https://dadosdocnpj.com.br";
  
  // Generate SEO data for empresa
  if (empresa) {
    const nomeEmpresa = empresa.razao_social || empresa.nome_fantasia || "Empresa";
    const cnpjFormatado = empresa.cnpj_formatado || empresa.cnpj;
    const estado = empresa.endereco?.uf ? getEstadoPorUF(empresa.endereco.uf) : undefined;
    const cidade = empresa.endereco?.municipio;
    
    const title = `${nomeEmpresa} - CNPJ ${cnpjFormatado} | Dados do CNPJ`;
    const description = `Consulte gratuitamente os dados da empresa ${nomeEmpresa} (CNPJ ${cnpjFormatado})${cidade && estado ? ` localizada em ${cidade}, ${estado.nome}` : ''}. Situação cadastral, CNAE, endereço e mais informações oficiais.`;
    const url = customUrl || `${baseUrl}${empresa.url_path || '/'}`;
    
    const keywords = [
      nomeEmpresa,
      cnpjFormatado,
      "CNPJ",
      "consulta CNPJ",
      "dados empresa",
      empresa.cnae_principal?.descricao,
      cidade,
      estado?.nome,
      empresa.situacao_cadastral
    ].filter(Boolean).join(", ");

    return (
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={url} />
        
        {/* Geographic Meta Tags */}
        {estado && <meta name="geo.region" content={`BR-${empresa.endereco?.uf}`} />}
        {cidade && <meta name="geo.placename" content={cidade} />}
        
        {/* Business Meta Tags */}
        <meta name="business.cnpj" content={empresa.cnpj} />
        {empresa.situacao_cadastral && (
          <meta name="business.status" content={empresa.situacao_cadastral} />
        )}
        
        {/* Open Graph */}
        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="Dados do CNPJ" />
        <meta property="og:locale" content="pt_BR" />
        
        {/* Business Open Graph */}
        <meta property="business:contact_data:street_address" content={empresa.endereco?.logradouro} />
        <meta property="business:contact_data:locality" content={cidade} />
        <meta property="business:contact_data:region" content={estado?.nome} />
        <meta property="business:contact_data:postal_code" content={empresa.endereco?.cep} />
        <meta property="business:contact_data:country_name" content="Brasil" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Organization", "LocalBusiness"],
            "name": nomeEmpresa,
            "identifier": {
              "@type": "PropertyValue",
              "name": "CNPJ",
              "value": empresa.cnpj
            },
            "url": url,
            "description": description,
            ...(empresa.endereco && {
              "address": {
                "@type": "PostalAddress",
                "streetAddress": `${empresa.endereco.tipo_logradouro || ''} ${empresa.endereco.logradouro} ${empresa.endereco.numero}`.trim(),
                "addressLocality": cidade,
                "addressRegion": estado?.nome,
                "postalCode": empresa.endereco.cep,
                "addressCountry": "BR"
              }
            }),
            ...(empresa.telefone && {
              "telephone": empresa.telefone
            }),
            ...(empresa.email && {
              "email": empresa.email
            }),
            ...(empresa.cnae_principal && {
              "naics": empresa.cnae_principal.codigo,
              "industry": empresa.cnae_principal.descricao
            }),
            ...(empresa.data_abertura && {
              "foundingDate": empresa.data_abertura
            }),
            "additionalType": "https://schema.org/Organization",
            "sameAs": [url]
          })}
        </script>
      </Helmet>
    );
  }

  // Fallback for custom SEO
  const title = customTitle ? `${customTitle} | Dados do CNPJ` : "Dados do CNPJ - Consulta CNPJ Gratuita";
  const description = customDescription || "Consulte gratuitamente CNPJs, razão social, nome fantasia, CNAE e situação cadastral de milhões de empresas brasileiras.";
  const url = customUrl || baseUrl;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Dados do CNPJ" />
      <meta property="og:locale" content="pt_BR" />
      
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEOHead;