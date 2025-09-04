import React, { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, MapPin, Building2, Calendar, Download, Share2 } from "lucide-react";

interface DashboardData {
  estados: Array<{
    uf: string;
    nome: string;
    empresas: number;
    crescimento: number;
    setores: Array<{ nome: string; quantidade: number }>;
  }>;
  setores: Array<{
    codigo: string;
    nome: string;
    empresas: number;
    crescimento: number;
  }>;
  timeline: Array<{
    periodo: string;
    empresas: number;
    novas: number;
    ativas: number;
  }>;
}

interface AnalyticsDashboardProps {
  data?: DashboardData;
  title?: string;
}

const AnalyticsDashboard = ({ data, title = "Dashboard de Análises" }: AnalyticsDashboardProps) => {
  const [selectedMetric, setSelectedMetric] = useState("empresas");
  const [selectedPeriod, setSelectedPeriod] = useState("6m");
  const [compareMode, setCompareMode] = useState(false);

  // Mock data se não fornecida
  const mockData: DashboardData = {
    estados: [
      { uf: "SP", nome: "São Paulo", empresas: 3500000, crescimento: 5.2, setores: [
        { nome: "Comércio", quantidade: 1200000 },
        { nome: "Serviços", quantidade: 1800000 },
        { nome: "Indústria", quantidade: 500000 }
      ]},
      { uf: "RJ", nome: "Rio de Janeiro", empresas: 1200000, crescimento: 3.1, setores: [
        { nome: "Comércio", quantidade: 400000 },
        { nome: "Serviços", quantidade: 600000 },
        { nome: "Indústria", quantidade: 200000 }
      ]},
      { uf: "MG", nome: "Minas Gerais", empresas: 1000000, crescimento: 4.5, setores: [
        { nome: "Comércio", quantidade: 350000 },
        { nome: "Serviços", quantidade: 450000 },
        { nome: "Indústria", quantidade: 200000 }
      ]},
      { uf: "RS", nome: "Rio Grande do Sul", empresas: 800000, crescimento: 2.8, setores: [
        { nome: "Comércio", quantidade: 280000 },
        { nome: "Serviços", quantidade: 320000 },
        { nome: "Indústria", quantidade: 200000 }
      ]},
    ],
    setores: [
      { codigo: "G", nome: "Comércio", empresas: 4500000, crescimento: 3.2 },
      { codigo: "M", nome: "Atividades Profissionais", empresas: 2800000, crescimento: 8.1 },
      { codigo: "C", nome: "Indústrias de Transformação", empresas: 1200000, crescimento: 1.5 },
      { codigo: "I", nome: "Alojamento e Alimentação", empresas: 950000, crescimento: 6.7 },
    ],
    timeline: [
      { periodo: "2024-01", empresas: 19500000, novas: 155000, ativas: 18200000 },
      { periodo: "2024-02", empresas: 19680000, novas: 180000, ativas: 18350000 },
      { periodo: "2024-03", empresas: 19850000, novas: 170000, ativas: 18480000 },
      { periodo: "2024-04", empresas: 20020000, novas: 170000, ativas: 18620000 },
      { periodo: "2024-05", empresas: 20180000, novas: 160000, ativas: 18750000 },
      { periodo: "2024-06", empresas: 20350000, novas: 170000, ativas: 18890000 },
    ]
  };

  const dashboardData = data || mockData;

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#8884d8', '#82ca9d', '#ffc658'];

  const exportData = (format: "json" | "csv") => {
    const dataStr = format === "json" 
      ? JSON.stringify(dashboardData, null, 2)
      : "Estado,Empresas,Crescimento\n" + dashboardData.estados.map(e => `${e.nome},${e.empresas},${e.crescimento}%`).join("\n");
    
    const blob = new Blob([dataStr], { type: format === "json" ? "application/json" : "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dashboard-data.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gradient mb-2">{title}</h2>
          <p className="text-muted-foreground">Análises detalhadas e métricas em tempo real</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 mês</SelectItem>
              <SelectItem value="3m">3 meses</SelectItem>
              <SelectItem value="6m">6 meses</SelectItem>
              <SelectItem value="1y">1 ano</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={() => exportData("json")}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="geographic">Geografia</TabsTrigger>
          <TabsTrigger value="sectors">Setores</TabsTrigger>
          <TabsTrigger value="temporal">Temporal</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPIs Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="card-modern">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Total de Empresas
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {dashboardData.estados.reduce((sum, e) => sum + e.empresas, 0).toLocaleString('pt-BR')}
                    </p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                      <span className="text-xs text-green-600 font-medium">+4.2%</span>
                    </div>
                  </div>
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-modern">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Estados Ativos
                    </p>
                    <p className="text-2xl font-bold text-secondary">
                      {dashboardData.estados.length}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-muted-foreground">Cobertura total</span>
                    </div>
                  </div>
                  <MapPin className="h-8 w-8 text-secondary" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-modern">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Setores
                    </p>
                    <p className="text-2xl font-bold text-accent">
                      {dashboardData.setores.length}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-muted-foreground">Categorias ativas</span>
                    </div>
                  </div>
                  <Calendar className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-modern">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Crescimento Médio
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {(dashboardData.estados.reduce((sum, e) => sum + e.crescimento, 0) / dashboardData.estados.length).toFixed(1)}%
                    </p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                      <span className="text-xs text-green-600 font-medium">Últimos 12 meses</span>
                    </div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-modern">
              <CardHeader>
                <CardTitle>Distribuição por Estado</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dashboardData.estados}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="uf" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Bar dataKey="empresas" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-modern">
              <CardHeader>
                <CardTitle>Crescimento por Estado</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dashboardData.estados}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="uf" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="crescimento" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--secondary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle>Ranking de Estados</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={dashboardData.estados} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                      <YAxis dataKey="nome" type="category" stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                      />
                      <Bar dataKey="empresas" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {dashboardData.estados.map((estado, index) => (
                <Card key={estado.uf} className="card-modern">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">#{index + 1}</Badge>
                        <span className="font-semibold">{estado.nome}</span>
                      </div>
                      <Badge variant={estado.crescimento > 0 ? "default" : "secondary"}>
                        {estado.crescimento > 0 ? "+" : ""}{estado.crescimento}%
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-primary mb-2">
                      {estado.empresas.toLocaleString('pt-BR')}
                    </p>
                    <div className="space-y-1">
                      {estado.setores.slice(0, 2).map((setor, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{setor.nome}</span>
                          <span>{setor.quantidade.toLocaleString('pt-BR')}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sectors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-modern">
              <CardHeader>
                <CardTitle>Distribuição por Setor</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={dashboardData.setores}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="hsl(var(--primary))"
                      dataKey="empresas"
                      label={({ nome, percent }) => `${nome} ${(percent * 100).toFixed(0)}%`}
                    >
                      {dashboardData.setores.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-modern">
              <CardHeader>
                <CardTitle>Crescimento por Setor</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={dashboardData.setores}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="codigo" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Bar dataKey="crescimento" fill="hsl(var(--secondary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="temporal" className="space-y-6">
          <Card className="card-modern">
            <CardHeader>
              <CardTitle>Evolução Temporal</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={dashboardData.timeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="periodo" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Area type="monotone" dataKey="empresas" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" />
                  <Area type="monotone" dataKey="ativas" stackId="2" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;