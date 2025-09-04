import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, TrendingDown, Users } from "lucide-react";

interface RegionData {
  name: string;
  states: number;
  companies: number;
  growth?: number;
  color: string;
}

interface RegionalMapProps {
  regions: RegionData[];
  title?: string;
}

const RegionalMap = ({ regions, title = "Mapa Regional do Brasil" }: RegionalMapProps) => {
  const totalCompanies = regions.reduce((sum, region) => sum + region.companies, 0);

  return (
    <Card className="card-modern">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {regions.map((region) => {
            const percentage = (region.companies / totalCompanies * 100).toFixed(1);
            
            return (
              <div key={region.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: region.color }}
                    />
                    <span className="font-medium text-foreground">{region.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {region.states} {region.states === 1 ? 'estado' : 'estados'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {region.companies.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-muted-foreground">({percentage}%)</span>
                    
                    {region.growth !== undefined && (
                      <div className={`flex items-center gap-1 ${
                        region.growth > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {region.growth > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span className="text-xs font-medium">
                          {Math.abs(region.growth)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: region.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total de empresas:</span>
            <span className="font-bold text-foreground">
              {totalCompanies.toLocaleString('pt-BR')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionalMap;