
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Mail, User } from "lucide-react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login - in a real app, this would connect to Supabase
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard or handle login logic
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img 
            src="/lovable-uploads/818b35ee-24e9-4855-8059-1d704df40f4c.png" 
            alt="Anye Parts Logo" 
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
          <p className="text-gray-500">Faça login para continuar</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Acesse sua conta usando email e senha ou continue com Mercado Livre
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Telefone</TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemplo@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Senha</Label>
                      <a 
                        href="#" 
                        className="text-xs text-blue-500 hover:text-blue-700"
                      >
                        Esqueceu a senha?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="phone">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Número de telefone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+55 (11) 99999-9999"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-phone">Senha</Label>
                    <Input
                      id="password-phone"
                      type="password"
                      placeholder="********"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="relative my-6">
              <Separator />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                ou continue com
              </span>
            </div>

            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <img src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.1/mercadolibre/favicon.svg" alt="Mercado Livre" className="h-5 w-5" />
              Continuar com Mercado Livre
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <p className="text-sm text-gray-500">
              Não tem uma conta?{" "}
              <a href="#" className="text-blue-500 hover:text-blue-700 font-medium">
                Cadastre-se
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
