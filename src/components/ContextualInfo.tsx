import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  MapPin, 
  TrendingUp, 
  Users, 
  Award,
  ExternalLink
} from 'lucide-react';
import { ContextualData } from '@/hooks/useContextualData';

interface ContextualInfoProps {
  contextualData: ContextualData;
  cnaeCode?: string;
  cidade?: string;
  uf?: string;
  similarCompanies?: Array<{
    cnpj: string;
    razao_social: string;
    nome_fantasia?: string;
    cidade: string;
    uf: string;
    situacao: string;
  }>;
}

export const ContextualInfo: React.FC<ContextualInfoProps> = ({ 
  contextualData, 
  cnaeCode, 
  cidade, 
  uf,
  similarCompanies = []
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Estatísticas do CNAE */}
      {cnaeCode && (
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Estatísticas do Setor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-primary/5 rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {contextualData.cnaeStats.totalEmpresas.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-muted-foreground">Empresas no Brasil</p>
              </div>
              {uf && (
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {contextualData.cnaeStats.empresasNoEstado.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-sm text-muted-foreground">Empresas em {uf}</p>
                </div>
              )}
            </div>
            
            {cidade && uf && (
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {contextualData.cnaeStats.empresasNaCidade.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-muted-foreground">
                  Empresas em {cidade}/{uf}
                </p>
              </div>
            )}

            <div className="pt-2">
              <Link 
                to={`/cnaes/subclasse/${cnaeCode}`}
                className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                Ver todas as empresas deste setor
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Principais Setores */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Principais Setores Econômicos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {contextualData.regionalStats.principaisCnaes.slice(0, 5).map((cnae, index) => (
              <div key={cnae.codigo} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-xs">
                    #{index + 1}
                  </Badge>
                  <div>
                    <p className="font-medium text-sm">{cnae.nome}</p>
                    <p className="text-xs text-muted-foreground">CNAE {cnae.codigo}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">
                    {cnae.total.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-xs text-muted-foreground">empresas</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Informações Regionais */}
      {cidade && uf && (
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Perfil Econômico Regional
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">
                <Link 
                  to={`/cidades/${uf.toLowerCase()}/${cidade.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-primary hover:underline"
                >
                  {cidade}/{uf}
                </Link>
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total de empresas:</span>
                  <span className="font-medium">
                    {contextualData.regionalStats.cidadeInfo.totalEmpresas.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Principal setor:</span>
                  <span className="font-medium">{contextualData.regionalStats.cidadeInfo.principalSetor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Ranking no estado:</span>
                  <Badge variant="secondary">
                    {contextualData.regionalStats.estadoInfo.ranking}º lugar
                  </Badge>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t">
              <h4 className="font-semibold mb-2">
                <Link 
                  to={`/estados/${uf.toLowerCase()}`}
                  className="text-primary hover:underline"
                >
                  Estado de {uf}
                </Link>
              </h4>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total de empresas:</span>
                <span className="font-medium">
                  {contextualData.regionalStats.estadoInfo.totalEmpresas.toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empresas Similares */}
      {similarCompanies.length > 0 && (
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Empresas Similares na Região
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {similarCompanies.map((empresa) => (
                <div key={empresa.cnpj} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">
                        {empresa.razao_social}
                      </h4>
                      {empresa.nome_fantasia && (
                        <p className="text-xs text-muted-foreground">
                          {empresa.nome_fantasia}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {empresa.cidade}/{empresa.uf} • CNPJ: {empresa.cnpj}
                      </p>
                    </div>
                    <Badge 
                      variant={empresa.situacao === 'ATIVA' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {empresa.situacao}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-3 border-t mt-4">
              <Link 
                to={cnaeCode ? `/cnaes/subclasse/${cnaeCode}` : '#'}
                className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
              >
                <Building2 className="h-4 w-4" />
                Ver todas as empresas do setor
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};