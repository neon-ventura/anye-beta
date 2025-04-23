
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { formatPrice } from "@/lib/format";
import { DollarSign, Tag, ArrowUp } from "lucide-react";

interface ProductPriceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  suggestedPrice: number | null;
}

export function ProductPriceModal({ 
  open, 
  onOpenChange, 
  product, 
  suggestedPrice 
}: ProductPriceModalProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sugestão de Preço</DialogTitle>
          <DialogDescription>
            O marketplace sugere uma alteração de preço para aumentar suas vendas
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <h3 className="font-medium text-lg">{product.title}</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <DollarSign className="w-4 h-4" /> Preço Atual
              </div>
              <div className="text-lg font-medium">
                {formatPrice(product.price)}
              </div>
            </div>
            
            <div className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Tag className="w-4 h-4 text-yellow-600" /> Preço Sugerido
              </div>
              <div className="text-lg font-medium text-yellow-700">
                {suggestedPrice ? formatPrice(suggestedPrice) : "-"}
              </div>
            </div>
            
            <div className="border rounded-lg p-4 bg-green-50 border-green-200">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <ArrowUp className="w-4 h-4 text-green-600" /> Vendas Estimadas
              </div>
              <div className="text-lg font-medium text-green-600">
                +{Math.floor(Math.random() * 30 + 20)}%
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Aplicar Preço
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
