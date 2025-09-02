import { useParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const CNAEDetalhePage = () => {
  const { codigo } = useParams<{ codigo: string }>();

  return (
    <PageLayout
      title={`CNAE ${codigo}`}
      description={`Detalhes da atividade econômica ${codigo}`}
      breadcrumbItems={[
        { label: "CNAEs", href: "/cnae" },
        { label: `CNAE ${codigo}` }
      ]}
    >
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Em desenvolvimento
        </h2>
        <p className="text-muted-foreground">
          Detalhes específicos do CNAE serão implementados em breve.
        </p>
      </div>
    </PageLayout>
  );
};

export default CNAEDetalhePage;