
import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { SidebarToggle } from "@/components/ui/sidebar-toggle";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUp, AlertCircle, RefreshCw, Download, FileSpreadsheet } from "lucide-react";

export default function ConsultaEmMassa() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const uploadedFile = e.dataTransfer.files[0];
      setFile(uploadedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulação de upload
    setTimeout(() => {
      setIsUploading(false);
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Consulta em Massa - Anye Parts</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-72" : ""}`}>
          <SidebarToggle isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="container mx-auto py-6 px-4 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Consulta em Massa</h1>
                <p className="text-gray-500">Faça upload de códigos de barras para consulta em massa.</p>
              </div>
              
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button size="sm" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Baixar Modelo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload de Planilha</CardTitle>
                    <CardDescription>
                      Faça o upload de uma planilha Excel ou CSV contendo códigos de barras dos produtos.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
                        dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".xlsx,.xls,.csv"
                        onChange={handleFileChange}
                      />
                      <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-4 text-sm text-gray-600">
                        {file
                          ? `Arquivo selecionado: ${file.name}`
                          : "Arraste e solte um arquivo ou clique para selecionar"}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        Formatos aceitos: .xlsx, .xls, .csv
                      </p>
                    </div>

                    {file && (
                      <div className="mt-4">
                        <Button 
                          onClick={handleUpload} 
                          disabled={isUploading} 
                          className="w-full"
                        >
                          {isUploading ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              Processando...
                            </>
                          ) : (
                            <>
                              <FileSpreadsheet className="mr-2 h-4 w-4" />
                              Iniciar Consulta
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                    
                    <Alert className="mt-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Importante</AlertTitle>
                      <AlertDescription>
                        Os resultados podem variar dependendo da disponibilidade de dados nos marketplaces.
                        Para melhores resultados, utilize códigos de barras válidos e atualizados.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Consulta por Lista</CardTitle>
                    <CardDescription>
                      Adicione uma lista de códigos de barras separados por vírgula ou por linha.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      placeholder="Cole aqui os códigos de barras, um por linha ou separados por vírgula."
                      className="min-h-[150px]"
                    />
                  </CardContent>
                  <CardFooter>
                    <Button>Consultar</Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Instruções</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium">1. Prepare sua planilha</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Organize os códigos de barras dos produtos em uma planilha Excel ou CSV.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium">2. Faça o upload</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Arraste e solte o arquivo ou selecione-o através do botão.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium">3. Inicie a consulta</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Após o upload, clique em "Iniciar Consulta" para começar o processo.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium">4. Analise os resultados</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Os resultados mostrarão o giro dos produtos nos marketplaces.
                      </p>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-medium">Modelo de planilha</h3>
                      <p className="text-sm text-gray-500 mt-1 mb-2">
                        Baixe nosso modelo para garantir o formato correto.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Baixar Modelo
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Histórico de Consultas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <div>
                        <div className="font-medium">consulta_12042023.xlsx</div>
                        <div className="text-xs text-gray-500">12/04/2023 - 14:35</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <div>
                        <div className="font-medium">produtos_marketplace.xlsx</div>
                        <div className="text-xs text-gray-500">10/04/2023 - 09:22</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <div>
                        <div className="font-medium">codigos_barras.csv</div>
                        <div className="text-xs text-gray-500">05/04/2023 - 16:40</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
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
