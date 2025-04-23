
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Produtos from "./pages/produtos";
import Lucratividade from "./pages/lucratividade";
import Compatibilidades from "./pages/compatibilidades";
import Mensagens from "./pages/mensagens";
import Integracoes from "./pages/integracoes";
import CentralPromocoes from "./pages/promocoes";
import ReposicaoEstoque from "./pages/reposicao-estoque";
import SettingsPage from "./pages/settings";
import Support from "./pages/support";
import MeusAnuncios from "./pages/meus-anuncios";
import ConciliacaoFinanceira from "./pages/conciliacao-financeira";
import Login from "./pages/login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Helmet
          titleTemplate="%s - Anye Parts"
          defaultTitle="Anye Parts - Dashboard"
        >
          <meta name="description" content="Dashboard de gestão para Anye Parts" />
        </Helmet>
        
        <Toaster />
        <Sonner />
        
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Index />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/meus-anuncios" element={<MeusAnuncios />} />
            <Route path="/central-promocoes" element={<CentralPromocoes />} />
            <Route path="/painel-lucratividade" element={<Lucratividade />} />
            <Route path="/compatibilidades" element={<Compatibilidades />} />
            <Route path="/mensagens-automaticas" element={<Mensagens />} />
            <Route path="/integracoes" element={<Integracoes />} />
            <Route path="/reposicao-estoque" element={<ReposicaoEstoque />} />
            <Route path="/conciliacao-financeira" element={<ConciliacaoFinanceira />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
