import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface QRCodeGeneratorProps {
  url: string;
  title: string;
  companyName: string;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ 
  url, 
  title, 
  companyName 
}) => {
  // Usando um serviço de QR Code público
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;

  const handleDownloadQR = async () => {
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `qrcode-${companyName.toLowerCase().replace(/\s+/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(downloadUrl);
      toast.success('QR Code baixado com sucesso!');
    } catch (error) {
      toast.error('Erro ao baixar QR Code');
    }
  };

  const handleShareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `QR Code - ${title}`,
          text: `Acesse os dados da empresa ${companyName}`,
          url: url
        });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Link copiado para a área de transferência!');
    }
  };

  return (
    <Card className="card-modern">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5 text-primary" />
          QR Code da Empresa
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="flex justify-center">
          <img 
            src={qrCodeUrl} 
            alt={`QR Code para ${companyName}`}
            className="border rounded-lg shadow-sm"
          />
        </div>
        
        <p className="text-sm text-muted-foreground">
          Escaneie para acessar os dados da empresa
        </p>
        
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownloadQR}
            className="text-xs"
          >
            <Download className="mr-1 h-3 w-3" />
            Baixar QR Code
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleShareQR}
            className="text-xs"
          >
            <Share2 className="mr-1 h-3 w-3" />
            Compartilhar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};