import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";

// Lazy load secondary pages to reduce initial bundle size
const ExecuteImport = lazy(() => import("./pages/ExecuteImport"));
const EstadosPage = lazy(() => import("./pages/EstadosPage"));
const CidadesPage = lazy(() => import("./pages/CidadesPage"));
const EmpresasPorCidadePage = lazy(() => import("./pages/EmpresasPorCidadePage"));
const CNAEsPage = lazy(() => import("./pages/CNAEsPage"));
const CNAESecaoPage = lazy(() => import("./pages/CNAESecaoPage"));
const CNAEDivisaoPage = lazy(() => import("./pages/CNAEDivisaoPage"));
const CNAEGrupoPage = lazy(() => import("./pages/CNAEGrupoPage"));
const CNAEClassePage = lazy(() => import("./pages/CNAEClassePage"));
const CNAESubclassePage = lazy(() => import("./pages/CNAESubclassePage"));
const CNAEsGrupoPage = lazy(() => import("./pages/CNAEsGrupoPage"));
const CNAEDetalhePage = lazy(() => import("./pages/CNAEDetalhePage"));
const TopEmpresasPage = lazy(() => import("./pages/TopEmpresasPage"));
const EmpresasRecentesPage = lazy(() => import("./pages/EmpresasRecentesPage"));
const StartupsPage = lazy(() => import("./pages/StartupsPage"));
const EmpresasPublicasPage = lazy(() => import("./pages/EmpresasPublicasPage"));
const CNAEImportPage = lazy(() => import("./pages/CNAEImportPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/estados" element={<EstadosPage />} />
              <Route path="/estados/:uf" element={<CidadesPage />} />
              <Route path="/estados/:uf/:cidade" element={<EmpresasPorCidadePage />} />
              <Route path="/cnae" element={<CNAEsPage />} />
              <Route path="/cnae/secao/:slug" element={<CNAESecaoPage />} />
              <Route path="/cnae/divisao/:slug" element={<CNAEDivisaoPage />} />
              <Route path="/cnae/grupo/:slug" element={<CNAEGrupoPage />} />
              <Route path="/cnae/classe/:slug" element={<CNAEClassePage />} />
              <Route path="/cnae/subclasse/:slug" element={<CNAESubclassePage />} />
              {/* Legacy routes for backward compatibility */}
              <Route path="/cnae/grupo/:grupo" element={<CNAEsGrupoPage />} />
              <Route path="/cnae/codigo/:codigo" element={<CNAEDetalhePage />} />
              <Route path="/ranking/top-empresas" element={<TopEmpresasPage />} />
              <Route path="/empresas-recentes" element={<EmpresasRecentesPage />} />
              <Route path="/categoria/startups" element={<StartupsPage />} />
              <Route path="/categoria/publicas" element={<EmpresasPublicasPage />} />
              <Route path="/admin/import" element={<ExecuteImport />} />
              <Route path="/admin/importar-cnaes" element={<CNAEImportPage />} />
              <Route path="/:slug" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
