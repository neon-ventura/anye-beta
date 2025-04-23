
import { Sidebar } from "@/components/sidebar";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { SidebarToggle } from "@/components/ui/sidebar-toggle";
import { revenueData, salesStats, stockStats } from "@/data/mockData";
import { StatsCard } from "@/components/stats-card";
import { ChartRevenue } from "@/components/chart-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, TrendingDown, Package, ShoppingCart, 
  Users, Award, AlertTriangle, BarChart3, Activity 
} from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard - Anye Parts</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-gray-50/50">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-80" : ""}`}>
          <SidebarToggle isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="container mx-auto py-8 px-4 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-1">Dashboard</h1>
                <p className="text-gray-500">Visão geral dos indicadores do seu negócio.</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <div className="text-sm text-gray-500 flex items-center">
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                  <span>Atualizado há 5 minutos</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <StatsCard
                title="Vendas Totais (R$)"
                value={salesStats.totalSales.toString()}
                description="últimos 30 dias"
                icon={ShoppingCart}
                trend={{ value: salesStats.growth, isPositive: true }}
              />
              <StatsCard
                title="Ticket Médio (R$)"
                value={salesStats.averageTicket}
                description="por venda"
                icon={TrendingUp}
              />
              <StatsCard
                title="Itens em Estoque"
                value={stockStats.totalItems}
                isStock={true}
                icon={Package}
              />
              <StatsCard
                title="Estoque Baixo"
                value={stockStats.lowStock}
                isStock={true}
                description="precisa de reposição"
                icon={AlertTriangle}
                className="border-orange-200 hover:shadow-orange-100"
              />
            </div>
            
            <div className="grid gap-6 md:grid-cols-7 mb-8">
              <div className="md:col-span-4">
                <ChartRevenue data={revenueData} />
              </div>
              
              <div className="md:col-span-3">
                <Card className="chart-card h-full">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Produtos Mais Vendidos</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="space-y-5">
                      {salesStats.topProducts.map((product, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                              ${idx === 0 ? 'bg-yellow-100 text-yellow-700' : 
                                idx === 1 ? 'bg-gray-100 text-gray-700' :
                                idx === 2 ? 'bg-orange-100 text-orange-700' :
                                'bg-blue-50 text-blue-700'}`}>
                              {idx + 1}
                            </div>
                            <div>
                              <span className="font-medium text-gray-900">{product.name}</span>
                              <div className="text-xs text-gray-500">SKU: #{(10000 + idx).toString()}</div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-medium">{product.sales} un</span>
                            <div className="text-xs text-green-600">+{idx + 5}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card className="chart-card">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Estoque</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-4">
                    {stockStats.mostStocked.map((product, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-10 bg-anye-primary rounded-full"></div>
                          <div>
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-500">Em estoque</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{product.stock} un</span>
                          <div className={`px-2 py-0.5 rounded-full text-xs ${
                            product.stock > 50 ? 'bg-green-100 text-green-700' :
                            product.stock > 20 ? 'bg-blue-100 text-blue-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {product.stock > 50 ? 'Alto' : product.stock > 20 ? 'Médio' : 'Baixo'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="chart-card">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Informações</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 h-full">
                  <div className="space-y-6">
                    <div className="rounded-lg bg-blue-50 p-4">
                      <div className="font-medium text-blue-800 mb-1">Anye Parts</div>
                      <p className="text-sm text-blue-600 mb-3">Sistema de gestão para autopeças</p>
                      <div className="flex gap-2 text-xs">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md">v1.2.0</span>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md">Estável</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Status das integrações</div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Mercado Livre</span>
                        </div>
                        <span className="text-xs text-gray-500">Conectado</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Bling</span>
                        </div>
                        <span className="text-xs text-gray-500">Conectado</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-sm">Amazon</span>
                        </div>
                        <span className="text-xs text-red-500">Ação necessária</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
