import { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { SidebarToggle } from "@/components/ui/sidebar-toggle";
import { Helmet } from "react-helmet-async";
import { ProductTable } from "@/components/product-table";
import { ProductTableActions } from "@/components/product-table-actions";
import { useToast } from "@/hooks/use-toast";
import { MarketplaceSelector } from "@/components/marketplace-selector";
import { ApiKeyModal } from "@/components/api-key-modal";
import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";
import { useProductData } from "@/hooks/use-product-data";
export default function Produtos() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [selectedMarketplace, setSelectedMarketplace] = useState<"mercadolivre" | "shopee">("mercadolivre");
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [cep, setCep] = useState("36900040");
  const [isCepLocked, setIsCepLocked] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    image: true,
    title: true,
    price: true,
    sales: true,
    daysToSell: false,
    shipping: false,
    fees: false,
    receivable: false,
    type: false,
    gtin: false,
    location: false,
    seller: false
  });
  const {
    toast
  } = useToast();
  const {
    products,
    filteredProducts,
    setFilteredProducts,
    isLoading,
    isStreamComplete,
    currentPage,
    setCurrentPage,
    ITEMS_PER_PAGE,
    fetchProducts,
    totalFound
  } = useProductData();
  useEffect(() => {
    console.log("Current state on products page:", {
      products: products.length,
      filteredProducts: filteredProducts.length,
      isLoading,
      isStreamComplete,
      currentPage,
      totalFound
    });
  }, [products, filteredProducts, isLoading, isStreamComplete, currentPage, totalFound]);
  const handleSearch = () => {
    if (!cep) {
      toast({
        title: "CEP necessary",
        description: "Please enter a valid CEP before performing the search.",
        variant: "destructive"
      });
      return;
    }
    fetchProducts(searchTerm, cep);
    setIsCepLocked(true);
  };
  const handleCepChange = (value: string) => {
    setCep(value);
  };
  const toggleCepLock = () => {
    setIsCepLocked(!isCepLocked);
  };
  const handleProductSelect = (productId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    }
  };
  const handleColumnVisibilityChange = (column: string, visible: boolean) => {
    setColumnVisibility(prev => ({
      ...prev,
      [column]: visible
    }));
  };
  const handleMarketplaceChange = (marketplace: "mercadolivre" | "shopee") => {
    setSelectedMarketplace(marketplace);
    toast({
      title: `Marketplace changed to ${marketplace === "mercadolivre" ? "Mercado Livre" : "Shopee"}`,
      description: "Updating product data...",
      duration: 2000
    });
    handleSearch();
  };
  return <>
      <Helmet>
        <title>Product Search - Anye Parts</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-80" : ""}`}>
          <SidebarToggle isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="container mx-auto py-6 px-4 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Pesquisa de Produtos</h1>
                <p className="text-muted-foreground mt-2">Descubra métricas, lucratividade e oportunidades em novos itens.</p>
              </div>
              <div className="flex items-center gap-2">
                <MarketplaceSelector value={selectedMarketplace} onChange={handleMarketplaceChange} />
                <Button variant="outline" size="sm" onClick={() => setShowApiKeyModal(true)} className="flex items-center gap-1">
                  <KeyRound className="h-4 w-4" />
                  Configure API
                </Button>
              </div>
            </div>

            <ProductTableActions selectedProducts={selectedProducts} searchTerm={searchTerm} onSearchChange={setSearchTerm} onSearch={handleSearch} isSearching={isLoading && !isStreamComplete} isAdvancedSearch={isAdvancedSearch} onAdvancedSearchChange={setIsAdvancedSearch} columnVisibility={columnVisibility} onColumnVisibilityChange={handleColumnVisibilityChange} cep={cep} onCepChange={handleCepChange} isCepLocked={isCepLocked} onToggleCepLock={toggleCepLock} />

            {products.length > 0 && <div className="text-sm text-gray-500 mt-2 mb-4">
                {filteredProducts.length} products found{isLoading && !isStreamComplete ? ' (loading more...)' : ''}
              </div>}

            <ProductTable onProductSelect={handleProductSelect} selectedProducts={selectedProducts} marketplace={selectedMarketplace} isAdvancedSearch={isAdvancedSearch} columnVisibility={columnVisibility} products={filteredProducts} isLoading={isLoading} isStreamComplete={isStreamComplete} currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={ITEMS_PER_PAGE} />
          </main>
        </div>
      </div>

      <ApiKeyModal open={showApiKeyModal} onOpenChange={setShowApiKeyModal} selectedMarketplace={selectedMarketplace} />
    </>;
}