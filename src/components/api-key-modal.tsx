
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useApiKeys } from "@/hooks/use-api-keys";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag, ShoppingCart, Link, Key, KeyRound } from "lucide-react";

interface ApiKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMarketplace: "mercadolivre" | "shopee";
}

export function ApiKeyModal({ open, onOpenChange, selectedMarketplace }: ApiKeyModalProps) {
  const { toast } = useToast();
  const { apiKeys, setApiKey } = useApiKeys();
  const [accessToken, setAccessToken] = useState(apiKeys[selectedMarketplace]?.accessToken || "");
  const [clientId, setClientId] = useState(apiKeys[selectedMarketplace]?.clientId || "");
  const [clientSecret, setClientSecret] = useState(apiKeys[selectedMarketplace]?.clientSecret || "");
  const [scrapelessApiKey, setScrapelessApiKey] = useState(apiKeys.scrapeless || "");

  // Update form values when marketplace changes
  useEffect(() => {
    setAccessToken(apiKeys[selectedMarketplace]?.accessToken || "");
    setClientId(apiKeys[selectedMarketplace]?.clientId || "");
    setClientSecret(apiKeys[selectedMarketplace]?.clientSecret || "");
  }, [selectedMarketplace, apiKeys]);

  const handleSave = () => {
    // Save API keys
    setApiKey(selectedMarketplace, {
      accessToken,
      clientId,
      clientSecret
    });
    
    // Save Scrapeless API key separately
    setApiKey("scrapeless", scrapelessApiKey);

    toast({
      title: "Configurações salvas",
      description: `As chaves de API para ${selectedMarketplace === "mercadolivre" ? "Mercado Livre" : "Shopee"} foram atualizadas com sucesso.`,
      duration: 3000,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            Configurar Chaves de API
          </DialogTitle>
          <DialogDescription>
            Configure as chaves de API necessárias para integração com os marketplaces.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2 mb-2">
            {selectedMarketplace === "mercadolivre" ? (
              <ShoppingCart className="h-5 w-5 text-yellow-500" />
            ) : (
              <ShoppingBag className="h-5 w-5 text-orange-500" />
            )}
            <h3 className="text-md font-medium">
              {selectedMarketplace === "mercadolivre" ? "Mercado Livre" : "Shopee"}
            </h3>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="access_token">Access Token</Label>
            <Input
              id="access_token"
              placeholder="Digite o access token"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="client_id">Client ID</Label>
              <Input
                id="client_id"
                placeholder="Digite o Client ID"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="client_secret">Client Secret</Label>
              <Input
                id="client_secret"
                type="password"
                placeholder="Digite o Client Secret"
                value={clientSecret}
                onChange={(e) => setClientSecret(e.target.value)}
              />
            </div>
          </div>
          
          <div className="border-t my-2 pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Link className="h-5 w-5 text-blue-500" />
              <h3 className="text-md font-medium">Scrapeless API (para Shopee)</h3>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="scrapeless_api">API Key</Label>
              <Input
                id="scrapeless_api"
                placeholder="Digite a API Key da Scrapeless"
                value={scrapelessApiKey}
                onChange={(e) => setScrapelessApiKey(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
