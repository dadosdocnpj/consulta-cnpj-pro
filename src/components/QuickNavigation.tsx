import { MapPin, Building2, Briefcase } from "lucide-react";

const QuickNavigation = () => {
  const estados = [
    { nome: "São Paulo", sigla: "SP", slug: "sp" },
    { nome: "Rio de Janeiro", sigla: "RJ", slug: "rj" },
    { nome: "Minas Gerais", sigla: "MG", slug: "mg" },
    { nome: "Paraná", sigla: "PR", slug: "pr" },
    { nome: "Rio Grande do Sul", sigla: "RS", slug: "rs" },
    { nome: "Bahia", sigla: "BA", slug: "ba" }
  ];

  const cidades = [
    { nome: "São Paulo", estado: "SP", slug: "sp/sao-paulo" },
    { nome: "Rio de Janeiro", estado: "RJ", slug: "rj/rio-de-janeiro" },
    { nome: "Belo Horizonte", estado: "MG", slug: "mg/belo-horizonte" },
    { nome: "Brasília", estado: "DF", slug: "df/brasilia" },
    { nome: "Curitiba", estado: "PR", slug: "pr/curitiba" },
    { nome: "Porto Alegre", estado: "RS", slug: "rs/porto-alegre" }
  ];

  const cnaes = [
    { nome: "Desenvolvimento de Software", codigo: "6201-5/01", slug: "cnae/6201501-desenvolvimento" },
    { nome: "Comércio Varejista", codigo: "4712-1/00", slug: "cnae/4712100-varejo" },
    { nome: "Restaurantes", codigo: "5611-2/01", slug: "cnae/5611201-alimentacao" },
    { nome: "Consultoria Empresarial", codigo: "7020-4/00", slug: "cnae/7020400-consultoria" },
    { nome: "Construção Civil", codigo: "4120-4/00", slug: "cnae/4120400-construcao" },
    { nome: "Serviços Médicos", codigo: "8630-5/01", slug: "cnae/8630501-medicina" }
  ];

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore empresas por:
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Navegue pela nossa base de dados organizada por localização e atividade econômica
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Estados */}
          <div className="bg-card rounded-xl p-8 shadow-soft border border-border hover:shadow-medium transition-all duration-300 h-full">
            <div className="flex items-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mr-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">Estados</h3>
            </div>
            <div className="space-y-1">
              {estados.map((estado) => (
                <a
                  key={estado.sigla}
                  href={`/${estado.slug}/`}
                  className="group block text-muted-foreground hover:text-primary transition-all duration-200 p-3 rounded-lg hover:bg-primary/5 border border-transparent hover:border-primary/10"
                >
                  <span className="font-medium">{estado.sigla}</span> - {estado.nome}
                </a>
              ))}
            </div>
          </div>

          {/* Cidades */}
          <div className="bg-card rounded-xl p-8 shadow-soft border border-border hover:shadow-medium transition-all duration-300 h-full">
            <div className="flex items-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mr-4">
                <Building2 className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">Cidades</h3>
            </div>
            <div className="space-y-1">
              {cidades.map((cidade) => (
                <a
                  key={cidade.slug}
                  href={`/${cidade.slug}/`}
                  className="group block text-muted-foreground hover:text-secondary transition-all duration-200 p-3 rounded-lg hover:bg-secondary/5 border border-transparent hover:border-secondary/10"
                >
                  <span className="font-medium">{cidade.nome}</span> - {cidade.estado}
                </a>
              ))}
            </div>
          </div>

          {/* CNAEs */}
          <div className="bg-card rounded-xl p-8 shadow-soft border border-border hover:shadow-medium transition-all duration-300 h-full">
            <div className="flex items-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-xl mr-4">
                <Briefcase className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">CNAEs Populares</h3>
            </div>
            <div className="space-y-1">
              {cnaes.map((cnae) => (
                <a
                  key={cnae.slug}
                  href={`/${cnae.slug}/`}
                  className="group block text-muted-foreground hover:text-accent transition-all duration-200 p-3 rounded-lg hover:bg-accent/5 border border-transparent hover:border-accent/10"
                >
                  <div className="text-sm font-medium text-card-foreground group-hover:text-accent">{cnae.nome}</div>
                  <div className="text-xs text-muted-foreground mt-1">{cnae.codigo}</div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* AdSense Placeholder */}
        <div className="mt-12 flex justify-center">
          <div className="bg-muted/50 rounded-lg p-6 border-2 border-dashed border-border">
            <p className="text-sm text-muted-foreground text-center">
              [Espaço reservado para AdSense - 300x250]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickNavigation;