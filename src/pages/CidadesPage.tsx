import { useParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { getEstadoPorUF } from "@/data/estados";
import NotFound from "./NotFound";

const CidadesPage = () => {
  const { uf } = useParams<{ uf: string }>();
  const estado = uf ? getEstadoPorUF(uf) : undefined;

  if (!estado) {
    return <NotFound />;
  }

  // Mock de cidades para demonstração
  const cidadesMock = [
    "Capital", "Região Metropolitana", "Interior Norte", "Interior Sul"
  ];

  return (
    <PageLayout
      title={`Cidades - ${estado.nome}`}
      description={`Explore empresas por cidades do estado ${estado.nome} (${estado.uf})`}
      breadcrumbItems={[
        { label: "Estados", href: "/estados" },
        { label: estado.nome }
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cidadesMock.map((cidade) => (
          <div
            key={cidade}
            className="p-6 border border-border rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {cidade}
            </h3>
            <p className="text-muted-foreground text-sm">
              Em desenvolvimento...
            </p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default CidadesPage;