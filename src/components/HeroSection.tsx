import { TrendingUp, Shield, Clock, Sparkles } from "lucide-react";
import SearchWithSuggestions from "@/components/SearchWithSuggestions";

const HeroSection = () => {

  return (
    <section className="relative bg-gradient-hero py-16 md:py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-primary-foreground">100% Gratuito • Dados Atualizados</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-heading text-white drop-shadow-lg">
              Consulta CNPJ Gratuita de Empresas Brasileiras com Dados Oficiais e Atualizados
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-4xl mx-auto drop-shadow-sm">
              Encontre informações completas de qualquer empresa registrada no Brasil: razão social, nome fantasia, endereço, CNAEs, sócios, situação cadastral e muito mais. Dados atualizados diretamente da Receita Federal.
            </p>
          </div>

          {/* Main Search Card */}
          <div className="relative max-w-3xl mx-auto mb-24 animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl p-8 shadow-2xl">
              <SearchWithSuggestions 
                variant="hero"
                size="lg"
                placeholder="Ex: Petrobras, 11.222.333/0001-81 ou Magazine Luiza"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;