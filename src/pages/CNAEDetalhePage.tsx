import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCNAEEmpresas } from "@/hooks/useCNAEEmpresas";
import { popularCNAEs, cnaeGrupos } from "@/data/cnaes";
import { Building2, MapPin, Calendar, ExternalLink } from "lucide-react";
import { useState } from "react";

const CNAEDetalhePage = () => {
  const { codigo } = useParams<{ codigo: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  
  // Extrair código CNAE do slug (formato: codigo-nome)
  const cnaeCode = codigo?.split('-')[0];
  
  // Buscar informações do CNAE
  const cnaeInfo = popularCNAEs.find(c => c.codigo === cnaeCode);
  
  // Buscar empresas com esse CNAE
  const { data, isLoading, error } = useCNAEEmpresas(cnaeCode || '', currentPage);

  if (!cnaeCode) {
    return (
      <PageLayout
        title="CNAE não encontrado"
        description="O código CNAE solicitado não foi encontrado"
        breadcrumbItems={[
          { label: "CNAEs", href: "/cnae" },
          { label: "CNAE não encontrado" }
        ]}
      >
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            CNAE não encontrado
          </h2>
          <p className="text-muted-foreground mb-6">
            O código CNAE solicitado não existe ou não está disponível.
          </p>
          <Link to="/cnae">
            <Button>Voltar para CNAEs</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  const title = cnaeInfo ? `CNAE ${cnaeInfo.codigo} - ${cnaeInfo.nome}` : `CNAE ${cnaeCode}`;
  const description = cnaeInfo ? cnaeInfo.nome : `Detalhes da atividade econômica ${cnaeCode}`;

  return (
    <PageLayout
      title={title}
      description={description}
      breadcrumbItems={[
        { label: "CNAEs", href: "/cnae" },
        { label: `CNAE ${cnaeCode}` }
      ]}
    >
      <div className="space-y-8">
        <div className="bg-muted/50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="h-8 w-8 text-primary" />
            <div>
              <h2 className="text-xl font-semibold">CNAE {cnaeCode}</h2>
              <p className="text-muted-foreground">{cnaeInfo?.nome || 'Atividade econômica'}</p>
            </div>
          </div>
          {data && (
            <Badge variant="secondary" className="mt-2">
              {data.total} empresa{data.total !== 1 ? 's' : ''} encontrada{data.total !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Empresas com este CNAE</h3>
          
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Erro ao carregar empresas. Tente novamente mais tarde.
              </p>
            </div>
          ) : !data?.empresas.length ? (
            <div className="text-center py-8">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Nenhuma empresa encontrada com este CNAE em nosso banco de dados.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {data.empresas.map((empresa) => (
                <Card key={empresa.cnpj}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          {empresa.razao_social}
                        </CardTitle>
                        {empresa.nome_fantasia && (
                          <CardDescription className="font-medium">
                            {empresa.nome_fantasia}
                          </CardDescription>
                        )}
                      </div>
                      <Badge variant={empresa.situacao_cadastral === 'ATIVA' ? 'default' : 'secondary'}>
                        {empresa.situacao_cadastral}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>CNPJ: {empresa.cnpj_formatado || empresa.cnpj}</span>
                      </div>
                      
                      {empresa.endereco && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {empresa.endereco.municipio}, {empresa.endereco.uf}
                          </span>
                        </div>
                      )}
                      
                      {empresa.data_abertura && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Abertura: {empresa.data_abertura}</span>
                        </div>
                      )}
                    </div>
                    
                    {empresa.slug && (
                      <div className="mt-4">
                        <Link to={`/cnpj/${empresa.slug}`}>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Ver detalhes
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              
              {data.total > 20 && (
                <div className="flex justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </Button>
                  <span className="px-4 py-2 text-sm text-muted-foreground">
                    Página {currentPage} de {Math.ceil(data.total / 20)}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage * 20 >= data.total}
                  >
                    Próxima
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default CNAEDetalhePage;