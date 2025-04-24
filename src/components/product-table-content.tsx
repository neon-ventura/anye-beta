import React from 'react';
import { Product } from "@/types";
import { Button } from "./ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import { ArrowUpDown, ChevronUp, ChevronDown, Info, Check, AlertTriangle, Package } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FullBadge } from './icons/full-badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProductTableContentProps {
  products: Product[];
  selectedProducts: string[];
  onProductSelect: (productId: string, checked: boolean) => void;
  onOpenPriceModal: (product: Product) => void;
  sortConfig: {
    key: keyof Product | null;
    direction: 'ascending' | 'descending' | null;
  };
  onRequestSort: (key: keyof Product) => void;
  isAdvancedSearch?: boolean;
  columnVisibility: Record<string, boolean>;
  isLoading: boolean;
  totalCount: number;
}

export function ProductTableContent({
  products,
  selectedProducts,
  onProductSelect,
  onOpenPriceModal,
  sortConfig,
  onRequestSort,
  isAdvancedSearch = false,
  columnVisibility,
  isLoading,
  totalCount
}: ProductTableContentProps) {
  const getSortIcon = (key: keyof Product) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4 ml-1 text-gray-400" />;
    }
    
    return sortConfig.direction === 'ascending' 
      ? <ChevronUp className="h-4 w-4 ml-1 text-primary" />
      : <ChevronDown className="h-4 w-4 ml-1 text-primary" />;
  };

  const getTypeDisplay = (type: string) => {
    switch (type) {
      case "FULL":
        return <FullBadge />;
      case "CROSS":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            CROSS
          </Badge>
        );
      case "drop-off":
        return (
          <Badge className="bg-orange-400 hover:bg-orange-500">
            Drop-off
          </Badge>
        );
      default:
        return type;
    }
  };

  const handleRowClick = (permalink: string) => {
    if (permalink) {
      window.open(permalink, '_blank');
    }
  };

  const handleSellerClick = (e: React.MouseEvent, permalink: string) => {
    e.stopPropagation();
    if (permalink) {
      window.open(permalink, '_blank');
    }
  };

  const truncateTitle = (title: string, maxLength: number = 25) => {
    return title.length > maxLength 
      ? `${title.slice(0, maxLength)}...` 
      : title;
  };

  const truncateSeller = (seller: string, maxLength: number = 15) => {
    return seller.length > maxLength 
      ? `${seller.slice(0, maxLength)}...` 
      : seller;
  };

  console.log("ProductTableContent rendered, produtos:", products.length, "carregando:", isLoading);
  
  if (products.length > 0) {
    console.log("Sample product daysToSell:", products[0].daysToSell);
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="relative w-full">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-xs">
            <tr>
              <th className="sticky left-0 z-10 bg-gray-50 w-10 px-4 py-3">
                <Checkbox aria-label="Selecionar todos" />
              </th>
              {columnVisibility.image && <th className="w-16 px-2 py-3">Imagem</th>}
              {columnVisibility.title && (
                <th onClick={() => onRequestSort('title')} className="cursor-pointer hover:bg-gray-100 px-2 py-3 min-w-[200px] max-w-[250px]">
                  <div className="flex items-center">
                    Título {getSortIcon('title')}
                  </div>
                </th>
              )}
              {columnVisibility.price && (
                <th onClick={() => onRequestSort('price')} className="cursor-pointer hover:bg-gray-100 px-2 py-3 w-24">
                  <div className="flex items-center">
                    Preço {getSortIcon('price')}
                  </div>
                </th>
              )}
              {columnVisibility.daysToSell && (
                <th onClick={() => onRequestSort('daysToSell')} className="cursor-pointer hover:bg-gray-100 px-2 py-3 w-24">
                  <div className="flex items-center whitespace-normal">
                    Tempo p/ Vender {getSortIcon('daysToSell')}
                  </div>
                </th>
              )}
              {columnVisibility.sales && (
                <th onClick={() => onRequestSort('sales')} className="cursor-pointer hover:bg-gray-100 px-2 py-3 w-20">
                  <div className="flex items-center">
                    Vendas {getSortIcon('sales')}
                  </div>
                </th>
              )}
              {columnVisibility.receivable && (
                <th onClick={() => onRequestSort('receivable')} className="cursor-pointer hover:bg-gray-100 px-2 py-3 w-24">
                  <div className="flex items-center">
                    Recebível {getSortIcon('receivable')}
                  </div>
                </th>
              )}
              {columnVisibility.seller && (
                <th onClick={() => onRequestSort('seller')} className="cursor-pointer hover:bg-gray-100 px-2 py-3 w-32">
                  <div className="flex items-center">
                    Vendedor {getSortIcon('seller')}
                  </div>
                </th>
              )}
              {columnVisibility.location && (
                <th onClick={() => onRequestSort('location')} className="cursor-pointer hover:bg-gray-100 px-2 py-3 w-32">
                  <div className="flex items-center">
                    Localidade {getSortIcon('location')}
                  </div>
                </th>
              )}
              {columnVisibility.shipping && (
                <th onClick={() => onRequestSort('shipping')} className="cursor-pointer hover:bg-gray-100 px-2 py-3 w-20">
                  <div className="flex items-center">
                    Frete {getSortIcon('shipping')}
                  </div>
                </th>
              )}
              {columnVisibility.mlb && (
                <th onClick={() => onRequestSort('mlb')} className="cursor-pointer hover:bg-gray-100 px-2 py-3 w-28">
                  <div className="flex items-center">
                    MLB {getSortIcon('mlb')}
                  </div>
                </th>
              )}
              {columnVisibility.type && (
                <th className="w-16 px-2 py-3">Tipo</th>
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={Object.values(columnVisibility).filter(Boolean).length + 1} className="text-center py-10">
                  <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mt-2">Buscando produtos...</p>
                  </div>
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={Object.values(columnVisibility).filter(Boolean).length + 1} className="text-center py-10">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    {totalCount > 0 ? (
                      <>
                        <Info className="h-6 w-6 mb-2" />
                        <p>Esta página não contém produtos. Navegue para outra página ou ajuste os filtros.</p>
                        <p className="text-xs mt-1">Total de produtos encontrados: {totalCount}</p>
                      </>
                    ) : (
                      <p>Nenhum produto encontrado. Realize uma pesquisa.</p>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr 
                  key={product.id} 
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(product.permalink)}
                >
                  <td 
                    className="px-4 py-3"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click when clicking checkbox
                    }}
                  >
                    <Checkbox 
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={(checked) => 
                        onProductSelect(product.id, checked as boolean)
                      }
                      aria-label={`Selecionar ${product.title}`}
                    />
                  </td>
                  {columnVisibility.image && (
                    <td className="px-4 py-3">
                      <img
                        src={product.image || 'https://via.placeholder.com/150'}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                        }}
                      />
                    </td>
                  )}
                  {columnVisibility.title && (
                    <td className="px-4 py-3 font-medium">
                      <span className="text-sm" title={product.title}>
                        {truncateTitle(product.title)}
                      </span>
                      {product.gtin && <div className="text-xs text-gray-500 mt-1">GTIN: {product.gtin}</div>}
                    </td>
                  )}
                  {columnVisibility.price && (
                    <td className="px-4 py-3">
                      <span className="font-medium">{formatPrice(product.price)}</span>
                    </td>
                  )}
                  {columnVisibility.daysToSell && (
                    <td className="px-4 py-3 text-center">{product.daysToSell}</td>
                  )}
                  {columnVisibility.sales && (
                    <td className="px-4 py-3 text-center">{product.sales}</td>
                  )}
                  {columnVisibility.receivable && (
                    <td className="px-4 py-3">
                      <span className="font-medium text-green-600">{formatPrice(product.receivable)}</span>
                    </td>
                  )}
                  {columnVisibility.seller && (
                    <td 
                      className="px-4 py-3"
                      onClick={(e) => handleSellerClick(e, product.sellerPermalink)}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-pointer">
                              {truncateSeller(product.seller)}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{product.seller}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                  )}
                  {columnVisibility.location && (
                    <td className="px-4 py-3">{product.location}</td>
                  )}
                  {columnVisibility.shipping && (
                    <td className="px-4 py-3 text-center">{formatPrice(product.shipping)}</td>
                  )}
                  {columnVisibility.mlb && (
                    <td className="px-4 py-3 text-center">{product.mlb}</td>
                  )}
                  {columnVisibility.type && (
                    <td className="px-4 py-3">{getTypeDisplay(product.type)}</td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
