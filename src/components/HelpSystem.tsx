import React, { useState, useEffect } from "react";
import { HelpCircle, X, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TooltipData {
  selector: string;
  title: string;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
}

interface TourStep {
  id: string;
  title: string;
  content: string;
  selector: string;
  position?: "top" | "bottom" | "left" | "right";
}

interface TooltipProps {
  target: string;
  title: string;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  isVisible: boolean;
  onClose: () => void;
}

const Tooltip = ({ target, title, content, position = "top", isVisible, onClose }: TooltipProps) => {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isVisible) {
      const targetElement = document.querySelector(target);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        let top = 0;
        let left = 0;

        switch (position) {
          case "top":
            top = rect.top + scrollTop - 10;
            left = rect.left + scrollLeft + rect.width / 2;
            break;
          case "bottom":
            top = rect.bottom + scrollTop + 10;
            left = rect.left + scrollLeft + rect.width / 2;
            break;
          case "left":
            top = rect.top + scrollTop + rect.height / 2;
            left = rect.left + scrollLeft - 10;
            break;
          case "right":
            top = rect.top + scrollTop + rect.height / 2;
            left = rect.right + scrollLeft + 10;
            break;
        }

        setTooltipPosition({ top, left });
      }
    }
  }, [isVisible, target, position]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed z-50 bg-card border border-border rounded-lg shadow-lg p-4 max-w-xs animate-fade-in"
      style={{
        top: tooltipPosition.top,
        left: tooltipPosition.left,
        transform: position === "top" || position === "bottom" 
          ? "translateX(-50%)" 
          : position === "left" 
            ? "translateX(-100%)" 
            : "translateY(-50%)"
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-sm text-foreground">{title}</h4>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-4 w-4 p-0">
          <X className="h-3 w-3" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">{content}</p>
      
      {/* Arrow */}
      <div 
        className={`absolute w-2 h-2 bg-card border rotate-45 ${
          position === "top" ? "bottom-[-4px] left-1/2 transform -translate-x-1/2 border-b border-r" :
          position === "bottom" ? "top-[-4px] left-1/2 transform -translate-x-1/2 border-t border-l" :
          position === "left" ? "right-[-4px] top-1/2 transform -translate-y-1/2 border-t border-r" :
          "left-[-4px] top-1/2 transform -translate-y-1/2 border-b border-l"
        }`}
      />
    </div>
  );
};

interface TourProps {
  steps: TourStep[];
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const Tour = ({ steps, isActive, onComplete, onSkip }: TourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
      setCurrentStep(0);
    } else {
      setIsVisible(false);
    }
  }, [isActive]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTour = () => {
    setIsVisible(false);
    onComplete();
  };

  const skipTour = () => {
    setIsVisible(false);
    onSkip();
  };

  if (!isVisible || !steps[currentStep]) return null;

  const step = steps[currentStep];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" />
      
      {/* Step Content */}
      <Tooltip
        target={step.selector}
        title={step.title}
        content={step.content}
        position={step.position}
        isVisible={true}
        onClose={() => {}}
      />

      {/* Tour Controls */}
      <div className="fixed bottom-6 right-6 z-50">
        <Card className="card-modern">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {currentStep + 1} de {steps.length}
                </Badge>
                <span className="text-sm font-medium">Tour Guiado</span>
              </div>
              <Button variant="ghost" size="sm" onClick={skipTour}>
                Pular tour
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Anterior
              </Button>

              <Button
                size="sm"
                onClick={nextStep}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Concluir
                  </>
                ) : (
                  <>
                    Próximo
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>

            {/* Progress indicator */}
            <div className="mt-3">
              <div className="flex gap-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded-full ${
                      index <= currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

interface HelpSystemProps {
  tooltips?: TooltipData[];
  tourSteps?: TourStep[];
  autoStartTour?: boolean;
}

const HelpSystem = ({ tooltips = [], tourSteps = [], autoStartTour = false }: HelpSystemProps) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [isTourActive, setIsTourActive] = useState(autoStartTour);

  // Tooltips padrão do sistema
  const defaultTooltips: TooltipData[] = [
    {
      selector: "[data-help='search']",
      title: "Busca Inteligente",
      content: "Digite o nome da empresa, CNPJ ou palavra-chave para encontrar informações rapidamente."
    },
    {
      selector: "[data-help='filters']",
      title: "Filtros Avançados",
      content: "Use os filtros para refinar sua busca por situação, porte, localização e outros critérios."
    },
    {
      selector: "[data-help='favorites']",
      title: "Favoritos",
      content: "Salve empresas e CNAEs importantes para acessá-los rapidamente mais tarde."
    },
    {
      selector: "[data-help='export']",
      title: "Exportar Dados",
      content: "Baixe relatórios e dados em diferentes formatos para análise offline."
    }
  ];

  // Steps padrão do tour
  const defaultTourSteps: TourStep[] = [
    {
      id: "welcome",
      title: "Bem-vindo ao Dados do CNPJ!",
      content: "Este tour rápido mostrará as principais funcionalidades da plataforma.",
      selector: "header",
      position: "bottom"
    },
    {
      id: "search",
      title: "Busca Poderosa",
      content: "Use a busca para encontrar empresas por nome, CNPJ ou atividade econômica.",
      selector: "[data-help='search']",
      position: "bottom"
    },
    {
      id: "navigation",
      title: "Navegação por Categorias",
      content: "Explore empresas organizadas por estados, setores econômicos (CNAE) e rankings.",
      selector: "nav",
      position: "bottom"
    },
    {
      id: "features",
      title: "Recursos Avançados",
      content: "Aproveite favoritos, histórico de pesquisas, comparadores e análises visuais.",
      selector: "main",
      position: "top"
    }
  ];

  const allTooltips = [...defaultTooltips, ...tooltips];
  const allTourSteps = [...defaultTourSteps, ...tourSteps];

  const showTooltip = (selector: string) => {
    setActiveTooltip(selector);
  };

  const hideTooltip = () => {
    setActiveTooltip(null);
  };

  const startTour = () => {
    setIsTourActive(true);
  };

  const completeTour = () => {
    setIsTourActive(false);
    localStorage.setItem("dadosdocnpj_tour_completed", "true");
  };

  const skipTour = () => {
    setIsTourActive(false);
    localStorage.setItem("dadosdocnpj_tour_skipped", "true");
  };

  // Check if tour should auto-start
  useEffect(() => {
    const tourCompleted = localStorage.getItem("dadosdocnpj_tour_completed");
    const tourSkipped = localStorage.getItem("dadosdocnpj_tour_skipped");
    
    if (!tourCompleted && !tourSkipped && autoStartTour) {
      setTimeout(() => setIsTourActive(true), 2000);
    }
  }, [autoStartTour]);

  return (
    <>
      {/* Help Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={startTour}
        className="fixed bottom-6 left-6 z-40 bg-card border-border shadow-lg"
        title="Ajuda e Tour Guiado"
      >
        <HelpCircle className="h-4 w-4 mr-2" />
        Ajuda
      </Button>

      {/* Tooltips */}
      {allTooltips.map((tooltip) => (
        <Tooltip
          key={tooltip.selector}
          target={tooltip.selector}
          title={tooltip.title}
          content={tooltip.content}
          position={tooltip.position}
          isVisible={activeTooltip === tooltip.selector}
          onClose={hideTooltip}
        />
      ))}

      {/* Tour */}
      <Tour
        steps={allTourSteps}
        isActive={isTourActive}
        onComplete={completeTour}
        onSkip={skipTour}
      />
    </>
  );
};

export default HelpSystem;
export { Tooltip, Tour };