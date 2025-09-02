import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QuickNavigation from "@/components/QuickNavigation";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import CNPJPage from "@/pages/CNPJPage";

const Index = () => {
  const { slug } = useParams<{ slug: string }>();

  // Se há um slug na URL, renderizar a página de CNPJ
  if (slug) {
    return <CNPJPage />;
  }

  // Caso contrário, renderizar a homepage
  return (
    <div className="min-h-screen">
      <StructuredData />
      <Header />
      <main>
        <HeroSection />
        <QuickNavigation />
        <AboutSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
