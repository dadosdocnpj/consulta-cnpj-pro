import { useParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const CNAEsGrupoPage = () => {
  const { grupo } = useParams<{ grupo: string }>();

  return (
    <PageLayout
      title={`CNAE - Grupo ${grupo}`}
      description={`Atividades econômicas do grupo ${grupo}`}
      breadcrumbItems={[
        { label: "CNAEs", href: "/cnae" },
        { label: `Grupo ${grupo}` }
      ]}
    >
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Em desenvolvimento
        </h2>
        <p className="text-muted-foreground">
          Detalhes do grupo CNAE serão implementados em breve.
        </p>
      </div>
    </PageLayout>
  );
};

export default CNAEsGrupoPage;