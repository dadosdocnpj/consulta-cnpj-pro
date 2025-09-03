import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Building2, MapPin, Factory, Users, TrendingUp, Building, Sparkles, Shield } from 'lucide-react';
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
import { cnaeSections } from '@/data/cnaes';
import { estados } from '@/data/estados';

const NavigationDropdown = () => {
  const { data: topEmpresas } = useTopEmpresas(5);
  const { data: empresasRecentes } = useEmpresasRecentes(5);

  const empresasLinks = [
    {
      title: "Top 10 Empresas",
      href: "/ranking/top-empresas",
      description: "As maiores empresas do Brasil",
      icon: TrendingUp,
      items: topEmpresas?.slice(0, 3).map(empresa => ({
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
      items: empresasRecentes?.slice(0, 3).map(empresa => ({
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
      items: []
    },
    {
      title: "Empresas Públicas",
      href: "/categoria/publicas",
      description: "Setor público e autarquias",
      icon: Shield,
      items: []
    }
  ];

  const localizacaoLinks = [
    {
      title: "Estados",
      href: "/estados",
      description: "Explorar empresas por estado",
      icon: MapPin,
      items: estados.slice(0, 5).map(estado => ({
        name: estado.nome,
        href: `/estados/${estado.uf.toLowerCase()}`,
        count: 0 // Placeholder para contagem de empresas
      }))
    },
    {
      title: "Principais Cidades",
      href: "/estados",
      description: "Maiores centros empresariais",
      icon: Building,
      items: [
        { name: "São Paulo - SP", href: "/estados/sp/sao-paulo", count: 500000 },
        { name: "Rio de Janeiro - RJ", href: "/estados/rj/rio-de-janeiro", count: 200000 },
        { name: "Belo Horizonte - MG", href: "/estados/mg/belo-horizonte", count: 150000 },
        { name: "Brasília - DF", href: "/estados/df/brasilia", count: 120000 },
        { name: "Salvador - BA", href: "/estados/ba/salvador", count: 100000 }
      ]
    }
  ];

  const setoresLinks = [
    {
      title: "CNAEs por Seção",
      href: "/cnaes",
      description: "Classificação Nacional de Atividades",
      icon: Factory,
      items: cnaeSections.slice(0, 5).map(secao => ({
        name: secao.nome,
        href: `/cnaes/secao/${secao.slug}`,
        icon: secao.icon
      }))
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
              {localizacaoLinks.map((link) => (
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
                        className="flex items-center justify-between text-xs text-muted-foreground hover:text-primary transition-smooth py-1"
                      >
                        <span>{item.name}</span>
                        {item.count && (
                          <span className="text-xs bg-muted px-2 py-0.5 rounded">
                            {item.count.toLocaleString()}
                          </span>
                        )}
                      </Link>
                    ))}
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

        <NavigationMenuItem>
          <Link 
            to="/como-usar"
            className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
              "text-foreground hover:text-primary transition-smooth font-medium"
            )}
          >
            Como Usar
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationDropdown;