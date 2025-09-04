import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Clock, MapPin, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EmpresaCard from "@/components/EmpresaCard";
import { useTopEmpresas } from "@/hooks/useTopEmpresas";
import { useEmpresasRecentes } from "@/hooks/useEmpresasRecentes";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedSection = () => {
  const { data: topEmpresas, isLoading: loadingTop } = useTopEmpresas(6);
  const { data: empresasRecentes, isLoading: loadingRecentes } = useEmpresasRecentes(6);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="bg-gradient-subtle border-border/50">
          <CardContent className="p-6 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <section className="space-y-12">
      {/* Top Empresas */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Empresas em Destaque</h2>
              <p className="text-muted-foreground">As principais empresas do Brasil</p>
            </div>
          </div>
          <Link to="/ranking/top-empresas">
            <Button variant="outline" className="group">
              Ver todas
              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {loadingTop ? (
          <LoadingSkeleton />
        ) : topEmpresas && topEmpresas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topEmpresas.map((empresa, index) => (
              <div key={empresa.cnpj} className="relative">
                {index < 3 && (
                  <Badge 
                    variant="default" 
                    className="absolute -top-2 -left-2 z-10 bg-primary text-primary-foreground"
                  >
                    #{index + 1}
                  </Badge>
                )}
                <EmpresaCard empresa={empresa} />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Empresas Recentes */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
              <Clock className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Empresas Recentes</h2>
              <p className="text-muted-foreground">Últimas empresas consultadas</p>
            </div>
          </div>
          <Link to="/empresas-recentes">
            <Button variant="outline" className="group">
              Ver todas
              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {loadingRecentes ? (
          <LoadingSkeleton />
        ) : empresasRecentes && empresasRecentes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {empresasRecentes.map((empresa) => (
              <EmpresaCard key={empresa.cnpj} empresa={empresa} />
            ))}
          </div>
        ) : null}
      </div>

      {/* Explorar por Localização */}
      <Card className="bg-gradient-hero text-white border-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl text-white">Explorar por Localização</CardTitle>
              <p className="text-white/80">Encontre empresas por estado e cidade</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="flex flex-wrap gap-3">
            <Link to="/estados">
              <Button variant="secondary" size="sm" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                Ver Estados
              </Button>
            </Link>
            <Link to="/cnaes">
              <Button variant="secondary" size="sm" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                Por Setor (CNAE)
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default FeaturedSection;