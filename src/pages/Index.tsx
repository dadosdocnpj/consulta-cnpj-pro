import { useParams } from "react-router-dom";
import CNPJPage from "@/pages/CNPJPage";
import Homepage from "@/pages/Homepage";

const Index = () => {
  const { slug } = useParams<{ slug: string }>();

  // Se há um slug na URL, renderizar a página de CNPJ
  if (slug) {
    return <CNPJPage />;
  }

  // Caso contrário, renderizar a homepage
  return <Homepage />;
};

export default Index;
