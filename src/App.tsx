import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import ExecuteImport from "./pages/ExecuteImport";
import EstadosPage from "./pages/EstadosPage";
import CidadesPage from "./pages/CidadesPage";
import EmpresasPorCidadePage from "./pages/EmpresasPorCidadePage";
import CNAEsPage from "./pages/CNAEsPage";
import CNAEsGrupoPage from "./pages/CNAEsGrupoPage";
import CNAEDetalhePage from "./pages/CNAEDetalhePage";
import TopEmpresasPage from "./pages/TopEmpresasPage";
import EmpresasRecentesPage from "./pages/EmpresasRecentesPage";
import StartupsPage from "./pages/StartupsPage";
import EmpresasPublicasPage from "./pages/EmpresasPublicasPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/estados" element={<EstadosPage />} />
            <Route path="/estados/:uf" element={<CidadesPage />} />
            <Route path="/estados/:uf/:cidade" element={<EmpresasPorCidadePage />} />
            <Route path="/cnae" element={<CNAEsPage />} />
            <Route path="/cnae/grupo/:grupo" element={<CNAEsGrupoPage />} />
            <Route path="/cnae/codigo/:codigo" element={<CNAEDetalhePage />} />
            <Route path="/ranking/top-empresas" element={<TopEmpresasPage />} />
            <Route path="/empresas-recentes" element={<EmpresasRecentesPage />} />
            <Route path="/categoria/startups" element={<StartupsPage />} />
            <Route path="/categoria/publicas" element={<EmpresasPublicasPage />} />
            <Route path="/admin/import" element={<ExecuteImport />} />
            <Route path="/:slug" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
