
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Filter, Download, Plus, Search, Info, Columns, Lock } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductTableActionsProps {
  selectedProducts: string[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  isSearching: boolean;
  isAdvancedSearch?: boolean;
  onAdvancedSearchChange?: (value: boolean) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  columnVisibility: Record<string, boolean>;
  onColumnVisibilityChange: (column: string, visible: boolean) => void;
  cep: string;
  onCepChange: (value: string) => void;
  isCepLocked: boolean;
  onToggleCepLock: () => void;
}

export function ProductTableActions({
  selectedProducts = [],
  searchTerm,
  onSearchChange,
  onSearch,
  isSearching,
  isAdvancedSearch = false,
  onAdvancedSearchChange,
  onEdit,
  onDelete,
  columnVisibility,
  onColumnVisibilityChange,
  cep,
  onCepChange,
  isCepLocked,
  onToggleCepLock
}: ProductTableActionsProps) {
  
  const columns = [
    { key: 'image', label: 'Imagem' },
    { key: 'title', label: 'Título' },
    { key: 'price', label: 'Preço' },
    { key: 'daysToSell', label: 'Tempo para Vender' },
    { key: 'sales', label: 'Vendas' },
    { key: 'shipping', label: 'Frete' },
    { key: 'fees', label: 'Taxas' },
    { key: 'receivable', label: 'Recebível' },
    { key: 'type', label: 'Tipo' },
    { key: 'gtin', label: 'GTIN/EAN' },
    { key: 'location', label: 'Localidade' },
    { key: 'seller', label: 'Vendedor' },
  ];
  
  return (
    <div className="mb-6 rounded-md border bg-white shadow">
      <div className="p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full max-w-lg items-center space-x-2">
            <Input
              placeholder="Nome do produto, GTIN, etc."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              className="h-9"
            />
            <div className="relative">
              <Input
                placeholder="CEP"
                value={cep}
                onChange={(e) => !isCepLocked && onCepChange(e.target.value.replace(/\D/g, '').slice(0, 8))}
                className="h-9 w-32"
                disabled={isCepLocked}
                maxLength={8}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2"
                onClick={onToggleCepLock}
              >
                {isCepLocked ? <Lock size={14} /> : <Search size={14} />}
              </Button>
            </div>
            <Button 
              type="submit" 
              size="sm"
              onClick={onSearch}
              disabled={isSearching}
            >
              {isSearching ? (
                <>
                  <span className="animate-spin mr-1">⏳</span>
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-1" />
                  Buscar
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {onAdvancedSearchChange && (
              <div className="flex items-center space-x-2">
                <Switch
                  id="advanced-search"
                  checked={isAdvancedSearch}
                  onCheckedChange={onAdvancedSearchChange}
                />
                <label
                  htmlFor="advanced-search"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Pesquisa Avançada
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Compara preços do mercado com seu custo ERP. Ideal para processos de compra e análise de competitividade.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Columns className="mr-2 h-4 w-4" />
                  Colunas
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                {columns.map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.key}
                    className="capitalize"
                    checked={columnVisibility[column.key]}
                    onCheckedChange={(value) =>
                      onColumnVisibilityChange(column.key, value)
                    }
                  >
                    {column.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {selectedProducts.length > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {selectedProducts.length} selecionado(s)
                </span>
                {onEdit && (
                  <Button variant="outline" size="sm" onClick={onEdit}>
                    Editar
                  </Button>
                )}
                {onDelete && (
                  <Button variant="destructive" size="sm" onClick={onDelete}>
                    Excluir
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Filter className="h-4 w-4 mr-1" />
                  Filtros
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-1" />
                  Exportar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
