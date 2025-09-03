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
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-primary" />
            {empresa.slug ? (
              <Link 
                to={`/${empresa.slug}`}
                className="text-lg font-semibold line-clamp-1 text-primary hover:underline"
              >
                {empresa.nome_fantasia || empresa.razao_social}
              </Link>
            ) : (
              <h3 className="text-lg font-semibold line-clamp-1">
                {empresa.nome_fantasia || empresa.razao_social}
              </h3>
            )}
          </div>
          <Badge variant={getSituacaoColor(empresa.situacao_cadastral)}>
            {empresa.situacao_cadastral || "N/A"}
          </Badge>
        </div>
        
        {empresa.nome_fantasia && empresa.razao_social && empresa.nome_fantasia !== empresa.razao_social && (
          <p className="text-sm text-muted-foreground line-clamp-1">
            {empresa.razao_social}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="text-sm text-muted-foreground">
          <strong>CNPJ:</strong> {formatCNPJ(empresa.cnpj)}
        </div>
        
        {empresa.endereco && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">
              {empresa.endereco.municipio}, {empresa.endereco.uf}
            </span>
          </div>
        )}
        
        {empresa.data_abertura && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Abertura: {new Date(empresa.data_abertura).toLocaleDateString('pt-BR')}</span>
          </div>
        )}
        
        {empresa.cnae_principal && (
          <div className="text-xs text-muted-foreground">
            <strong>CNAE:</strong> {empresa.cnae_principal.codigo} - {empresa.cnae_principal.descricao}
          </div>
        )}
        
      </CardContent>
    </Card>
  );
};

export default EmpresaCard;