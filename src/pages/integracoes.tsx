
import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { SidebarToggle } from "@/components/ui/sidebar-toggle";
import { Helmet } from "react-helmet";
import { integrations } from "@/data/mockData";
import { toast } from "@/components/ui/use-toast";
import { IntegrationCard } from "@/components/integration-card";

export default function Integracoes() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [integrationList, setIntegrationList] = useState(integrations);

  const handleConnect = (id: string) => {
    setIntegrationList(prevList =>
      prevList.map(item =>
        item.id === id ? { ...item, connected: true } : item
      )
    );
    
    toast({
      title: "Integração conectada",
      description: "A integração foi conectada com sucesso.",
    });
  };

  const handleDisconnect = (id: string) => {
    setIntegrationList(prevList =>
      prevList.map(item =>
        item.id === id ? { ...item, connected: false } : item
      )
    );
    
    toast({
      title: "Integração desconectada",
      description: "A integração foi desconectada com sucesso.",
      variant: "destructive",
    });
  };

  return (
    <>
      <Helmet>
        <title>Integrações - Anye Parts</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-72" : ""}`}>
          <SidebarToggle isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="container mx-auto py-6 px-4 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Integrações</h1>
                <p className="text-gray-500">Conecte suas plataformas e automatize seus processos.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrationList.map(integration => (
                <IntegrationCard
                  key={integration.id}
                  integration={integration}
                  onConnect={handleConnect}
                  onDisconnect={handleDisconnect}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
