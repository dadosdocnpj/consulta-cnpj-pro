import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Download, Database, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCNAESecoes } from '@/hooks/useCNAEsData';

export default function CNAEImportPage() {
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  
  const { data: secoes, refetch: refetchSecoes } = useCNAESecoes();

  const executarImportacao = async () => {
    setIsImporting(true);
    setProgress(0);
    setImportResult(null);

    try {
      // Simular progresso
      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const { data, error } = await supabase.functions.invoke('importar-cnaes');
      
      clearInterval(interval);
      setProgress(100);

      if (error) {
        throw error;
      }

      setImportResult(data);
      
      // Atualizar dados após importação
      await refetchSecoes();

    } catch (error: any) {
      console.error('Erro na importação:', error);
      setImportResult({
        sucesso: false,
        erro: error.message || 'Erro desconhecido',
        importados: 0,
        erros: 1
      });
    } finally {
      setIsImporting(false);
    }
  };

  const totalSecoes = secoes?.length || 0;

  return (
    <PageLayout
      title="Importação dos CNAEs"
      description="Importe a estrutura completa dos Códigos Nacionais de Atividades Econômicas brasileiros"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Status Atual */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Status da Base de CNAEs
              </CardTitle>
              <CardDescription>
                Estado atual da estrutura de CNAEs no banco de dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{totalSecoes}</div>
                  <div className="text-sm text-muted-foreground">Seções CNAEs</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">21</div>
                  <div className="text-sm text-muted-foreground">Meta de Seções</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Badge variant={totalSecoes >= 21 ? "default" : "secondary"}>
                    {totalSecoes >= 21 ? "Completo" : "Incompleto"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Importação */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Importar Estrutura CNAEs
              </CardTitle>
              <CardDescription>
                Execute a importação completa dos CNAEs brasileiros (seções, divisões, grupos, classes e subclasses)
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {!isImporting && !importResult && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Esta operação irá importar a estrutura hierárquica completa dos CNAEs brasileiros.
                    Inclui 21 seções, divisões, grupos, classes e subclasses principais.
                  </AlertDescription>
                </Alert>
              )}

              {isImporting && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Importando estrutura dos CNAEs...</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-muted-foreground">
                    Processando {progress}% - Importando seções, divisões, grupos, classes e subclasses
                  </p>
                </div>
              )}

              {importResult && (
                <Alert className={importResult.sucesso ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                  {importResult.sucesso ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription className={importResult.sucesso ? "text-green-800" : "text-red-800"}>
                    {importResult.sucesso ? (
                      <>
                        <strong>Importação concluída com sucesso!</strong>
                        <br />
                        Importados: {importResult.importados} registros
                        {importResult.erros > 0 && (
                          <>
                            <br />
                            Erros: {importResult.erros} registros
                          </>
                        )}
                        <br />
                        Total processado: {importResult.total} registros
                      </>
                    ) : (
                      <>
                        <strong>Erro na importação:</strong>
                        <br />
                        {importResult.erro}
                      </>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button 
                  onClick={executarImportacao}
                  disabled={isImporting}
                  className="flex items-center gap-2"
                >
                  {isImporting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  {isImporting ? 'Importando...' : 'Importar CNAEs'}
                </Button>
                
                {importResult && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setImportResult(null);
                      setProgress(0);
                    }}
                  >
                    Nova Importação
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Informações sobre CNAEs */}
          <Card>
            <CardHeader>
              <CardTitle>Sobre a Estrutura CNAEs</CardTitle>
              <CardDescription>
                Entenda a hierarquia dos Códigos Nacionais de Atividades Econômicas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">🏛️ Seções (A-U)</h4>
                    <p className="text-sm text-muted-foreground">
                      21 grandes setores da economia, de Agricultura (A) a Organismos Internacionais (U)
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">📊 Divisões (2 dígitos)</h4>
                    <p className="text-sm text-muted-foreground">
                      Subdivisões das seções, totalizando cerca de 88 atividades econômicas
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">🔗 Grupos (3 dígitos)</h4>
                    <p className="text-sm text-muted-foreground">
                      Agrupamentos mais específicos, totalizando cerca de 272 categorias
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">📋 Classes (4 dígitos)</h4>
                    <p className="text-sm text-muted-foreground">
                      Classificações detalhadas, totalizando cerca de 673 atividades
                    </p>
                  </div>
                </div>
                <div className="p-4 border rounded-lg bg-muted">
                  <h4 className="font-semibold mb-2">🎯 Subclasses (7 dígitos)</h4>
                  <p className="text-sm text-muted-foreground">
                    Código mais específico usado no CNPJ, totalizando cerca de 1.355 atividades econômicas detalhadas
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </PageLayout>
  );
}