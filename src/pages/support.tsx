
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "@/components/sidebar";
import { SidebarToggle } from "@/components/ui/sidebar-toggle";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Support() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = () => {
    setIsSending(true);
    // Simulando o envio da mensagem
    setTimeout(() => {
      setIsSending(false);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Suporte - Anye Parts</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-80" : ""}`}>
          <SidebarToggle isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="container mx-auto py-6 px-4 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Suporte</h1>
                <p className="text-muted-foreground">
                  Precisa de ajuda? Entre em contato com nossa equipe de suporte
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Entre em contato</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nome</Label>
                          <Input id="name" placeholder="Seu nome" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="seu.email@exemplo.com" className="mt-1" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="subject">Assunto</Label>
                        <Input id="subject" placeholder="Assunto da sua mensagem" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="message">Mensagem</Label>
                        <Textarea
                          id="message"
                          placeholder="Descreva detalhadamente como podemos ajudar..."
                          className="mt-1"
                          rows={5}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancelar</Button>
                    <Button onClick={handleSendMessage} disabled={isSending}>
                      {isSending ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Enviando...
                        </>
                      ) : (
                        "Enviar mensagem"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Informações de contato</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-muted-foreground">suporte@anyeparts.com.br</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Telefone</h3>
                        <p className="text-muted-foreground">(11) 3456-7890</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Horário de atendimento</h3>
                        <p className="text-muted-foreground">Segunda a sexta: 9h às 18h</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>FAQ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Como configurar minha API?</h3>
                        <p className="text-sm text-muted-foreground">
                          Acesse a página de configurações e insira suas chaves de API nos campos correspondentes.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium">Quanto tempo leva para sincronizar produtos?</h3>
                        <p className="text-sm text-muted-foreground">
                          A sincronização de produtos geralmente leva de 5 a 15 minutos, dependendo da quantidade.
                        </p>
                      </div>
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
