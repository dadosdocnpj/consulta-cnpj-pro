import React from "react";
import { Building2, MapPin, TrendingUp, Users } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import { useContadoresEstados } from "@/hooks/useContadoresEstados";

const DashboardStats = () => {
  const { data: contadores, isLoading } = useContadoresEstados();

  // Calcular estatísticas totais
  const totalEmpresas = contadores?.reduce((acc, curr) => acc + curr.count, 0) || 0;
  const totalEstados = contadores?.length || 0;

  const stats = [
    {
      title: "Total de Empresas",
      value: totalEmpresas,
      description: "Empresas cadastradas",
      icon: Building2,
      trend: {
        value: "+1.2%",
        isPositive: true
      }
    },
    {
      title: "Estados Cobertos",
      value: totalEstados,
      description: "Estados brasileiros",
      icon: MapPin,
      trend: {
        value: "100%",
        isPositive: true
      }
    },
    {
      title: "Consultas Hoje",
      value: "2.4K",
      description: "Consultas realizadas",
      icon: TrendingUp,
      trend: {
        value: "+8.1%",
        isPositive: true
      }
    },
    {
      title: "Usuários Ativos",
      value: "1.8K",
      description: "Últimas 24h",
      icon: Users,
      trend: {
        value: "+5.2%",
        isPositive: true
      }
    }
  ];

  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Estatísticas da Plataforma
        </h2>
        <p className="text-muted-foreground">
          Dados atualizados em tempo real sobre empresas brasileiras
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            trend={stat.trend}
            isLoading={isLoading}
            className="hover:scale-105 transition-transform duration-200"
          />
        ))}
      </div>
    </section>
  );
};

export default DashboardStats;