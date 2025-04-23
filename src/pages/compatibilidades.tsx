import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { SidebarToggle } from "@/components/ui/sidebar-toggle";
import { Helmet } from "react-helmet";
import { compatibilities } from "@/data/mockData";
import { CompatibilityTable } from "@/components/compatibility-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Download, Plus, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Compatibilidades() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Helmet>
        <title>Compatibilidades - Anye Parts</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-72" : ""}`}>
          <SidebarToggle isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Compatibilidades</h1>
                <p className="text-gray-500">Gerencie compatibilidades de autopeças.</p>
              </div>
              
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Lista
                </Button>
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-500">
                  <Brain className="mr-2 h-4 w-4" />
                  Gerar Compatibilidades com IA
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="col-span-2">
                <Input
                  placeholder="Pesquisar por produto, marca, modelo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por marca" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as marcas</SelectItem>
                    <SelectItem value="ford">Ford</SelectItem>
                    <SelectItem value="volkswagen">Volkswagen</SelectItem>
                    <SelectItem value="chevrolet">Chevrolet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Button className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Pesquisar
                </Button>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <CompatibilityTable compatibilities={compatibilities} />
            </div>

            <div className="mt-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-blue-800 mb-2">IA para Compatibilidades</h3>
                <p className="text-blue-700 mb-4">
                  Nossa inteligência artificial analisa o big data Anye Parts para sugerir automaticamente 
                  compatibilidades para suas autopeças.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded shadow-sm">
                    <h4 className="font-medium mb-2">Como funciona?</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="min-w-4 mt-1">1.</div>
                        <div>Selecione um produto no seu catálogo</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="min-w-4 mt-1">2.</div>
                        <div>Clique em "Gerar Compatibilidades"</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="min-w-4 mt-1">3.</div>
                        <div>Nossa IA analisa dados históricos e técnicos</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="min-w-4 mt-1">4.</div>
                        <div>Receba uma lista completa de compatibilidades</div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded shadow-sm">
                    <h4 className="font-medium mb-2">Benefícios</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <div>Economia de tempo na pesquisa</div>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <div>Precisão baseada em dados técnicos</div>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <div>Atualização contínua da base de conhecimento</div>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <div>Melhor experiência para seus clientes</div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <Button className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Brain className="mr-2 h-4 w-4" />
                  Começar a usar IA agora
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
