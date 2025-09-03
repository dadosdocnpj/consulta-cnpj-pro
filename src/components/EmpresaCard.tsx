import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Calendar } from "lucide-react";
import { CNPJLookupResponse } from "@/types/cnpj";
import { Link } from "react-router-dom";

interface EmpresaCardProps {
  empresa: CNPJLookupResponse;
}

const EmpresaCard = ({ empresa }: EmpresaCardProps) => {
  const formatCNPJ = (cnpj: string) => {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const getSituacaoColor = (situacao?: string) => {
    if (!situacao) return "secondary";
    if (situacao.toLowerCase().includes("ativa")) return "default";
    return "destructive";
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border/50 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Building2 className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              {empresa.slug ? (
                <Link 
                  to={`/${empresa.slug}`}
                  className="text-lg font-semibold line-clamp-2 text-foreground hover:text-primary transition-colors group-hover:underline block"
                >
                  {empresa.nome_fantasia || empresa.razao_social}
                </Link>
              ) : (
                <h3 className="text-lg font-semibold line-clamp-2 text-foreground">
                  {empresa.nome_fantasia || empresa.razao_social}
                </h3>
              )}
            </div>
          </div>
          <Badge variant={getSituacaoColor(empresa.situacao_cadastral)} className="shrink-0">
            {empresa.situacao_cadastral || "N/A"}
          </Badge>
        </div>
        
        {empresa.nome_fantasia && empresa.razao_social && empresa.nome_fantasia !== empresa.razao_social && (
          <p className="text-sm text-muted-foreground line-clamp-1">
            {empresa.razao_social}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
          <span className="text-xs font-medium text-muted-foreground">CNPJ:</span>
          <span className="text-sm font-mono text-foreground">{formatCNPJ(empresa.cnpj)}</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {empresa.endereco && (
            <div className="flex items-start space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span className="line-clamp-2 text-muted-foreground">
                {empresa.endereco.municipio}, {empresa.endereco.uf}
              </span>
            </div>
          )}
          
          {empresa.data_abertura && (
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-primary shrink-0" />
              <span className="text-muted-foreground">
                {new Date(empresa.data_abertura).toLocaleDateString('pt-BR')}
              </span>
            </div>
          )}
        </div>
        
        {empresa.cnae_principal && (
          <div className="p-2 bg-accent/30 rounded-md">
            <span className="text-xs font-medium text-muted-foreground block mb-1">CNAE Principal</span>
            <span className="text-xs text-foreground line-clamp-2">
              {empresa.cnae_principal.codigo} - {empresa.cnae_principal.descricao}
            </span>
          </div>
        )}
        
      </CardContent>
    </Card>
  );
};

export default EmpresaCard;