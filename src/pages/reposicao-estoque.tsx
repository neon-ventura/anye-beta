import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { SidebarToggle } from "@/components/ui/sidebar-toggle";
import { Helmet } from "react-helmet-async";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Download, 
  Filter, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  ShoppingCart,
  Search,
  FileDown
} from "lucide-react";
import { formatPrice, formatNumber } from "@/lib/format";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const lowStockItems = [
  {
    id: "1",
    name: "Kit Filtro de Ar Honda Civic",
    sku: "FIL-AR-HC-001",
    stock: 3,
    minStock: 10,
    turnover: 8.5,
    salesTrend: 12.3,
    mainChannel: "Mercado Livre",
    price: 89.90,
    restockCost: 62.50,
    estimatedArrival: "5 dias"
  },
  {
    id: "2",
    name: "Jogo de Velas de Ignição Toyota Corolla",
    sku: "VEL-IG-TC-002",
    stock: 5,
    minStock: 15,
    turnover: 6.2,
    salesTrend: -2.5,
    mainChannel: "Shopee",
    price: 129.90,
    restockCost: 85.00,
    estimatedArrival: "7 dias"
  },
  {
    id: "3",
    name: "Correia Dentada Volkswagen Gol",
    sku: "COR-DEN-VG-003",
    stock: 2,
    minStock: 8,
    turnover: 9.8,
    salesTrend: 18.7,
    mainChannel: "Mercado Livre",
    price: 74.50,
    restockCost: 48.90,
    estimatedArrival: "3 dias"
  },
  {
    id: "4",
    name: "Kit Reparo da Bomba d'água Fiat Uno",
    sku: "REP-BDA-FU-004",
    stock: 4,
    minStock: 12,
    turnover: 5.4,
    salesTrend: 8.1,
    mainChannel: "Amazon",
    price: 112.30,
    restockCost: 75.20,
    estimatedArrival: "10 dias"
  },
  {
    id: "5",
    name: "Filtro de Óleo Hyundai HB20",
    sku: "FIL-OL-HH-005",
    stock: 1,
    minStock: 10,
    turnover: 11.2,
    salesTrend: 22.5,
    mainChannel: "Mercado Livre",
    price: 42.80,
    restockCost: 28.50,
    estimatedArrival: "2 dias"
  }
];

export default function ReposicaoEstoque() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    minStock: "",
    maxStock: "",
    channel: "all",
    turnover: "all"
  });

  const [filteredItems, setFilteredItems] = useState(lowStockItems);

  const applyFilters = () => {
    let filtered = [...lowStockItems];

    if (filters.search) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.sku.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.minStock) {
      filtered = filtered.filter(item => item.stock >= parseInt(filters.minStock));
    }

    if (filters.maxStock) {
      filtered = filtered.filter(item => item.stock <= parseInt(filters.maxStock));
    }

    if (filters.channel !== "all") {
      filtered = filtered.filter(item => item.mainChannel === filters.channel);
    }

    if (filters.turnover !== "all") {
      filtered = filtered.filter(item => {
        if (filters.turnover === "high") return item.turnover >= 8;
        if (filters.turnover === "medium") return item.turnover >= 4 && item.turnover < 8;
        return item.turnover < 4;
      });
    }

    setFilteredItems(filtered);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const selectedProducts = filteredItems.filter(item => selectedItems.includes(item.id));
    
    // Add header
    doc.setFontSize(20);
    doc.text("Solicitação de Reposição de Estoque", 14, 20);
    doc.setFontSize(12);
    doc.text(`Data: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Total de Itens: ${selectedProducts.length}`, 14, 40);

    // Create table
    autoTable(doc, {
      head: [['SKU', 'Produto', 'Estoque Atual', 'Estoque Mínimo', 'Custo', 'Canal Principal']],
      body: selectedProducts.map(item => [
        item.sku,
        item.name,
        item.stock.toString(),
        item.minStock.toString(),
        formatPrice(item.restockCost),
        item.mainChannel
      ]),
      startY: 50,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [155, 135, 245] }
    });

    // Add total at the bottom
    const total = selectedProducts.reduce((acc, item) => acc + item.restockCost, 0);
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.text(`Custo Total Estimado: ${formatPrice(total)}`, 14, finalY);

    // Save the PDF
    doc.save('reposicao-estoque.pdf');
  };

  return (
    <>
      <Helmet>
        <title>Reposição de Estoque - Anye Parts</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-72" : ""}`}>
          <SidebarToggle isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Reposição de Estoque</h1>
                <p className="text-gray-500">Itens que precisam ser repostos com urgência.</p>
              </div>
              
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={generatePDF}
                  disabled={selectedItems.length === 0}
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  Exportar PDF
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => console.log("Solicitando reposição:", selectedItems)} 
                  disabled={selectedItems.length === 0}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Solicitar Reposição ({selectedItems.length})
                </Button>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <Input
                      placeholder="Buscar por nome ou SKU"
                      value={filters.search}
                      onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="Estoque Mínimo"
                      value={filters.minStock}
                      onChange={(e) => setFilters(prev => ({ ...prev, minStock: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="Estoque Máximo"
                      value={filters.maxStock}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxStock: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Select value={filters.channel} onValueChange={(value) => setFilters(prev => ({ ...prev, channel: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Canal de Venda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os Canais</SelectItem>
                        <SelectItem value="Mercado Livre">Mercado Livre</SelectItem>
                        <SelectItem value="Shopee">Shopee</SelectItem>
                        <SelectItem value="Amazon">Amazon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select value={filters.turnover} onValueChange={(value) => setFilters(prev => ({ ...prev, turnover: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Giro de Estoque" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="high">Alto Giro (&gt;8)</SelectItem>
                        <SelectItem value="medium">Médio Giro (4-8)</SelectItem>
                        <SelectItem value="low">Baixo Giro (&lt;4)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button onClick={applyFilters} size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Aplicar Filtros
                  </Button>
                </div>
              </div>

              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Produtos com estoque abaixo do mínimo: <strong>{lowStockItems.length}</strong>
                    </div>
                  </div>
                </div>
                
                <div className="table-container">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedItems(lowStockItems.map(item => item.id));
                              } else {
                                setSelectedItems([]);
                              }
                            }}
                            checked={selectedItems.length === lowStockItems.length && lowStockItems.length > 0}
                          />
                        </TableHead>
                        <TableHead>Produto</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead className="text-center">Estoque</TableHead>
                        <TableHead className="text-center">Mínimo</TableHead>
                        <TableHead>Giro</TableHead>
                        <TableHead>Tendência</TableHead>
                        <TableHead>Canal Principal</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Custo Reposição</TableHead>
                        <TableHead>Chegada Est.</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems.map((item) => (
                        <TableRow key={item.id} className="border-b row-hover">
                          <TableCell>
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              checked={selectedItems.includes(item.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedItems([...selectedItems, item.id]);
                                } else {
                                  setSelectedItems(selectedItems.filter(id => id !== item.id));
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="text-xs text-gray-500">{item.sku}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="destructive">{item.stock}</Badge>
                          </TableCell>
                          <TableCell className="text-center text-gray-500">{item.minStock}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="font-medium">{item.turnover}</span>
                              <span className="text-xs text-gray-500 ml-1">un/mês</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {item.salesTrend > 0 ? (
                                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                              )}
                              <span className={item.salesTrend > 0 ? "text-green-500" : "text-red-500"}>
                                {item.salesTrend > 0 ? "+" : ""}{item.salesTrend}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              item.mainChannel === "Mercado Livre" ? "border-yellow-500 bg-yellow-50 text-yellow-700" :
                              item.mainChannel === "Shopee" ? "border-orange-500 bg-orange-50 text-orange-700" :
                              "border-blue-500 bg-blue-50 text-blue-700"
                            }>
                              {item.mainChannel}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatPrice(item.price)}</TableCell>
                          <TableCell>{formatPrice(item.restockCost)}</TableCell>
                          <TableCell className="text-center">{item.estimatedArrival}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" className="h-8 px-2 py-1">
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
