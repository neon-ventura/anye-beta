
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { Search, Columns } from "lucide-react";
import { ProductTablePagination } from "@/components/product-table-pagination";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type MyListing = {
  id: string;
  sku: string; // Changed from erpId to sku
  title: string;
  gtin: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  marketplaceCode: string;
  salesCount: number;
  image: string;
}

interface MeusAnunciosTableProps {
  marketplace: "mercadolivre" | "shopee";
}

export function MeusAnunciosTable({ marketplace }: MeusAnunciosTableProps) {
  const [listings, setListings] = useState<MyListing[]>([]);
  const [filteredListings, setFilteredListings] = useState<MyListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState({
    image: false,
    sku: true, // Changed from erpId to sku
    title: true,
    gtin: true,
    costPrice: true,
    sellingPrice: true,
    currentStock: true,
    marketplaceCode: true,
    salesCount: true,
  });

  // Mock data for demonstration
  useEffect(() => {
    setIsLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      const mockListings: MyListing[] = Array.from({ length: 20 }).map((_, i) => ({
        id: `listing-${i + 1}`,
        sku: `SKU-${10000 + i}`, // Changed from erpId to sku
        title: `Peça Automotiva ${i + 1} ${marketplace === "mercadolivre" ? "ML" : "Shopee"}`,
        gtin: Math.floor(Math.random() * 9000000000000 + 1000000000000).toString(),
        costPrice: Math.floor(Math.random() * 500) + 50,
        sellingPrice: Math.floor(Math.random() * 1000) + 200,
        currentStock: Math.floor(Math.random() * 100),
        marketplaceCode: `${marketplace.substring(0, 2).toUpperCase()}-${i + 1000}`,
        salesCount: Math.floor(Math.random() * 50),
        image: "https://via.placeholder.com/50",
      }));
      
      setListings(mockListings);
      setFilteredListings(mockListings);
      setIsLoading(false);
    }, 800);
  }, [marketplace]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredListings(listings);
    } else {
      const filtered = listings.filter(listing => 
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        listing.gtin.includes(searchTerm) ||
        listing.sku.includes(searchTerm) // Changed from erpId to sku
      );
      setFilteredListings(filtered);
    }
    setCurrentPage(1);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedListings = filteredListings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const columns = [
    { key: 'image', label: 'Imagem' },
    { key: 'sku', label: 'SKU' }, // Changed from erpId to sku
    { key: 'title', label: 'Nome' },
    { key: 'gtin', label: 'GTIN' },
    { key: 'costPrice', label: 'Preço de Custo' },
    { key: 'sellingPrice', label: 'Preço de Venda' },
    { key: 'currentStock', label: 'Estoque' },
    { key: 'marketplaceCode', label: 'Código Marketplace' },
    { key: 'salesCount', label: 'Vendas' },
  ];

  return (
    <div className="rounded-md border bg-white shadow">
      <div className="p-4 border-b">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              placeholder="Buscar por nome, GTIN ou SKU" // Updated placeholder text
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button type="submit" onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
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
                  checked={columnVisibility[column.key as keyof typeof columnVisibility]}
                  onCheckedChange={(value) =>
                    setColumnVisibility((prev) => ({ ...prev, [column.key]: value }))
                  }
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="relative overflow-auto">
        <Table>
          <TableHeader className="bg-gray-50 text-xs">
            <TableRow>
              {columns.map((column) => (
                columnVisibility[column.key as keyof typeof columnVisibility] && (
                  <TableHead key={column.key}>{column.label}</TableHead>
                )
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={Object.values(columnVisibility).filter(Boolean).length} className="h-24 text-center">
                  Carregando anúncios...
                </TableCell>
              </TableRow>
            ) : paginatedListings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={Object.values(columnVisibility).filter(Boolean).length} className="h-24 text-center">
                  Nenhum anúncio encontrado.
                </TableCell>
              </TableRow>
            ) : (
              paginatedListings.map((listing) => (
                <TableRow key={listing.id} className="border-b hover:bg-gray-50">
                  {columnVisibility.image && (
                    <TableCell>
                      <img src={listing.image} alt={listing.title} className="w-10 h-10 object-contain" />
                    </TableCell>
                  )}
                  {columnVisibility.sku && <TableCell>{listing.sku}</TableCell>} {/* Changed from erpId to sku */}
                  {columnVisibility.title && <TableCell className="font-medium">{listing.title}</TableCell>}
                  {columnVisibility.gtin && <TableCell className="text-xs text-gray-500">{listing.gtin}</TableCell>}
                  {columnVisibility.costPrice && <TableCell>{formatPrice(listing.costPrice)}</TableCell>}
                  {columnVisibility.sellingPrice && <TableCell>{formatPrice(listing.sellingPrice)}</TableCell>}
                  {columnVisibility.currentStock && <TableCell>{listing.currentStock}</TableCell>}
                  {columnVisibility.marketplaceCode && <TableCell>{listing.marketplaceCode}</TableCell>}
                  {columnVisibility.salesCount && <TableCell>{listing.salesCount}</TableCell>}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="p-4 border-t">
        <ProductTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
