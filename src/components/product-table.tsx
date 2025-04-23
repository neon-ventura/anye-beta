
import { Product } from "@/types";
import { useState, useEffect } from "react";
import { ProductTableContent } from "./product-table-content";
import { ProductPriceModal } from "./product-price-modal";
import { ProductTablePagination } from "./product-table-pagination";
import { Progress } from "@/components/ui/progress";

interface ProductTableProps {
  onProductSelect?: (productId: string, isChecked: boolean, totalCount?: number, currentSearchTerm?: string) => void;
  selectedProducts?: string[];
  marketplace?: "mercadolivre" | "shopee";
  isAdvancedSearch?: boolean;
  columnVisibility: Record<string, boolean>;
  products: Product[];
  isLoading: boolean;
  isStreamComplete?: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
}

export function ProductTable({ 
  onProductSelect, 
  selectedProducts = [],
  marketplace = "mercadolivre",
  isAdvancedSearch = false,
  columnVisibility,
  products,
  isLoading,
  isStreamComplete = false,
  currentPage,
  setCurrentPage,
  itemsPerPage
}: ProductTableProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [suggestedPrice, setSuggestedPrice] = useState<number | null>(null);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product | null;
    direction: 'ascending' | 'descending' | null;
  }>({
    key: null,
    direction: null
  });

  // State to manage displayed products with pagination
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);

  // Update displayed products when the source products change or when pagination/sorting changes
  useEffect(() => {
    console.log("ProductTable received update, products:", products.length);
    
    // Apply sorting if needed
    const sortedProducts = applySort(products);
    
    // Calculate paginated products
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = sortedProducts.slice(startIndex, endIndex);
    
    setDisplayProducts(paginatedProducts);
    console.log("Products for display:", paginatedProducts.length);
  }, [products, currentPage, itemsPerPage, sortConfig]);

  // Apply sorting to products when necessary
  const applySort = (productsToSort: Product[]) => {
    if (!sortConfig.key || !sortConfig.direction) {
      return productsToSort;
    }
    
    return [...productsToSort].sort((a, b) => {
      if (a[sortConfig.key!] === null || b[sortConfig.key!] === null) return 0;
      
      if (typeof a[sortConfig.key!] === 'number' && typeof b[sortConfig.key!] === 'number') {
        return sortConfig.direction === 'ascending' 
          ? (a[sortConfig.key!] as number) - (b[sortConfig.key!] as number)
          : (b[sortConfig.key!] as number) - (a[sortConfig.key!] as number);
      }
      
      if (typeof a[sortConfig.key!] === 'string' && typeof b[sortConfig.key!] === 'string') {
        return sortConfig.direction === 'ascending'
          ? (a[sortConfig.key!] as string).localeCompare(b[sortConfig.key!] as string)
          : (b[sortConfig.key!] as string).localeCompare(a[sortConfig.key!] as string);
      }
      
      return 0;
    });
  };

  const handleCheckboxChange = (productId: string, isChecked: boolean) => {
    if (onProductSelect) {
      onProductSelect(productId, isChecked, products.length, "");
    }
  };

  const openPriceModal = (product: Product) => {
    setSelectedProduct(product);
    const discount = product.price * (Math.random() * 0.1 + 0.05);
    setSuggestedPrice(product.price - discount);
    setShowPriceModal(true);
  };

  const requestSort = (key: keyof Product) => {
    let direction: 'ascending' | 'descending' | null = 'ascending';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = null;
      }
    }
    
    setSortConfig({ key, direction });
  };

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <>
      {isLoading && !isStreamComplete && products.length > 0 && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1 text-sm">
            <span>Loading products...</span>
            <span>{products.length} loaded so far</span>
          </div>
          <Progress value={80} className="h-1" />
        </div>
      )}

      <ProductTableContent
        products={displayProducts}
        selectedProducts={selectedProducts}
        onProductSelect={handleCheckboxChange}
        onOpenPriceModal={openPriceModal}
        sortConfig={sortConfig}
        onRequestSort={requestSort}
        isAdvancedSearch={isAdvancedSearch}
        columnVisibility={columnVisibility}
        isLoading={isLoading && products.length === 0} // Only show loading state when no products are available yet
        totalCount={products.length}
      />

      <ProductTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <ProductPriceModal
        open={showPriceModal}
        onOpenChange={setShowPriceModal}
        product={selectedProduct}
        suggestedPrice={suggestedPrice}
      />
    </>
  );
}
