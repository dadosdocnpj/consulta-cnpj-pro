import PageLayout from "@/components/PageLayout";

const CNAEsPage = () => {
  return (
    <PageLayout
      title="Classificação Nacional de Atividades Econômicas (CNAE)"
      description="Navegue por empresas organizadas por setores e atividades econômicas"
      breadcrumbItems={[
        { label: "CNAEs" }
      ]}
    >
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Em desenvolvimento
        </h2>
        <p className="text-muted-foreground">
          Classificação por atividades econômicas será implementada em breve.
        </p>
      </div>
    </PageLayout>
  );
};

export default CNAEsPage;