import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { ArrowUpDown, TrendingUp, TrendingDown, MapPin, Building2, Award } from "lucide-react";

interface ComparisonItem {
  id: string;
  name: string;
  type: "estado" | "setor" | "empresa";
  metrics: {
    empresas: number;
    crescimento: number;
    ativas: number;
    novas: number;
    score: number;
  };
  details?: any;
}

interface ComparisonToolProps {
  items?: ComparisonItem[];
  maxItems?: number;
  title?: string;
}

const ComparisonTool = ({ items = [], maxItems = 4, title = "Ferramenta de Comparação" }: ComparisonToolProps) => {
  const [selectedItems, setSelectedItems] = useState<ComparisonItem[]>([]);
  const [comparisonMetric, setComparisonMetric] = useState<string>("empresas");
  const [sortBy, setSortBy] = useState<string>("empresas");

  // Mock data
  const mockItems: ComparisonItem[] = [
    {
      id: "sp",
      name: "São Paulo",
      type: "estado",
      metrics: { empresas: 3500000, crescimento: 5.2, ativas: 3200000, novas: 180000, score: 95 }
    },
    {
      id: "rj",
      name: "Rio de Janeiro", 
      type: "estado",
      metrics: { empresas: 1200000, crescimento: 3.1, ativas: 1100000, novas: 65000, score: 78 }
    },
    {
      id: "mg",
      name: "Minas Gerais",
      type: "estado", 
      metrics: { empresas: 1000000, crescimento: 4.5, ativas: 920000, novas: 55000, score: 82 }
    },
    {
      id: "comercio",
      name: "Comércio Varejista",
      type: "setor",
      metrics: { empresas: 4500000, crescimento: 3.2, ativas: 4100000, novas: 220000, score: 88 }
    },
    {
      id: "servicos",
      name: "Serviços Profissionais",
      type: "setor",
      metrics: { empresas: 2800000, crescimento: 8.1, ativas: 2600000, novas: 190000, score: 92 }
    }
  ];

  const availableItems = items.length > 0 ? items : mockItems;

  const addItem = (item: ComparisonItem) => {
    if (selectedItems.length < maxItems && !selectedItems.find(i => i.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const removeItem = (id: string) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  const getMetricValue = (item: ComparisonItem, metric: string) => {
    return item.metrics[metric as keyof typeof item.metrics] || 0;
  };

  const sortedItems = useMemo(() => {
    return [...selectedItems].sort((a, b) => {
      const valueA = getMetricValue(a, sortBy);
      const valueB = getMetricValue(b, sortBy);
      return valueB - valueA;
    });
  }, [selectedItems, sortBy]);

  const chartData = useMemo(() => {
    return selectedItems.map(item => ({
      name: item.name,
      empresas: item.metrics.empresas / 1000, // Em milhares
      crescimento: item.metrics.crescimento,
      ativas: item.metrics.ativas / 1000,
      score: item.metrics.score
    }));
  }, [selectedItems]);

  const radarData = useMemo(() => {
    const metrics = ['empresas', 'crescimento', 'ativas', 'score'];
    return metrics.map(metric => {
      const dataPoint: any = { metric: metric.charAt(0).toUpperCase() + metric.slice(1) };
      selectedItems.forEach(item => {
        let value = getMetricValue(item, metric);
        // Normalizar valores para o radar (0-100)
        if (metric === 'empresas' || metric === 'ativas') {
          value = Math.min((value / 1000000) * 20, 100); // Normalizar por milhão
        } else if (metric === 'crescimento') {
          value = Math.min(value * 10, 100); // Amplificar crescimento
        }
        dataPoint[item.name] = value;
      });
      return dataPoint;
    });
  }, [selectedItems]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "estado": return <MapPin className="h-4 w-4" />;
      case "setor": return <Building2 className="h-4 w-4" />;
      case "empresa": return <Award className="h-4 w-4" />;
      default: return <Building2 className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "estado": return "bg-blue-500";
      case "setor": return "bg-green-500"; 
      case "empresa": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gradient mb-2">{title}</h2>
          <p className="text-muted-foreground">
            Compare até {maxItems} itens lado a lado
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Ordenar por..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="empresas">Número de Empresas</SelectItem>
              <SelectItem value="crescimento">Taxa de Crescimento</SelectItem>
              <SelectItem value="ativas">Empresas Ativas</SelectItem>
              <SelectItem value="score">Score Geral</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Seleção de Itens */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpDown className="h-5 w-5" />
            Adicionar à Comparação ({selectedItems.length}/{maxItems})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {availableItems
              .filter(item => !selectedItems.find(s => s.id === item.id))
              .slice(0, 12)
              .map(item => (
                <Button
                  key={item.id}
                  variant="outline"
                  className="h-auto p-3 flex flex-col items-start gap-2"
                  onClick={() => addItem(item)}
                  disabled={selectedItems.length >= maxItems}
                >
                  <div className="flex items-center gap-2 w-full">
                    {getTypeIcon(item.type)}
                    <Badge variant="secondary" className={`text-xs ${getTypeColor(item.type)} text-white`}>
                      {item.type}
                    </Badge>
                  </div>
                  <span className="text-sm font-medium text-left">{item.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {getMetricValue(item, 'empresas').toLocaleString('pt-BR')} empresas
                  </span>
                </Button>
              ))}
          </div>
        </CardContent>
      </Card>

      {selectedItems.length > 0 && (
        <>
          {/* Tabela de Comparação */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle>Comparação Detalhada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-medium">Item</th>
                      <th className="text-right p-3 font-medium">Empresas</th>
                      <th className="text-right p-3 font-medium">Crescimento</th>
                      <th className="text-right p-3 font-medium">Ativas</th>
                      <th className="text-right p-3 font-medium">Score</th>
                      <th className="text-center p-3 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedItems.map((item, index) => (
                      <tr key={item.id} className="border-b border-border/50 hover:bg-muted/50">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-xs">
                              #{index + 1}
                            </Badge>
                            <div className="flex items-center gap-2">
                              {getTypeIcon(item.type)}
                              <span className="font-medium">{item.name}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-right font-mono">
                          {item.metrics.empresas.toLocaleString('pt-BR')}
                        </td>
                        <td className="p-3 text-right">
                          <div className={`flex items-center justify-end gap-1 ${
                            item.metrics.crescimento > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {item.metrics.crescimento > 0 ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            <span className="font-medium">
                              {item.metrics.crescimento > 0 ? '+' : ''}{item.metrics.crescimento}%
                            </span>
                          </div>
                        </td>
                        <td className="p-3 text-right font-mono">
                          {item.metrics.ativas.toLocaleString('pt-BR')}
                        </td>
                        <td className="p-3 text-right">
                          <Badge variant={item.metrics.score > 80 ? "default" : "secondary"}>
                            {item.metrics.score}/100
                          </Badge>
                        </td>
                        <td className="p-3 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                          >
                            Remover
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Gráficos de Comparação */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-modern">
              <CardHeader>
                <CardTitle>Comparação por Métrica</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Bar dataKey="empresas" fill="hsl(var(--primary))" name="Empresas (milhares)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-modern">
              <CardHeader>
                <CardTitle>Análise Radar</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" />
                    <PolarRadiusAxis angle={0} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                    {selectedItems.map((item, index) => (
                      <Radar
                        key={item.id}
                        name={item.name}
                        dataKey={item.name}
                        stroke={['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#8884d8'][index]}
                        fill={['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#8884d8'][index]}
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                    ))}
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {selectedItems.length === 0 && (
        <Card className="card-modern">
          <CardContent className="p-12 text-center">
            <ArrowUpDown className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum item selecionado</h3>
            <p className="text-muted-foreground">
              Selecione até {maxItems} itens acima para começar a comparação
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ComparisonTool;