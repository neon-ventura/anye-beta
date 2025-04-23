
import { Product } from "@/types";
import { Button } from "./ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import { ArrowUpDown, ChevronUp, ChevronDown, Info } from "lucide-react";

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

  console.log("ProductTableContent rendered, produtos:", products.length, "carregando:", isLoading);

  return (
    <div className="relative w-full overflow-x-auto bg-white rounded-md border">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-xs">
          <tr>
            <th className="w-10 px-4 py-3">
              <Checkbox aria-label="Selecionar todos" />
            </th>
            {columnVisibility.image && <th className="w-20 px-4 py-3">Imagem</th>}
            {columnVisibility.title && (
              <th onClick={() => onRequestSort('title')} className="cursor-pointer hover:bg-gray-100 px-4 py-3">
                <div className="flex items-center">
                  Título {getSortIcon('title')}
                </div>
              </th>
            )}
            {columnVisibility.price && (
              <th onClick={() => onRequestSort('price')} className="cursor-pointer hover:bg-gray-100 px-4 py-3">
                <div className="flex items-center">
                  Preço {getSortIcon('price')}
                </div>
              </th>
            )}
            {columnVisibility.sales && (
              <th onClick={() => onRequestSort('sales')} className="cursor-pointer hover:bg-gray-100 px-4 py-3">
                <div className="flex items-center">
                  Vendas {getSortIcon('sales')}
                </div>
              </th>
            )}
            {columnVisibility.daysToSell && (
              <th onClick={() => onRequestSort('daysToSell')} className="cursor-pointer hover:bg-gray-100 px-4 py-3">
                <div className="flex items-center">
                  Dias p/ Vender {getSortIcon('daysToSell')}
                </div>
              </th>
            )}
            {columnVisibility.shipping && (
              <th onClick={() => onRequestSort('shipping')} className="cursor-pointer hover:bg-gray-100 px-4 py-3">
                <div className="flex items-center">
                  Frete {getSortIcon('shipping')}
                </div>
              </th>
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
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
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
                    <span className="text-sm">{product.title}</span>
                    {product.gtin && <div className="text-xs text-gray-500 mt-1">GTIN: {product.gtin}</div>}
                  </td>
                )}
                {columnVisibility.price && (
                  <td className="px-4 py-3">
                    <span className="font-medium">{formatPrice(product.price)}</span>
                  </td>
                )}
                {columnVisibility.sales && (
                  <td className="px-4 py-3 text-center">{product.sales}</td>
                )}
                {columnVisibility.daysToSell && (
                  <td className="px-4 py-3 text-center">{product.daysToSell}</td>
                )}
                {columnVisibility.shipping && (
                  <td className="px-4 py-3 text-center">{formatPrice(product.shipping)}</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
