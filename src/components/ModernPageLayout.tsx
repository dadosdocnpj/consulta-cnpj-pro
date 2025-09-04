import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SEOHead from "@/components/SEOHead";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ModernPageLayoutProps {
  title: string;
  description: string;
  breadcrumbItems?: BreadcrumbItem[];
  children: React.ReactNode;
  keywords?: string;
  icon?: React.ReactNode;
  gradient?: "primary" | "secondary" | "hero";
  customStructuredData?: object;
}

const ModernPageLayout = ({ 
  title, 
  description, 
  breadcrumbItems = [], 
  children,
  keywords,
  icon,
  gradient = "primary",
  customStructuredData
}: ModernPageLayoutProps) => {
  const gradientClass = {
    primary: "bg-gradient-primary",
    secondary: "bg-gradient-secondary", 
    hero: "bg-gradient-hero"
  }[gradient];

  const structuredData = customStructuredData || {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": `https://dadosdocnpj.com.br${window.location.pathname}`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": item.href ? `https://dadosdocnpj.com.br${item.href}` : undefined
      }))
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead 
        customTitle={title}
        customDescription={description}
        customUrl={`https://dadosdocnpj.com.br${window.location.pathname}`}
      />
      
      {keywords && (
        <Helmet>
          <meta name="keywords" content={keywords} />
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        </Helmet>
      )}
      
      <Header />
      
      <main className="container mx-auto px-4 py-8" itemScope itemType="https://schema.org/WebPage">
        {breadcrumbItems.length > 0 && (
          <Breadcrumb items={breadcrumbItems} />
        )}
        
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            {icon && (
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${gradientClass} text-white shadow-glow`}>
                {icon}
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold text-gradient mb-2" itemProp="name">{title}</h1>
              <p className="text-lg text-muted-foreground" itemProp="description">{description}</p>
            </div>
          </div>
        </header>
        
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default ModernPageLayout;