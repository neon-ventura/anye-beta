import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "@/components/sidebar";
import { SidebarToggle } from "@/components/ui/sidebar-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Calendar, Check, DollarSign, BadgeAlert, ArrowDown, ArrowUp, Mail, Truck, Frown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

export default function ConciliacaoFinanceira() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [platform, setPlatform] = useState<string>("all");
  const [showAdditionalMetrics, setShowAdditionalMetrics] = useState(false);
  const { toast } = useToast();

  const reconciliationData = [
    {
      id: "123456",
      order: "MLB123456789",
      platform: "Mercado Livre",
      expectedValue: 259.90,
      receivedValue: 259.90,
      status: "confirmed",
      saleDate: "2025-04-20",
      expectedDate: "2025-04-25",
      paymentMethod: "Credit Card",
    },
    {
      id: "123457",
      order: "SPE987654321",
      platform: "Shopee",
      expectedValue: 159.90,
      receivedValue: 149.90,
      status: "divergent",
      saleDate: "2025-04-18",
      expectedDate: "2025-04-23",
      paymentMethod: "Shopee Pay",
    },
    {
      id: "123458",
      order: "MLB234567890",
      platform: "Mercado Livre",
      expectedValue: 89.90,
      receivedValue: 89.90,
      status: "pending",
      saleDate: "2025-04-21",
      expectedDate: "2025-04-28",
      paymentMethod: "Pix",
    }
  ];

  const handleSupportMessage = (order: string, expectedValue: number, receivedValue: number) => {
    const message = `Olá, meu pedido de ${order}, está incorreto, teoricamente eu deveria ter recebido R$ ${expectedValue.toFixed(2)}, mas recebi somente R$ ${receivedValue.toFixed(2)}, poderia verificar e me dar mais detalhes por gentileza?`;
    
    navigator.clipboard.writeText(message);
    toast({
      title: "Mensagem copiada!",
      description: "A mensagem foi copiada para sua área de transferência."
    });
  };

  return (
    <>
      <Helmet>
        <title>Conciliação Financeira - Anye Parts</title>
      </Helmet>

      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-72" : ""}`}>
          <SidebarToggle isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />

          <main className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Conciliação Financeira</h1>
                <p className="text-gray-500">Acompanhe e concilie seus recebimentos das plataformas</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Valor Esperado</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 509,70</div>
                  <p className="text-xs text-gray-500">+12% em relação ao mês anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Valor Recebido</CardTitle>
                  <Check className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 499,70</div>
                  <p className="text-xs text-gray-500">98% do valor esperado</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Divergências</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-xs text-gray-500">Pedido com valor divergente</p>
                </CardContent>
              </Card>
            </div>

            <Collapsible className="mb-6">
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  Métricas Adicionais
                  {showAdditionalMetrics ? (
                    <ArrowUp className="h-4 w-4 ml-2" />
                  ) : (
                    <ArrowDown className="h-4 w-4 ml-2" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Card className="bg-white shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Devoluções</CardTitle>
                      <Truck className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold">R$ 150,00</div>
                      <p className="text-xs text-gray-500">3 pedidos em processo</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Reclamações</CardTitle>
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold">2</div>
                      <p className="text-xs text-gray-500">Em andamento</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Cancelamentos</CardTitle>
                      <div className="bg-[#E5DEFF] p-1 rounded-full">
                        <Frown className="h-4 w-4 text-purple-600" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold">1</div>
                      <p className="text-xs text-gray-500">Último mês</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Extravios</CardTitle>
                      <Truck className="h-4 w-4 text-gray-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold">0</div>
                      <p className="text-xs text-gray-500">Este mês</p>
                    </CardContent>
                  </Card>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="bg-white shadow rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input placeholder="Buscar por número do pedido..." />
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrar por plataforma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as plataformas</SelectItem>
                      <SelectItem value="mercadolivre">Mercado Livre</SelectItem>
                      <SelectItem value="shopee">Shopee</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Status de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      <SelectItem value="confirmed">Confirmado</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="divergent">Divergente</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-gradient-to-r from-blue-500 to-indigo-500">
                    <Calendar className="mr-2 h-4 w-4" />
                    Filtrar por período
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pedido</TableHead>
                    <TableHead>Plataforma</TableHead>
                    <TableHead>Valor Esperado</TableHead>
                    <TableHead>Valor Recebido</TableHead>
                    <TableHead>Data da Venda</TableHead>
                    <TableHead>Previsão</TableHead>
                    <TableHead>Forma de Pagamento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reconciliationData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.order}</TableCell>
                      <TableCell>{item.platform}</TableCell>
                      <TableCell>R$ {item.expectedValue.toFixed(2)}</TableCell>
                      <TableCell>R$ {item.receivedValue.toFixed(2)}</TableCell>
                      <TableCell>{new Date(item.saleDate).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{new Date(item.expectedDate).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{item.paymentMethod}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {item.status === 'confirmed' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Check className="mr-1 h-3 w-3" />
                              Confirmado
                            </span>
                          )}
                          {item.status === 'pending' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <Calendar className="mr-1 h-3 w-3" />
                              Pendente
                            </span>
                          )}
                          {item.status === 'divergent' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <BadgeAlert className="mr-1 h-3 w-3" />
                              Divergente
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.status === 'divergent' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSupportMessage(item.order, item.expectedValue, item.receivedValue)}
                            className="hover:bg-gray-100"
                            title="Copiar mensagem para suporte"
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
