import { useParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { getEstadoPorUF } from "@/data/estados";
import NotFound from "./NotFound";

const EmpresasPorCidadePage = () => {
  const { uf, cidade } = useParams<{ uf: string; cidade: string }>();
  const estado = uf ? getEstadoPorUF(uf) : undefined;

  if (!estado || !cidade) {
    return <NotFound />;
  }

  return (
    <PageLayout
      title={`Empresas em ${cidade}`}
      description={`Lista de empresas cadastradas em ${cidade}, ${estado.nome}`}
      breadcrumbItems={[
        { label: "Estados", href: "/estados" },
        { label: estado.nome, href: `/estados/${uf}` },
        { label: cidade }
      ]}
    >
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Em desenvolvimento
        </h2>
        <p className="text-muted-foreground">
          Esta funcionalidade será implementada em breve com dados do Supabase.
        </p>
      </div>
    </PageLayout>
  );
};

export default EmpresasPorCidadePage;