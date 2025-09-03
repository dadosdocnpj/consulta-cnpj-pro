import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

const ExecuteImport = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImport = async () => {
    setIsImporting(true);
    setError(null);
    setResults(null);
    setProgress(0);

    try {
      console.log('🚀 Iniciando importação de empresas...');
      
      // Simular progresso
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev < 90) return prev + 10;
          return prev;
        });
      }, 1000);

      const { data, error: functionError } = await supabase.functions.invoke('populate-cnpj-cache', {
        body: {}
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (functionError) {
        throw new Error(functionError.message);
      }

      setResults(data);
      toast.success('Importação concluída com sucesso!');
      
    } catch (err: any) {
      console.error('❌ Erro na importação:', err);
      setError(err.message);
      toast.error('Erro na importação: ' + err.message);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Importar Base de Empresas
          </CardTitle>
          <CardDescription>
            Execute a importação de 1000 empresas curadas cobrindo todos os 27 estados brasileiros
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!isImporting && !results && !error && (
            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Esta operação irá buscar e importar dados de 1000 empresas brasileiras curadas.
                  O processo pode levar entre 15-30 minutos para concluir.
                </AlertDescription>
              </Alert>
              
              <Button 
                onClick={handleImport}
                className="w-full"
                size="lg"
              >
                Iniciar Importação
              </Button>
            </div>
          )}

          {isImporting && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Importando empresas...</h3>
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-2">
                  {progress}% concluído
                </p>
              </div>
            </div>
          )}

          {results && (
            <div className="space-y-4">
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Importação concluída com sucesso!
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-green-600">
                      {results.results?.success || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">Sucessos</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-blue-600">
                      {results.results?.skipped || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">Pulados</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-red-600">
                      {results.results?.errors || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">Erros</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">
                      {results.results?.processed || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </CardContent>
                </Card>
              </div>
              
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
                className="w-full"
              >
                Atualizar Página
              </Button>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecuteImport;