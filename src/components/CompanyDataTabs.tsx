import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  Calendar,
  ExternalLink,
  Info
} from 'lucide-react';
import { CNPJLookupResponse } from '@/types/cnpj';
import { Link } from 'react-router-dom';

interface CompanyDataTabsProps {
  data: CNPJLookupResponse;
}

const CompanyDataTabs = ({ data }: CompanyDataTabsProps) => {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="basic" className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Dados Básicos
        </TabsTrigger>
        <TabsTrigger value="address" className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Endereço
        </TabsTrigger>
        <TabsTrigger value="contact" className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          Contato
        </TabsTrigger>
        <TabsTrigger value="activities" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Atividades
        </TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Informações Empresariais
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Razão Social</label>
                <p className="text-foreground font-medium">{data.razao_social}</p>
              </div>
              
              {data.nome_fantasia && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nome Fantasia</label>
                  <p className="text-foreground">{data.nome_fantasia}</p>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">CNPJ</label>
                <p className="text-foreground font-mono text-lg">{data.cnpj_formatado}</p>
              </div>
              
              {data.natureza_juridica && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Natureza Jurídica</label>
                  <p className="text-foreground">{data.natureza_juridica}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {data.data_abertura && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Data de Abertura</label>
                  <p className="text-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {data.data_abertura}
                  </p>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Situação Cadastral</label>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={data.situacao_cadastral === 'ATIVA' ? 'default' : 'secondary'}>
                    {data.situacao_cadastral}
                  </Badge>
                  {data.data_situacao_cadastral && (
                    <span className="text-sm text-muted-foreground">
                      desde {data.data_situacao_cadastral}
                    </span>
                  )}
                </div>
              </div>
              
              {data.capital_social && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Capital Social</label>
                  <p className="text-foreground font-medium">R$ {data.capital_social}</p>
                </div>
              )}
              
              {data.regime_tributario && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Regime Tributário</label>
                  <p className="text-foreground">{data.regime_tributario}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="address">
        {data.endereco ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Endereço Completo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Logradouro</label>
                    <p className="text-foreground">
                      {data.endereco.logradouro}, {data.endereco.numero}
                      {data.endereco.complemento && ` - ${data.endereco.complemento}`}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Bairro</label>
                    <p className="text-foreground">{data.endereco.bairro}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Cidade/Estado</label>
                    <p className="text-foreground">
                      <Link 
                        to={`/cidades/${data.endereco.uf.toLowerCase()}/${data.endereco.municipio.toLowerCase().replace(/\s+/g, '-')}`}
                        className="hover:text-primary transition-colors"
                      >
                        {data.endereco.municipio}, {data.endereco.uf}
                      </Link>
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">CEP</label>
                    <p className="text-foreground font-mono">{data.endereco.cep}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ver no Mapa
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center p-8">
              <div className="text-center space-y-2">
                <Info className="h-8 w-8 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">Endereço não disponível</p>
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="contact">
        {(data.telefone || data.email) ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Informações de Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.telefone && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                  <p className="text-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <a href={`tel:${data.telefone}`} className="hover:text-primary transition-colors">
                      {data.telefone}
                    </a>
                  </p>
                </div>
              )}
              
              {data.email && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${data.email}`} className="hover:text-primary transition-colors">
                      {data.email}
                    </a>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center p-8">
              <div className="text-center space-y-2">
                <Info className="h-8 w-8 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">Informações de contato não disponíveis</p>
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="activities">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Atividades Econômicas (CNAEs)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {data.cnae_principal && (
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-3 block">
                  Atividade Principal
                </label>
                <Link to={`/cnae/${data.cnae_principal.codigo}`}>
                  <Badge variant="default" className="text-sm p-2 hover:bg-primary/90 transition-colors cursor-pointer">
                    {data.cnae_principal.codigo} - {data.cnae_principal.descricao}
                  </Badge>
                </Link>
              </div>
            )}

            {data.cnaes_secundarios && data.cnaes_secundarios.length > 0 && (
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-3 block">
                  Atividades Secundárias ({data.cnaes_secundarios.length})
                </label>
                <div className="flex flex-wrap gap-2">
                  {data.cnaes_secundarios.map((cnae, index) => (
                    <Link key={index} to={`/cnae/${cnae.codigo}`}>
                      <Badge 
                        variant="outline" 
                        className="text-sm p-2 hover:bg-muted transition-colors cursor-pointer"
                      >
                        {cnae.codigo} - {cnae.descricao}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {!data.cnae_principal && (!data.cnaes_secundarios || data.cnaes_secundarios.length === 0) && (
              <div className="text-center py-8">
                <Info className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Atividades econômicas não disponíveis</p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default CompanyDataTabs;