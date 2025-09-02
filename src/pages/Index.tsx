import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QuickNavigation from "@/components/QuickNavigation";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

const Index = () => {
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
