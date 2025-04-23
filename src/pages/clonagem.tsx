import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { SidebarToggle } from "@/components/ui/sidebar-toggle";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Barcode, Copy, ExternalLink, RefreshCw, Search } from "lucide-react";

export default function ClonagemAnuncios() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [mlbCode, setMlbCode] = useState("");
  const [productLink, setProductLink] = useState("");
  const [barcodeInput, setBarcodeInput] = useState("");

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulação de pesquisa
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Clonagem de Anúncios - Anye Parts</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-72" : ""}`}>
          <SidebarToggle isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="container mx-auto py-6 px-4 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Clonagem de Anúncios</h1>
                <p className="text-gray-500">Clone anúncios de concorrentes em poucos cliques.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Encontrar Produtos para Clonar</CardTitle>
                    <CardDescription>
                      Busque produtos por MLB, link ou código de barras para clonar.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="mlb">
                      <TabsList className="grid grid-cols-3 mb-4">
                        <TabsTrigger value="mlb">MLB</TabsTrigger>
                        <TabsTrigger value="link">Link</TabsTrigger>
                        <TabsTrigger value="barcode">Código de Barras</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="mlb" className="space-y-4">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Digite o código MLB (ex: MLB1234567890)"
                            value={mlbCode}
                            onChange={(e) => setMlbCode(e.target.value)}
                          />
                          <Button 
                            onClick={handleSearch}
                            disabled={!mlbCode || isSearching}
                          >
                            {isSearching ? (
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Search className="mr-2 h-4 w-4" />
                            )}
                            Buscar
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500">
                          O código MLB é o identificador único de produtos no Mercado Livre.
                          Ex: MLB1234567
                        </p>
                      </TabsContent>
                      
                      <TabsContent value="link" className="space-y-4">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Cole o link do anúncio"
                            value={productLink}
                            onChange={(e) => setProductLink(e.target.value)}
                          />
                          <Button 
                            onClick={handleSearch}
                            disabled={!productLink || isSearching}
                          >
                            {isSearching ? (
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <ExternalLink className="mr-2 h-4 w-4" />
                            )}
                            Buscar
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500">
                          Cole o link completo de um anúncio do Mercado Livre.
                        </p>
                      </TabsContent>
                      
                      <TabsContent value="barcode" className="space-y-4">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Digite ou escaneie o código de barras"
                            value={barcodeInput}
                            onChange={(e) => setBarcodeInput(e.target.value)}
                          />
                          <Button 
                            onClick={handleSearch}
                            disabled={!barcodeInput || isSearching}
                          >
                            {isSearching ? (
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Barcode className="mr-2 h-4 w-4" />
                            )}
                            Buscar
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500">
                          Use o código de barras para encontrar produtos similares.
                        </p>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Clonagem em Lote</CardTitle>
                    <CardDescription>
                      Faça upload de uma lista de produtos para clonar em massa.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        id="batch-upload"
                        type="file"
                        className="hidden"
                        accept=".xlsx,.xls,.csv"
                      />
                      <Copy className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Arraste e solte um arquivo ou clique para selecionar
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Formatos aceitos: .xlsx, .xls, .csv
                      </p>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button>
                        Iniciar Clonagem em Lote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Clonagem Rápida</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">O que é possível clonar?</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Incluído
                          </Badge>
                          <span>Título do anúncio</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Incluído
                          </Badge>
                          <span>Descrição do produto</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Incluído
                          </Badge>
                          <span>Atributos e especificações</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Incluído
                          </Badge>
                          <span>Categorias</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            Opcional
                          </Badge>
                          <span>Preço (ajustável)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            Não incluído
                          </Badge>
                          <span>Imagens (direitos autorais)</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Últimos produtos clonados</h3>
                      <div className="space-y-2 text-xs">
                        <div className="p-2 rounded bg-gray-50">
                          <div className="font-medium">Filtro de Ar K&N 33-2480</div>
                          <div className="text-gray-500">MLB2903887553 • 10 min atrás</div>
                        </div>
                        <div className="p-2 rounded bg-gray-50">
                          <div className="font-medium">Kit Pastilha de Freio Bosch BP1234</div>
                          <div className="text-gray-500">MLB8876554321 • 25 min atrás</div>
                        </div>
                        <div className="p-2 rounded bg-gray-50">
                          <div className="font-medium">Óleo Motul 5100 4T 15W50</div>
                          <div className="text-gray-500">MLB5566778899 • 2 horas atrás</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Ver histórico completo
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Dicas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Ajuste o preço</h3>
                      <p className="text-xs text-gray-500">
                        Analise o mercado antes de definir seu preço. Um produto competitivo vende mais.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Revise as descrições</h3>
                      <p className="text-xs text-gray-500">
                        Personalize as descrições para melhorar a identidade da sua marca.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Use suas próprias imagens</h3>
                      <p className="text-xs text-gray-500">
                        Substitua as imagens por fotos originais do produto para evitar problemas.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
