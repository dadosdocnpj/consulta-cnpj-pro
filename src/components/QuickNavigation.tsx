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
    { nome: "São Paulo", estado: "SP", slug: "empresas-por-cidade/sp/sao-paulo" },
    { nome: "Rio de Janeiro", estado: "RJ", slug: "empresas-por-cidade/rj/rio-de-janeiro" },
    { nome: "Belo Horizonte", estado: "MG", slug: "empresas-por-cidade/mg/belo-horizonte" },
    { nome: "Brasília", estado: "DF", slug: "empresas-por-cidade/df/brasilia" },
    { nome: "Curitiba", estado: "PR", slug: "empresas-por-cidade/pr/curitiba" },
    { nome: "Porto Alegre", estado: "RS", slug: "empresas-por-cidade/rs/porto-alegre" }
  ];

  const filtrosUteis = [
    { nome: "Top 10 Empresas", icone: "🏆", slug: "ranking/top-empresas", descricao: "Maiores empresas do Brasil" },
    { nome: "Empresas Recentes", icone: "⏰", slug: "empresas-recentes", descricao: "Últimas consultas realizadas" },
    { nome: "Empresas por Faturamento", icone: "💰", slug: "ranking/faturamento", descricao: "Organizadas por receita" },
    { nome: "Startups Brasileiras", icone: "🚀", slug: "categoria/startups", descricao: "Empresas inovadoras" },
    { nome: "Empresas Públicas", icone: "🏛️", slug: "categoria/publicas", descricao: "Setor público" },
    { nome: "Como Usar", icone: "❓", slug: "como-usar", descricao: "Guia de utilização" }
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

          {/* Filtros Úteis */}
          <div className="bg-card rounded-xl p-8 shadow-soft border border-border hover:shadow-medium transition-all duration-300 h-full">
            <div className="flex items-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-xl mr-4">
                <Briefcase className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">Filtros Úteis</h3>
            </div>
            <div className="space-y-1">
              {filtrosUteis.map((filtro) => (
                <a
                  key={filtro.slug}
                  href={`/${filtro.slug}/`}
                  className="group block text-muted-foreground hover:text-accent transition-all duration-200 p-3 rounded-lg hover:bg-accent/5 border border-transparent hover:border-accent/10"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{filtro.icone}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-card-foreground group-hover:text-accent">{filtro.nome}</div>
                      <div className="text-xs text-muted-foreground mt-1">{filtro.descricao}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default QuickNavigation;