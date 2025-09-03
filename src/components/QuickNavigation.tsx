import { MapPin, Building2, TrendingUp, Clock, Rocket, Landmark, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const QuickNavigation = () => {
  const [estadoSearch, setEstadoSearch] = useState("");
  const [cidadeSearch, setCidadeSearch] = useState("");

  const estados = [
    { nome: "São Paulo", sigla: "SP", slug: "sp" },
    { nome: "Rio de Janeiro", sigla: "RJ", slug: "rj" },
    { nome: "Minas Gerais", sigla: "MG", slug: "mg" },
    { nome: "Paraná", sigla: "PR", slug: "pr" },
    { nome: "Rio Grande do Sul", sigla: "RS", slug: "rs" },
    { nome: "Bahia", sigla: "BA", slug: "ba" },
    { nome: "Santa Catarina", sigla: "SC", slug: "sc" },
    { nome: "Goiás", sigla: "GO", slug: "go" },
    { nome: "Pernambuco", sigla: "PE", slug: "pe" },
    { nome: "Ceará", sigla: "CE", slug: "ce" }
  ];

  const cidades = [
    { nome: "São Paulo", estado: "SP", slug: "sao-paulo" },
    { nome: "Rio de Janeiro", estado: "RJ", slug: "rio-de-janeiro" },
    { nome: "Belo Horizonte", estado: "MG", slug: "belo-horizonte" },
    { nome: "Brasília", estado: "DF", slug: "brasilia" },
    { nome: "Curitiba", estado: "PR", slug: "curitiba" },
    { nome: "Porto Alegre", estado: "RS", slug: "porto-alegre" },
    { nome: "Salvador", estado: "BA", slug: "salvador" },
    { nome: "Fortaleza", estado: "CE", slug: "fortaleza" },
    { nome: "Recife", estado: "PE", slug: "recife" },
    { nome: "Goiânia", estado: "GO", slug: "goiania" }
  ];

  const empresasCategorias = [
    { nome: "Top 50 Empresas", icone: TrendingUp, slug: "ranking/top-empresas", descricao: "Principais empresas do Brasil", cor: "primary" },
    { nome: "Empresas Recentes", icone: Clock, slug: "empresas-recentes", descricao: "Últimas consultas realizadas", cor: "secondary" },
    { nome: "Startups Brasileiras", icone: Rocket, slug: "categoria/startups", descricao: "Empresas de tecnologia", cor: "accent" },
    { nome: "Empresas Públicas", icone: Landmark, slug: "categoria/publicas", descricao: "Setor público", cor: "primary" }
  ];

  const filteredEstados = estados.filter(estado => 
    estado.nome.toLowerCase().includes(estadoSearch.toLowerCase()) ||
    estado.sigla.toLowerCase().includes(estadoSearch.toLowerCase())
  );

  const filteredCidades = cidades.filter(cidade => 
    cidade.nome.toLowerCase().includes(cidadeSearch.toLowerCase()) ||
    cidade.estado.toLowerCase().includes(cidadeSearch.toLowerCase())
  );

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

        {/* Grid 2x3 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Primeira Linha: Estados e Cidades */}
          
          {/* Estados */}
          <div className="bg-card rounded-xl p-8 shadow-soft border border-border hover:shadow-medium transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mr-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">Estados</h3>
              </div>
              <Link to="/estados" className="text-primary hover:text-primary/80 text-sm font-medium">
                Ver todos
              </Link>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar estado..."
                value={estadoSearch}
                onChange={(e) => setEstadoSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {filteredEstados.slice(0, 8).map((estado) => (
                <Link
                  key={estado.sigla}
                  to={`/estados/${estado.slug}`}
                  className="group block text-muted-foreground hover:text-primary transition-all duration-200 p-3 rounded-lg hover:bg-primary/5 border border-transparent hover:border-primary/10"
                >
                  <div className="flex items-center justify-between">
                    <span>
                      <span className="font-medium">{estado.sigla}</span> - {estado.nome}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      Ver empresas
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Cidades */}
          <div className="bg-card rounded-xl p-8 shadow-soft border border-border hover:shadow-medium transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mr-4">
                  <Building2 className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">Cidades</h3>
              </div>
              <Link to="/estados" className="text-secondary hover:text-secondary/80 text-sm font-medium">
                Ver todas
              </Link>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cidade..."
                value={cidadeSearch}
                onChange={(e) => setCidadeSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {filteredCidades.slice(0, 8).map((cidade) => (
                <Link
                  key={`${cidade.estado}-${cidade.slug}`}
                  to={`/estados/${cidade.estado.toLowerCase()}/${cidade.slug}`}
                  className="group block text-muted-foreground hover:text-secondary transition-all duration-200 p-3 rounded-lg hover:bg-secondary/5 border border-transparent hover:border-secondary/10"
                >
                  <div className="flex items-center justify-between">
                    <span>
                      <span className="font-medium">{cidade.nome}</span> - {cidade.estado}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      Ver empresas
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Segunda Linha: Categorias de Empresas */}
          {empresasCategorias.map((categoria) => {
            const IconComponent = categoria.icone;
            return (
              <div key={categoria.slug} className="bg-card rounded-xl p-8 shadow-soft border border-border hover:shadow-medium transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-${categoria.cor}/10 rounded-xl mr-4`}>
                      <IconComponent className={`h-6 w-6 text-${categoria.cor}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-card-foreground">{categoria.nome}</h3>
                      <p className="text-sm text-muted-foreground">{categoria.descricao}</p>
                    </div>
                  </div>
                </div>
                
                <Link
                  to={`/${categoria.slug}`}
                  className={`group inline-flex items-center gap-2 text-${categoria.cor} hover:text-${categoria.cor}/80 font-medium transition-all duration-200`}
                >
                  Explorar empresas
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default QuickNavigation;