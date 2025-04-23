import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { SidebarToggle } from "@/components/ui/sidebar-toggle";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, CalendarDays, Clock, PercentCircle, ShoppingBag, Tag, Trash } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function CentralPromocoes() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Helmet>
        <title>Central de Promoções - Anye Parts</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-72" : ""}`}>
          <SidebarToggle isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Central de Promoções</h1>
                <p className="text-gray-500">Gerencie campanhas promocionais para seus produtos.</p>
              </div>
              
              <Button className="mt-4 md:mt-0">
                Nova Promoção
              </Button>
            </div>

            <Tabs defaultValue="ativas">
              <TabsList className="mb-6">
                <TabsTrigger value="ativas">Ativas</TabsTrigger>
                <TabsTrigger value="programadas">Programadas</TabsTrigger>
                <TabsTrigger value="encerradas">Encerradas</TabsTrigger>
                <TabsTrigger value="rascunhos">Rascunhos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ativas" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-green-100 text-green-800 mb-2">Ativa</Badge>
                      <Button variant="ghost" size="icon" className="text-gray-400">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle>Liquidação de Inverno</CardTitle>
                    <CardDescription>20% de desconto em todos os produtos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center text-gray-500">
                          <CalendarDays className="mr-2 h-4 w-4" />
                          01/04/2025 - 30/04/2025
                        </div>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          <PercentCircle className="mr-1 h-3 w-3" />
                          20%
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Progresso</span>
                          <span className="font-medium">45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between text-sm pt-2">
                        <div className="flex items-center">
                          <ShoppingBag className="mr-2 h-4 w-4 text-gray-400" />
                          <span>248 produtos</span>
                        </div>
                        <div className="flex items-center">
                          <Tag className="mr-2 h-4 w-4 text-gray-400" />
                          <span>35 vendas</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Gerenciar
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-green-100 text-green-800 mb-2">Ativa</Badge>
                      <Button variant="ghost" size="icon" className="text-gray-400">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle>Frete Grátis</CardTitle>
                    <CardDescription>Frete grátis para compras acima de R$150</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center text-gray-500">
                          <CalendarDays className="mr-2 h-4 w-4" />
                          01/04/2025 - 15/04/2025
                        </div>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          Frete Grátis
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Progresso</span>
                          <span className="font-medium">25%</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between text-sm pt-2">
                        <div className="flex items-center">
                          <ShoppingBag className="mr-2 h-4 w-4 text-gray-400" />
                          <span>145 produtos</span>
                        </div>
                        <div className="flex items-center">
                          <Tag className="mr-2 h-4 w-4 text-gray-400" />
                          <span>22 vendas</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Gerenciar
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="programadas" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-yellow-100 text-yellow-800 mb-2">Programada</Badge>
                      <Button variant="ghost" size="icon" className="text-gray-400">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle>Promoção de Aniversário</CardTitle>
                    <CardDescription>30% de desconto em filtros e óleos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center text-gray-500">
                          <CalendarDays className="mr-2 h-4 w-4" />
                          10/05/2025 - 20/05/2025
                        </div>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          <PercentCircle className="mr-1 h-3 w-3" />
                          30%
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center text-sm gap-1.5 text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>Inicia em 35 dias</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm pt-2">
                        <div className="flex items-center">
                          <ShoppingBag className="mr-2 h-4 w-4 text-gray-400" />
                          <span>85 produtos</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Gerenciar
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="encerradas" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-gray-100 text-gray-800 mb-2">Encerrada</Badge>
                      <Button variant="ghost" size="icon" className="text-gray-400">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle>Black Friday 2023</CardTitle>
                    <CardDescription>Até 50% de desconto em toda a loja</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center text-gray-500">
                          <CalendarDays className="mr-2 h-4 w-4" />
                          23/11/2024 - 26/11/2024
                        </div>
                        <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                          <PercentCircle className="mr-1 h-3 w-3" />
                          50%
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center text-sm gap-1.5 text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>Encerrou há 134 dias</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm pt-2">
                        <div className="flex items-center">
                          <ShoppingBag className="mr-2 h-4 w-4 text-gray-400" />
                          <span>312 produtos</span>
                        </div>
                        <div className="flex items-center">
                          <Tag className="mr-2 h-4 w-4 text-gray-400" />
                          <span>186 vendas</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Ver Relatório
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="rascunhos" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-orange-100 text-orange-800 mb-2">Rascunho</Badge>
                      <Button variant="ghost" size="icon" className="text-gray-400">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle>Desconto para Novos Clientes</CardTitle>
                    <CardDescription>15% na primeira compra</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center text-gray-500">
                          <CalendarDays className="mr-2 h-4 w-4" />
                          Data não definida
                        </div>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          <PercentCircle className="mr-1 h-3 w-3" />
                          15%
                        </Badge>
                      </div>
                      
                      <div className="border-l-4 border-orange-300 bg-orange-50 p-3 text-sm text-orange-700">
                        Promoção em desenvolvimento. Configure as datas e produtos antes de ativar.
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Editar
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </>
  );
}
