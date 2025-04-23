
import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { SidebarToggle } from "@/components/ui/sidebar-toggle";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";
import { MarketplaceSelector } from "@/components/marketplace-selector";
import { MeusAnunciosTable } from "@/components/meus-anuncios-table";

export default function MeusAnuncios() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMarketplace, setSelectedMarketplace] = useState<"mercadolivre" | "shopee">("mercadolivre");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleMarketplaceChange = (marketplace: "mercadolivre" | "shopee") => {
    setSelectedMarketplace(marketplace);
    toast({
      title: `Marketplace alterado para ${marketplace === "mercadolivre" ? "Mercado Livre" : "Shopee"}`,
      description: "Atualizando dados de anúncios...",
      duration: 2000,
    });
  };

  return (
    <>
      <Helmet>
        <title>Meus Anúncios - Anye Parts</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-80" : ""}`}>
          <SidebarToggle isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="container mx-auto py-6 px-4 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Meus Anúncios</h1>
                <p className="text-muted-foreground mt-2">Gerencie seus anúncios e monitore o desempenho de vendas.</p>
              </div>
              <div className="flex items-center gap-2">
                <MarketplaceSelector 
                  value={selectedMarketplace}
                  onChange={handleMarketplaceChange}
                />
              </div>
            </div>

            <MeusAnunciosTable marketplace={selectedMarketplace} />
          </main>
        </div>
      </div>
    </>
  );
}
