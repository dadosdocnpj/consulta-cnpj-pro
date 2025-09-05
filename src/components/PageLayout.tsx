import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreadcrumbsStructured from "@/components/BreadcrumbsStructured";
import SEOHead from "@/components/SEOHead";
import InternalLinkingOptimized from "@/components/InternalLinkingOptimized";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageLayoutProps {
  title: string;
  description: string;
  breadcrumbItems?: BreadcrumbItem[];
  children: React.ReactNode;
  showInternalLinks?: boolean;
}

const PageLayout = ({ title, description, breadcrumbItems = [], children, showInternalLinks = true }: PageLayoutProps) => {
  return (
    <div className="min-h-screen">
      <SEOHead 
        customTitle={title}
        customDescription={description}
        customUrl={`https://dadosdocnpj.com.br${window.location.pathname}`}
      />
      
      <Header />
      
      <main className="container mx-auto px-4 py-8" itemScope itemType="https://schema.org/WebPage">
        {breadcrumbItems.length > 0 && (
          <BreadcrumbsStructured items={breadcrumbItems} />
        )}
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4" itemProp="name">{title}</h1>
          <p className="text-lg text-muted-foreground" itemProp="description">{description}</p>
        </header>
        
        {children}
        
        {showInternalLinks && (
          <InternalLinkingOptimized currentPage={window.location.pathname} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default PageLayout;