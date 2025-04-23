
import { Integration } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Layers, ShoppingCart, BarChart2, ServerCog, Zap } from "lucide-react";

interface IntegrationCardProps {
  integration: Integration;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
}

export function IntegrationCard({ integration, onConnect, onDisconnect }: IntegrationCardProps) {
  // Icons for each integration
  const getIcon = () => {
    switch (integration.icon) {
      case "marketplace":
        return <ShoppingCart className="h-6 w-6" />;
      case "amazon":
        return <ShoppingCart className="h-6 w-6" />;
      case "bling":
        return <ServerCog className="h-6 w-6" />;
      case "tiny":
        return <BarChart2 className="h-6 w-6" />;
      case "zapier":
        return <Zap className="h-6 w-6" />;
      default:
        return <Layers className="h-6 w-6" />;
    }
  };

  return (
    <Card className="w-full transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-gray-100 p-2">
              {getIcon()}
            </div>
            <CardTitle>{integration.name}</CardTitle>
          </div>
          {integration.connected ? (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Conectado</Badge>
          ) : (
            <Badge variant="outline" className="text-gray-500">Desconectado</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-600">
          {integration.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        {integration.connected ? (
          <Button 
            variant="outline"
            className="w-full"
            onClick={() => onDisconnect(integration.id)}
          >
            Desconectar
          </Button>
        ) : (
          <Button 
            className="w-full"
            onClick={() => onConnect(integration.id)}
          >
            Conectar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
