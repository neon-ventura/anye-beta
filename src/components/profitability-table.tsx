
import { useState } from "react";
import { ProfitabilityData } from "@/types";
import { Button } from "./ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Eye, Percent, ArrowDown, ArrowUp, DollarSign, Calculator, Trophy } from "lucide-react";
import { formatPrice } from "@/lib/format";

interface ProfitabilityTableProps {
  data: ProfitabilityData[];
}

export function ProfitabilityTable({ data }: ProfitabilityTableProps) {
  const [selectedItem, setSelectedItem] = useState<ProfitabilityData | null>(null);
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [suggestedPrice, setSuggestedPrice] = useState<number | null>(null);
  
  const handleShowSuggestion = (item: ProfitabilityData) => {
    setSelectedItem(item);
    // Calculate a realistic suggested price that's 7% less than current price
    setSuggestedPrice(item.fullPrice * 0.93);
    setShowSuggestionModal(true);
  };
  
  return (
    <>
      <div className="table-container">
        <table className="product-table">
          <thead className="bg-gray-50 text-xs">
            <tr>
              <th className="min-w-[300px]">Produto</th>
              <th>Preço Cheio</th>
              <th>Margem</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const marginPercentage = (item.finalMargin / item.fullPrice) * 100;
              const marginStatus = marginPercentage > 20 ? "positive" : marginPercentage > 10 ? "neutral" : "negative";
              
              return (
                <tr key={item.id} className="border-b row-hover">
                  <td className="font-medium">
                    <span className="text-sm">{item.product}</span>
                  </td>
                  <td>
                    <span className="font-medium">{formatPrice(item.fullPrice)}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full 
                        ${marginStatus === "positive" ? "bg-green-500" : marginStatus === "neutral" ? "bg-yellow-500" : "bg-red-500"}`} 
                      />
                      <span className="font-medium">{formatPrice(item.finalMargin)}</span>
                      <span className="text-sm text-gray-500">({marginPercentage.toFixed(1)}%)</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedItem(item)}
                          >
                            <Eye className="w-4 h-4 mr-2" /> Detalhes
                          </Button>
                        </DialogTrigger>
                        {selectedItem && (
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Detalhes de Lucratividade</DialogTitle>
                              <DialogDescription>
                                Análise detalhada da lucratividade do produto
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-4 py-4">
                              <h3 className="font-medium text-lg">{selectedItem.product}</h3>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="border rounded-lg p-4 bg-gray-50">
                                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                    <DollarSign className="w-4 h-4" /> Preço Cheio
                                  </div>
                                  <div className="text-lg font-medium">
                                    {formatPrice(selectedItem.fullPrice)}
                                  </div>
                                </div>
                                
                                <div className="border rounded-lg p-4 bg-gray-50">
                                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                    <ArrowDown className="w-4 h-4 text-red-500" /> Tarifa Marketplace
                                  </div>
                                  <div className="text-lg font-medium text-red-600">
                                    - {formatPrice(selectedItem.marketplaceFee)}
                                  </div>
                                </div>
                                
                                <div className="border rounded-lg p-4 bg-gray-50">
                                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                    <Percent className="w-4 h-4" /> Preço Promocional
                                  </div>
                                  <div className="text-lg font-medium">
                                    {formatPrice(selectedItem.promotionalPrice)}
                                  </div>
                                </div>
                                
                                <div className="border rounded-lg p-4 bg-gray-50">
                                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                    <ArrowDown className="w-4 h-4 text-red-500" /> Desconto Aplicado
                                  </div>
                                  <div className="text-lg font-medium text-red-600">
                                    {selectedItem.discount > 0 ? `- ${formatPrice(selectedItem.discount)}` : "Sem desconto"}
                                  </div>
                                </div>
                                
                                <div className="border rounded-lg p-4 bg-gray-50">
                                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                    <ArrowDown className="w-4 h-4 text-red-500" /> Custo do Produto
                                  </div>
                                  <div className="text-lg font-medium text-red-600">
                                    - {formatPrice(selectedItem.productCost)}
                                  </div>
                                </div>
                                
                                <div className="border rounded-lg p-4 bg-gray-50 border-green-200 bg-green-50">
                                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                    <Calculator className="w-4 h-4 text-green-500" /> Margem Final
                                  </div>
                                  <div className="text-lg font-medium text-green-600">
                                    {formatPrice(selectedItem.finalMargin)}
                                    <span className="text-sm ml-2">
                                      ({((selectedItem.finalMargin / selectedItem.fullPrice) * 100).toFixed(1)}%)
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <DialogFooter className="sm:justify-start">
                              <Button type="button" variant="outline">
                                Exportar
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        )}
                      </Dialog>
                      
                      <Button 
                        size="sm"
                        onClick={() => handleShowSuggestion(item)}
                        className="bg-yellow-500 hover:bg-yellow-600"
                      >
                        <Percent className="w-4 h-4 mr-2" /> Sugestão
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Dialog open={showSuggestionModal} onOpenChange={setShowSuggestionModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sugestão do Mercado Livre</DialogTitle>
            <DialogDescription>
              Nova precificação sugerida pelo algoritmo do Mercado Livre
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {selectedItem && suggestedPrice && (
              <>
                <h3 className="font-medium text-lg">{selectedItem.product}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <DollarSign className="w-4 h-4" /> Preço Atual
                    </div>
                    <div className="text-lg font-medium">
                      {formatPrice(selectedItem.fullPrice)}
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <DollarSign className="w-4 h-4 text-yellow-600" /> Preço Sugerido
                    </div>
                    <div className="text-lg font-medium text-yellow-700 animate-pulse">
                      {formatPrice(suggestedPrice)}
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <Percent className="w-4 h-4 text-blue-600" /> Rebate Meli
                    </div>
                    <div className="text-lg font-medium text-blue-600">
                      {formatPrice((selectedItem.fullPrice - suggestedPrice) * 0.5)}
                    </div>
                    <div className="text-xs text-blue-500">
                      50% do desconto aplicado
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <Calculator className="w-4 h-4 text-green-600" /> Nova Margem
                    </div>
                    {/* Calculate new margin based on suggested price, product cost, and marketplace fee */}
                    {(() => {
                      const discount = selectedItem.fullPrice - suggestedPrice;
                      const rebate = discount * 0.5; // 50% rebate on discount
                      const newMarketplaceFee = suggestedPrice * 0.15; // Assuming 15% marketplace fee
                      const newMargin = suggestedPrice - newMarketplaceFee - selectedItem.productCost + rebate;
                      const newMarginPercentage = (newMargin / suggestedPrice) * 100;
                      
                      return (
                        <div className="text-lg font-medium text-green-600">
                          {formatPrice(newMargin)}
                          <span className="text-sm ml-2">
                            ({newMarginPercentage.toFixed(1)}%)
                          </span>
                        </div>
                      );
                    })()}
                  </div>

                  <div className="border rounded-lg p-4 bg-orange-50 border-orange-200">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <ArrowUp className="w-4 h-4 text-orange-500" /> Impacto nas Vendas
                    </div>
                    <div className="text-lg font-medium text-orange-600">
                      +22%
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-[#ffe600]/10 border-[#ffe600]">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <Trophy className="w-4 h-4 text-[#ffe600]" /> Benefício Extra
                    </div>
                    <div className="text-md font-medium text-gray-700 flex items-center">
                      <span className="animate-pulse mr-1">●</span> Vítrine exclusiva
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button type="button" variant="outline" onClick={() => setShowSuggestionModal(false)}>
              Ignorar
            </Button>
            <Button type="button" className="bg-yellow-500 hover:bg-yellow-600">
              Aceitar Sugestão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
