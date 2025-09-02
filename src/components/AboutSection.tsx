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
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              O que é o Dados do CNPJ?
            </h2>
            
            <div className="text-lg text-muted-foreground space-y-4 text-left">
              <p>
                O <strong>Dados do CNPJ</strong> é uma plataforma de <strong>consulta CNPJ gratuita</strong> que 
                oferece acesso completo às informações de empresas brasileiras. Nossa base de dados contém 
                milhões de registros atualizados mensalmente, incluindo <strong>razão social</strong>, 
                <strong>nome fantasia</strong>, <strong>situação cadastral</strong>, <strong>CNAE</strong> 
                e muito mais.
              </p>
              
              <p>
                Seja você um empresário, contador, advogado ou apenas um cidadão curioso, nossa ferramenta 
                permite consultar qualquer empresa de forma rápida e eficiente. Todos os dados são extraídos 
                diretamente da Receita Federal e outros órgãos oficiais, garantindo a veracidade das informações.
              </p>
              
              <p>
                Com nossa interface intuitiva, você pode pesquisar por <strong>número do CNPJ</strong>, 
                <strong>razão social</strong> ou <strong>nome fantasia</strong>, obtendo resultados instantâneos 
                sobre qualquer empresa registrada no Brasil. Descubra sócios, endereços, atividades econômicas 
                e histórico de alterações de forma completamente gratuita.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 shadow-soft border border-border text-center"
              >
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="bg-card rounded-lg p-8 shadow-soft border border-border">
            <h3 className="text-2xl font-bold text-card-foreground mb-4">
              Por que usar o Dados do CNPJ?
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">Para Empresários</h4>
                <p className="text-sm">
                  Verifique a situação de fornecedores, clientes e parceiros comerciais antes 
                  de fechar negócios importantes.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">Para Profissionais</h4>
                <p className="text-sm">
                  Contadores, advogados e consultores podem acessar informações empresariais 
                  de forma rápida e confiável.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">Para Pesquisadores</h4>
                <p className="text-sm">
                  Analise o cenário empresarial brasileiro, identifique tendências de mercado 
                  e conduza estudos econômicos.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">Para Cidadãos</h4>
                <p className="text-sm">
                  Consulte empresas do seu interesse, verifique a idoneidade de estabelecimentos 
                  e mantenha-se informado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;