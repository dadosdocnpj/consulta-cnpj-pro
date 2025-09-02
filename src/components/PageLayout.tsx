import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageLayoutProps {
  title: string;
  description: string;
  breadcrumbItems?: BreadcrumbItem[];
  children: React.ReactNode;
}

const PageLayout = ({ title, description, breadcrumbItems = [], children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{title} | Dados do CNPJ</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://dadosdocnpj.com.br${window.location.pathname}`} />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {breadcrumbItems.length > 0 && (
          <Breadcrumb items={breadcrumbItems} />
        )}
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">{title}</h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
        
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default PageLayout;