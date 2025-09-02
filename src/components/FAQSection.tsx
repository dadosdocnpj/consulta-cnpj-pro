import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "O serviço de consulta CNPJ é realmente gratuito?",
      answer: "Sim! Nosso serviço de consulta CNPJ é 100% gratuito. Você pode pesquisar quantas empresas quiser sem qualquer custo ou limitação. Mantemos o serviço gratuito através de publicidade não intrusiva."
    },
    {
      question: "Com que frequência os dados são atualizados?",
      answer: "Nossos dados são atualizados mensalmente com as informações mais recentes da Receita Federal. Isso garante que você tenha acesso às informações mais precisas sobre situação cadastral, endereços e demais dados empresariais."
    },
    {
      question: "Que informações posso encontrar sobre uma empresa?",
      answer: "Você pode consultar: CNPJ, razão social, nome fantasia, situação cadastral, CNAE principal e secundários, endereço completo, telefone, email, capital social, natureza jurídica, quadro societário e histórico de alterações."
    },
    {
      question: "Como posso pesquisar uma empresa?",
      answer: "Você pode pesquisar de três formas: pelo número do CNPJ (com ou sem formatação), pela razão social da empresa ou pelo nome fantasia. Nossa busca é inteligente e encontra resultados mesmo com digitação parcial."
    },
    {
      question: "Os dados são oficiais e confiáveis?",
      answer: "Sim! Todas as informações são extraídas diretamente da Receita Federal e outros órgãos oficiais. Trabalhamos apenas com fontes governamentais para garantir a veracidade e precisão dos dados apresentados."
    },
    {
      question: "Posso usar os dados para fins comerciais?",
      answer: "Os dados são de domínio público e podem ser utilizados para fins legítimos. Recomendamos sempre verificar a legislação vigente sobre proteção de dados e usar as informações de forma ética e responsável."
    },
    {
      question: "Por que algumas empresas não aparecem na busca?",
      answer: "Empresas muito recentes podem não estar em nossa base ainda, pois dependemos das atualizações oficiais. Microempreendedores individuais (MEI) também podem ter limitações de dados públicos disponíveis."
    },
    {
      question: "Posso consultar o histórico de uma empresa?",
      answer: "Sim! Nossa plataforma mostra o histórico de alterações da empresa, incluindo mudanças de endereço, razão social, atividades econômicas e situação cadastral ao longo do tempo."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-muted-foreground">
              Tire suas dúvidas sobre nosso serviço de consulta CNPJ
            </p>
          </div>

          <div className="bg-card rounded-lg shadow-soft border border-border p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-card-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* AdSense Placeholder */}
          <div className="mt-12 flex justify-center">
            <div className="bg-muted/50 rounded-lg p-6 border-2 border-dashed border-border w-full max-w-2xl">
              <p className="text-sm text-muted-foreground text-center">
                [Espaço reservado para AdSense - 728x90]
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;