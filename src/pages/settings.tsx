
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "@/components/sidebar";
import { SidebarToggle } from "@/components/ui/sidebar-toggle";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiKeyModal } from "@/components/api-key-modal";
import { useApiKeys } from "@/hooks/use-api-keys";
import { MarketplaceSelector } from "@/components/marketplace-selector";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Mail, Phone, User2 } from "lucide-react";
import { cn } from "@/lib/utils"; // Added this import

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [selectedMarketplace, setSelectedMarketplace] = useState<"mercadolivre" | "shopee">("mercadolivre");
  const { apiKeys, hasValidApiKeys, hasScrapelessApiKey } = useApiKeys();

  return (
    <>
      <Helmet>
        <title>Configurações - Anye Parts</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-80" : ""}`}>
          <SidebarToggle isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="container mx-auto py-6 px-4 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
                <p className="text-muted-foreground">Gerencie as configurações da sua conta e integrações</p>
              </div>
            </div>

            <Tabs defaultValue="integration" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="integration">Integrações</TabsTrigger>
                <TabsTrigger value="billing">Faturamento</TabsTrigger>
                <TabsTrigger value="notifications">Notificações</TabsTrigger>
                <TabsTrigger value="account">Conta</TabsTrigger>
              </TabsList>

              <TabsContent value="integration" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Integrações de Marketplace</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex flex-col gap-4">
                        <Label>Selecione o Marketplace</Label>
                        <div className="flex items-center gap-4">
                          <MarketplaceSelector 
                            value={selectedMarketplace} 
                            onChange={setSelectedMarketplace} 
                          />
                          
                          <Button 
                            onClick={() => setShowApiKeyModal(true)}
                            variant={hasValidApiKeys(selectedMarketplace) ? "outline" : "default"}
                          >
                            {hasValidApiKeys(selectedMarketplace) ? 'Atualizar chaves API' : 'Configurar chaves API'}
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-2">Status das chaves API</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-gray-50 rounded-md">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">Mercado Livre</span>
                              <span className={`text-sm px-2 py-1 rounded-full ${hasValidApiKeys('mercadolivre') ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {hasValidApiKeys('mercadolivre') ? 'Configurado' : 'Não configurado'}
                              </span>
                            </div>
                          </div>

                          <div className="p-4 bg-gray-50 rounded-md">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">Shopee</span>
                              <span className={`text-sm px-2 py-1 rounded-full ${hasValidApiKeys('shopee') ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {hasValidApiKeys('shopee') ? 'Configurado' : 'Não configurado'}
                              </span>
                            </div>
                          </div>

                          <div className="p-4 bg-gray-50 rounded-md">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">Scrapeless API</span>
                              <span className={`text-sm px-2 py-1 rounded-full ${hasScrapelessApiKey() ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {hasScrapelessApiKey() ? 'Configurado' : 'Não configurado'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Preferências</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="company-name">Nome da Empresa</Label>
                          <Input id="company-name" defaultValue="Anye Parts" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="contato@anyeparts.com.br" className="mt-1" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" /> Plano Atual
                    </CardTitle>
                    <CardDescription>
                      Gerencie seu plano e assinatura
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="border-2 border-gray-200">
                          <CardHeader className="bg-gray-50">
                            <CardTitle className="text-center">Básico</CardTitle>
                            <CardDescription className="text-center font-semibold text-lg">R$ 59/mês</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center">
                                <CheckIcon className="mr-2" /> Até 100 produtos
                              </li>
                              <li className="flex items-center">
                                <CheckIcon className="mr-2" /> 1 Marketplace
                              </li>
                              <li className="flex items-center">
                                <CheckIcon className="mr-2" /> Suporte por email
                              </li>
                            </ul>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full">Selecionar</Button>
                          </CardFooter>
                        </Card>

                        <Card className="border-2 border-blue-500 relative">
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            Seu Plano
                          </div>
                          <CardHeader className="bg-blue-50">
                            <CardTitle className="text-center">Padrão</CardTitle>
                            <CardDescription className="text-center font-semibold text-lg">R$ 129/mês</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center">
                                <CheckIcon className="mr-2" /> Até 1.000 produtos
                              </li>
                              <li className="flex items-center">
                                <CheckIcon className="mr-2" /> 3 Marketplaces
                              </li>
                              <li className="flex items-center">
                                <CheckIcon className="mr-2" /> Suporte prioritário
                              </li>
                              <li className="flex items-center">
                                <CheckIcon className="mr-2" /> Conciliação financeira
                              </li>
                            </ul>
                          </CardContent>
                          <CardFooter>
                            <Button className="w-full" disabled>Plano Atual</Button>
                          </CardFooter>
                        </Card>

                        <Card className="border-2 border-gray-200">
                          <CardHeader className="bg-gray-50">
                            <CardTitle className="text-center">Premium</CardTitle>
                            <CardDescription className="text-center font-semibold text-lg">R$ 299/mês</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center">
                                <CheckIcon className="mr-2" /> Produtos ilimitados
                              </li>
                              <li className="flex items-center">
                                <CheckIcon className="mr-2" /> Todos os Marketplaces
                              </li>
                              <li className="flex items-center">
                                <CheckIcon className="mr-2" /> Suporte 24/7
                              </li>
                              <li className="flex items-center">
                                <CheckIcon className="mr-2" /> Acesso antecipado a novos recursos
                              </li>
                            </ul>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full">Fazer Upgrade</Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cupom de Desconto</CardTitle>
                    <CardDescription>
                      Aplique um cupom para obter desconto em sua assinatura
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Input placeholder="Insira o código do cupom" />
                      <Button>Aplicar</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Convidar Amigos</CardTitle>
                    <CardDescription>
                      Convide amigos e ganhe descontos em sua assinatura
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>Compartilhe seu código de indicação e ganhe 10% de desconto por cada amigo que se inscrever.</p>
                      <div className="flex gap-2 items-center">
                        <Input value="ANYEPARTS-REF-123456" readOnly />
                        <Button variant="outline">Copiar</Button>
                      </div>
                      <p className="text-sm text-muted-foreground">Você tem 0 indicações até o momento.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" /> Configurações de Notificações
                    </CardTitle>
                    <CardDescription>
                      Escolha como deseja receber notificações do sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Estoque Baixo</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-5 w-5" />
                              <Label htmlFor="email-notification">Email</Label>
                            </div>
                            <Switch id="email-notification" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
                            <div className="flex items-center space-x-2">
                              <Phone className="h-5 w-5" />
                              <Label htmlFor="sms-notification">SMS</Label>
                            </div>
                            <Switch id="sms-notification" />
                          </div>
                          <div className="flex items-center justify-between space-x-2 border p-4 rounded-md relative">
                            <div className="flex items-center space-x-2">
                              <Phone className="h-5 w-5" />
                              <Label htmlFor="whatsapp-notification">WhatsApp</Label>
                            </div>
                            <Badge className="absolute top-1 right-2 text-xs" variant="outline">Em breve</Badge>
                            <Switch id="whatsapp-notification" disabled />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Vendas</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-5 w-5" />
                              <Label htmlFor="email-sales">Email</Label>
                            </div>
                            <Switch id="email-sales" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
                            <div className="flex items-center space-x-2">
                              <Phone className="h-5 w-5" />
                              <Label htmlFor="sms-sales">SMS</Label>
                            </div>
                            <Switch id="sms-sales" />
                          </div>
                          <div className="flex items-center justify-between space-x-2 border p-4 rounded-md relative">
                            <div className="flex items-center space-x-2">
                              <Phone className="h-5 w-5" />
                              <Label htmlFor="whatsapp-sales">WhatsApp</Label>
                            </div>
                            <Badge className="absolute top-1 right-2 text-xs" variant="outline">Em breve</Badge>
                            <Switch id="whatsapp-sales" disabled />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Atualizações da Plataforma</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-5 w-5" />
                              <Label htmlFor="email-updates">Email</Label>
                            </div>
                            <Switch id="email-updates" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User2 className="h-5 w-5" /> Informações da Conta
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="account-name">Nome Completo</Label>
                          <Input id="account-name" defaultValue="João Silva" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="account-email">Email</Label>
                          <Input id="account-email" type="email" defaultValue="joao@anyeparts.com.br" className="mt-1" readOnly />
                        </div>
                        <div>
                          <Label htmlFor="account-phone">Telefone</Label>
                          <Input id="account-phone" defaultValue="+55 (11) 99999-9999" className="mt-1" />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Alterar Senha</h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <Label htmlFor="current-password">Senha Atual</Label>
                            <Input id="current-password" type="password" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="new-password">Nova Senha</Label>
                            <Input id="new-password" type="password" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                            <Input id="confirm-password" type="password" className="mt-1" />
                          </div>
                          <Button className="w-fit">Atualizar Senha</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>

      <ApiKeyModal
        open={showApiKeyModal}
        onOpenChange={setShowApiKeyModal}
        selectedMarketplace={selectedMarketplace}
      />
    </>
  );
}

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4 text-green-500", className)}
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
};
