import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const logoImage = "/lovable-uploads/d54f0af5-d59b-4d5e-9876-ba7766fd200c.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4 hover:opacity-80 transition-smooth">
              <img 
                src={logoImage} 
                alt="Dados do CNPJ - Portal de consulta empresarial" 
                className="h-10 w-auto object-contain filter brightness-0 dark:brightness-100"
              />
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              A maior plataforma gratuita de consulta CNPJ do Brasil. 
              Acesse informações oficiais de milhões de empresas de forma 
              rápida, segura e completamente gratuita.
            </p>
            <p className="text-sm text-muted-foreground">
              Dados extraídos diretamente da Receita Federal e atualizados mensalmente.
            </p>
          </div>

          {/* Links Úteis */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Links Úteis</h4>
            <div className="space-y-2">
              <a
                href="/sobre"
                className="block text-muted-foreground hover:text-primary transition-smooth"
              >
                Sobre o Projeto
              </a>
              <a
                href="/contato"
                className="block text-muted-foreground hover:text-primary transition-smooth"
              >
                Contato
              </a>
              <a
                href="/faq"
                className="block text-muted-foreground hover:text-primary transition-smooth"
              >
                Perguntas Frequentes
              </a>
              <a
                href="/api"
                className="block text-muted-foreground hover:text-primary transition-smooth"
              >
                API Documentation
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <div className="space-y-2">
              <a
                href="/privacidade"
                className="block text-muted-foreground hover:text-primary transition-smooth"
              >
                Política de Privacidade
              </a>
              <a
                href="/termos"
                className="block text-muted-foreground hover:text-primary transition-smooth"
              >
                Termos de Uso
              </a>
              <a
                href="https://www.receita.fazenda.gov.br"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-primary transition-smooth"
              >
                Receita Federal
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* CTA Banner Placeholder */}
        <div className="mt-8 mb-8">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
            <p className="text-sm text-muted-foreground">
              [Espaço reservado para CTA/Banner da empresa - 728x90]
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {currentYear} Dados do CNPJ. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Dados públicos da Receita Federal</span>
              <span>•</span>
              <span>Atualizado mensalmente</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;