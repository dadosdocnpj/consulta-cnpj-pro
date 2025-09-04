import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Share2, Building2, MapPin, Calendar, DollarSign } from 'lucide-react';
import { CNPJLookupResponse } from '@/types/cnpj';
import { useToast } from '@/hooks/use-toast';

interface CompanySummaryCardProps {
  data: CNPJLookupResponse;
}

const CompanySummaryCard = ({ data }: CompanySummaryCardProps) => {
  const { toast } = useToast();

  const handleCopyCNPJ = () => {
    navigator.clipboard.writeText(data.cnpj);
    toast({
      title: "CNPJ copiado!",
      description: "O CNPJ foi copiado para a área de transferência.",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${data.razao_social} - CNPJ: ${data.cnpj_formatado}`,
        text: `Dados da empresa ${data.razao_social}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiado!",
        description: "O link da página foi copiado para a área de transferência.",
      });
    }
  };

  const getSituacaoColor = (situacao?: string) => {
    switch (situacao?.toUpperCase()) {
      case 'ATIVA':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'INAPTA':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'SUSPENSA':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'BAIXADA':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-primary/5 via-primary/3 to-primary/5 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Company Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {data.razao_social}
              </h1>
              {data.nome_fantasia && (
                <p className="text-lg text-muted-foreground">
                  {data.nome_fantasia}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">CNPJ:</span>
                <code className="text-sm font-mono bg-background/50 px-2 py-1 rounded">
                  {data.cnpj_formatado}
                </code>
              </div>

              {data.endereco && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {data.endereco.municipio}, {data.endereco.uf}
                  </span>
                </div>
              )}

              {data.data_abertura && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Desde {data.data_abertura}
                  </span>
                </div>
              )}

              {data.capital_social && (
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Capital: R$ {data.capital_social}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Status and Actions */}
          <div className="flex flex-col items-start lg:items-end gap-4">
            <Badge 
              className={`${getSituacaoColor(data.situacao_cadastral)} font-medium px-3 py-1`}
            >
              {data.situacao_cadastral}
            </Badge>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyCNPJ}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copiar CNPJ
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanySummaryCard;