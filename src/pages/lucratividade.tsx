import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { SidebarToggle } from "@/components/ui/sidebar-toggle";
import { Helmet } from "react-helmet-async";
import { profitabilityData } from "@/data/mockData";
import { ProfitabilityTable } from "@/components/profitability-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Filter, Plus, Info, BarChart3 } from "lucide-react";

export default function PainelLucratividade() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Helmet>
        <title>Painel de Lucratividade - Anye Parts</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-80" : ""}`}>
          <SidebarToggle isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="container mx-auto py-6 px-4 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold tracking-tight">Lucratividade</h1>
                  <Badge className="bg-[#ffe600] hover:bg-[#ffe600] text-black">
                    Exclusivo Meli
                  </Badge>
                </div>
                <p className="text-gray-500 flex items-center gap-2 mt-1">
                  <Info className="h-4 w-4" />
                  Análise de lucratividade dos seus produtos no Mercado Livre.
                </p>
              </div>
              
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrar
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Produto
                </Button>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <ProfitabilityTable data={profitabilityData} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
