import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Building2, MapPin, Factory, Users, TrendingUp, Building, Sparkles, Shield, Search } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useTopEmpresas } from '@/hooks/useTopEmpresas';
import { useEmpresasRecentes } from '@/hooks/useEmpresasRecentes';
import { useEmpresasPorCategoria } from '@/hooks/useEmpresasPorCategoria';
import { useContadoresEstados } from '@/hooks/useContadoresEstados';
import { useCidadesComEmpresas } from '@/hooks/useCidadesComEmpresas';
import { cnaeSections } from '@/data/cnaes';
import { estados } from '@/data/estados';

const NavigationDropdown = () => {
  const [estadoSearch, setEstadoSearch] = useState('');
  const [cidadeSearch, setCidadeSearch] = useState('');
  
  const { data: topEmpresas } = useTopEmpresas(5);
  const { data: empresasRecentes } = useEmpresasRecentes(5);
  const { data: startups } = useEmpresasPorCategoria('startups', 5);
  const { data: empresasPublicas } = useEmpresasPorCategoria('publicas', 5);
  const { data: contadoresEstados } = useContadoresEstados();
  const { data: cidadesComEmpresas } = useCidadesComEmpresas();

  const empresasLinks = [
    {
      title: "Top 10 Empresas",
      href: "/ranking/top-empresas",
      description: "As maiores empresas do Brasil",
      icon: TrendingUp,
      items: topEmpresas?.slice(0, 5).map(empresa => ({
        name: empresa.razao_social,
        href: `/cnpj/${empresa.cnpj}`,
        cnpj: empresa.cnpj
      })) || []
    },
    {
      title: "Empresas Recentes",
      href: "/empresas-recentes",
      description: "Últimas empresas consultadas",
      icon: Building2,
      items: empresasRecentes?.slice(0, 5).map(empresa => ({
        name: empresa.razao_social,
        href: `/cnpj/${empresa.cnpj}`,
        cnpj: empresa.cnpj
      })) || []
    },
    {
      title: "Startups Brasileiras",
      href: "/categoria/startups",
      description: "Empresas de tecnologia e inovação",
      icon: Sparkles,
      items: startups?.slice(0, 5).map(empresa => ({
        name: empresa.razao_social,
        href: `/cnpj/${empresa.cnpj}`,
        cnpj: empresa.cnpj
      })) || []
    },
    {
      title: "Empresas Públicas",
      href: "/categoria/publicas",
      description: "Setor público e autarquias",
      icon: Shield,
      items: empresasPublicas?.slice(0, 5).map(empresa => ({
        name: empresa.razao_social,
        href: `/cnpj/${empresa.cnpj}`,
        cnpj: empresa.cnpj
      })) || []
    }
  ];

  // Estados filtrados com dados reais
  const estadosFiltrados = useMemo(() => {
    const estadosComContador = estados.map(estado => {
      const contador = contadoresEstados?.find(c => c.uf === estado.uf);
      return {
        ...estado,
        count: contador?.count || 0
      };
    }).filter(estado => 
      estado.nome.toLowerCase().includes(estadoSearch.toLowerCase()) ||
      estado.uf.toLowerCase().includes(estadoSearch.toLowerCase())
    );
    
    return estadosComContador.sort((a, b) => b.count - a.count);
  }, [contadoresEstados, estadoSearch]);

  // Cidades filtradas com dados reais
  const cidadesFiltradas = useMemo(() => {
    if (!cidadesComEmpresas) return [];
    
    return cidadesComEmpresas.filter(cidade =>
      cidade.municipio.toLowerCase().includes(cidadeSearch.toLowerCase()) ||
      cidade.uf.toLowerCase().includes(cidadeSearch.toLowerCase())
    ).slice(0, 10); // Limitar a 10 resultados
  }, [cidadesComEmpresas, cidadeSearch]);

  const localizacaoLinks = [
    {
      title: "Estados",
      href: "/estados",
      description: "Explorar empresas por estado",
      icon: MapPin,
      showSearch: true,
      searchValue: estadoSearch,
      onSearchChange: setEstadoSearch,
      items: estadosFiltrados.slice(0, 8).map(estado => ({
        name: `${estado.nome} (${estado.uf})`,
        href: `/estados/${estado.uf.toLowerCase()}`,
        count: estado.count
      }))
    },
    {
      title: "Cidades",
      href: null, // Removido - não tem página geral
      description: "Maiores centros empresariais",
      icon: Building,
      showSearch: true,
      searchValue: cidadeSearch,
      onSearchChange: setCidadeSearch,
      items: cidadesFiltradas.map(cidade => ({
        name: `${cidade.municipio} - ${cidade.uf}`,
        href: `/estados/${cidade.uf.toLowerCase()}/${cidade.municipio.toLowerCase().replace(/\s+/g, '-')}`,
        count: cidade.count
      }))
    }
  ];

  const setoresLinks = [
    {
      title: "CNAEs por Seção",
      href: "/cnae",
      description: "Classificação Nacional de Atividades",
      icon: Factory,
      items: [
        { name: "Informação e Comunicação", href: "/cnae/secao/informacao-comunicacao", icon: "💻" },
        { name: "Comércio", href: "/cnae/secao/comercio", icon: "🛒" },
        { name: "Atividades Profissionais", href: "/cnae/secao/atividades-profissionais", icon: "🔬" },
        { name: "Indústrias de Transformação", href: "/cnae/secao/industrias-transformacao", icon: "🏭" },
        { name: "Ver todas as seções", href: "/cnae", icon: "📋" }
      ]
    },
    {
      title: "CNAEs Mais Comuns",
      href: "/cnaes/populares",
      description: "Atividades econômicas populares",
      icon: Users,
      items: [
        { name: "Desenvolvimento de Software", href: "/cnaes/6201-5-00" },
        { name: "Comércio Varejista", href: "/cnaes/4712-1-00" },
        { name: "Consultoria Empresarial", href: "/cnaes/7020-4-00" },
        { name: "Serviços de Contabilidade", href: "/cnaes/6920-6-01" },
        { name: "Publicidade e Marketing", href: "/cnaes/7320-3-00" }
      ]
    }
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-foreground hover:text-primary transition-smooth font-medium">
            <Building2 className="w-4 h-4 mr-2" />
            Empresas
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 w-[500px] lg:w-[600px] lg:grid-cols-2">
              {empresasLinks.map((link) => (
                <div key={link.href} className="space-y-3">
                  <Link
                    to={link.href}
                    className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <link.icon className="h-4 w-4 text-primary" />
                      <div className="text-sm font-medium leading-none group-hover:text-primary transition-smooth">
                        {link.title}
                      </div>
                    </div>
                    <p className="text-sm leading-snug text-muted-foreground">
                      {link.description}
                    </p>
                  </Link>
                  
                  {link.items.length > 0 && (
                    <div className="space-y-1 ml-6">
                      {link.items.map((item, index) => (
                        <Link
                          key={index}
                          to={item.href}
                          className="block text-xs text-muted-foreground hover:text-primary transition-smooth py-1"
                        >
                          {item.name.length > 40 ? `${item.name.substring(0, 40)}...` : item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-foreground hover:text-primary transition-smooth font-medium">
            <MapPin className="w-4 h-4 mr-2" />
            Localização
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 w-[500px] lg:w-[600px] lg:grid-cols-2">
              {localizacaoLinks.map((link, linkIndex) => (
                <div key={link.title} className="space-y-3">
                  {link.href ? (
                    <Link
                      to={link.href}
                      className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <link.icon className="h-4 w-4 text-primary" />
                        <div className="text-sm font-medium leading-none group-hover:text-primary transition-smooth">
                          {link.title}
                        </div>
                      </div>
                      <p className="text-sm leading-snug text-muted-foreground">
                        {link.description}
                      </p>
                    </Link>
                  ) : (
                    <div className="block select-none rounded-md p-3 leading-none">
                      <div className="flex items-center space-x-2 mb-2">
                        <link.icon className="h-4 w-4 text-primary" />
                        <div className="text-sm font-medium leading-none">
                          {link.title}
                        </div>
                      </div>
                      <p className="text-sm leading-snug text-muted-foreground">
                        {link.description}
                      </p>
                    </div>
                  )}
                  
                  {link.showSearch && (
                    <div className="ml-6 mb-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder={`Buscar ${link.title.toLowerCase()}...`}
                          value={link.searchValue}
                          onChange={(e) => link.onSearchChange(e.target.value)}
                          className="pl-7 pr-3 py-1 text-xs border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary/50 w-full"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-1 ml-6 max-h-48 overflow-y-auto">
                    {link.items.length === 0 ? (
                      <div className="text-xs text-muted-foreground py-2">
                        {link.searchValue ? 'Nenhum resultado encontrado' : 'Carregando...'}
                      </div>
                    ) : (
                      link.items.map((item, index) => (
                        <Link
                          key={index}
                          to={item.href}
                          className="flex items-center justify-between text-xs text-muted-foreground hover:text-primary transition-smooth py-1 block"
                        >
                          <span className="truncate flex-1 mr-2">{item.name}</span>
                          {item.count !== undefined && item.count > 0 && (
                            <span className="text-xs bg-muted px-2 py-0.5 rounded shrink-0">
                              {item.count.toLocaleString()}
                            </span>
                          )}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-foreground hover:text-primary transition-smooth font-medium">
            <Factory className="w-4 h-4 mr-2" />
            Setores
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 w-[500px] lg:w-[600px] lg:grid-cols-2">
              {setoresLinks.map((link) => (
                <div key={link.href} className="space-y-3">
                  <Link
                    to={link.href}
                    className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <link.icon className="h-4 w-4 text-primary" />
                      <div className="text-sm font-medium leading-none group-hover:text-primary transition-smooth">
                        {link.title}
                      </div>
                    </div>
                    <p className="text-sm leading-snug text-muted-foreground">
                      {link.description}
                    </p>
                  </Link>
                  
                  <div className="space-y-1 ml-6">
                    {link.items.map((item, index) => (
                      <Link
                        key={index}
                        to={item.href}
                        className="flex items-center space-x-2 text-xs text-muted-foreground hover:text-primary transition-smooth py-1"
                      >
                        {item.icon && <span>{item.icon}</span>}
                        <span>{item.name.length > 35 ? `${item.name.substring(0, 35)}...` : item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationDropdown;