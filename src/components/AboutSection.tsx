import { CheckCircle, Database, RefreshCw, Shield } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Database,
      title: "Base Completa",
      description: "Milhões de empresas cadastradas com dados da Receita Federal"
    },
    {
      icon: RefreshCw,
      title: "Sempre Atualizado",
      description: "Atualizações mensais garantem informações precisas e confiáveis"
    },
    {
      icon: CheckCircle,
      title: "100% Gratuito",
      description: "Consulte quantas empresas quiser sem custos ou limitações"
    },
    {
      icon: Shield,
      title: "Dados Oficiais",
      description: "Informações extraídas diretamente dos órgãos competentes"
    }
  ];

  return (
    <section className="py-12 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Por que milhares confiam em nós?
            </h2>
            
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-border max-w-4xl mx-auto">
              <div className="text-lg text-card-foreground space-y-6 text-left leading-relaxed">
                <p className="text-xl leading-relaxed">
                  Somos a <strong className="text-primary">maior plataforma gratuita</strong> de consulta empresarial do Brasil, 
                  com milhões de empresas já consultadas.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span><strong className="text-secondary">Dados oficiais</strong> da Receita Federal</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span><strong className="text-secondary">Atualizações mensais</strong> garantidas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span><strong className="text-secondary">Interface moderna</strong> e intuitiva</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span><strong className="text-accent">Consultas ilimitadas</strong> sem custo</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span><strong className="text-accent">Resultados instantâneos</strong> em segundos</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span><strong className="text-accent">Sem cadastro</strong> necessário</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-8 shadow-soft border border-border text-center hover:shadow-medium transition-all duration-300 hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Use Cases Section */}
          <div className="bg-card rounded-2xl p-10 shadow-soft border border-border">
            <h3 className="text-2xl font-bold text-card-foreground mb-8 text-center">
              Quem usa nossa plataforma?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-2 text-lg">Para Empresários</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Verifique a situação de fornecedores, clientes e parceiros comerciais antes 
                      de fechar negócios importantes.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-2 text-lg">Para Profissionais</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Contadores, advogados e consultores podem acessar informações empresariais 
                      de forma rápida e confiável.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-2 text-lg">Para Pesquisadores</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Analise o cenário empresarial brasileiro, identifique tendências de mercado 
                      e conduza estudos econômicos.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-2 text-lg">Para Cidadãos</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Consulte empresas do seu interesse, verifique a idoneidade de estabelecimentos 
                      e mantenha-se informado.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;