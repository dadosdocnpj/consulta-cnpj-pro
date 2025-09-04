import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DashboardStats from "@/components/DashboardStats";
import FeaturedSection from "@/components/FeaturedSection";
import QuickNavigation from "@/components/QuickNavigation";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import SEOHead from "@/components/SEOHead";

const Homepage = () => {
  return (
    <div className="min-h-screen">
      <SEOHead 
        customTitle="Consulta CNPJ Gratuita - Dados Oficiais de Empresas Brasileiras"
        customDescription="Consulte CNPJ gratuitamente e obtenha informações completas de empresas brasileiras: razão social, endereço, CNAEs, sócios e situação cadastral atualizada."
        customUrl="https://dadosdocnpj.com.br"
      />
      <StructuredData />
      
      <Header />
      
      <main>
        <HeroSection />
        
        {/* Container para as seções principais */}
        <div className="container mx-auto px-4 space-y-16 py-16">
          <DashboardStats />
          <FeaturedSection />
          <QuickNavigation />
        </div>
        
        <AboutSection />
        <FAQSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Homepage;