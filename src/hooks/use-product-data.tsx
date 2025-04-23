
import { useState, useEffect, useCallback } from "react";
import { Product } from "@/types";
import { useToast } from "./use-toast";
import { useProductStream } from "./use-product-stream";
import { UseProductDataProps } from "@/types/product-data";

export function useProductData({ searchTerm, cep }: UseProductDataProps = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFound, setTotalFound] = useState(0);
  const [isStreamComplete, setIsStreamComplete] = useState(false);
  const { toast } = useToast();
  const { isLoading, setIsLoading, processStream } = useProductStream();
  
  const ITEMS_PER_PAGE = 20;

  // Update filtered products whenever the main products array changes
  useEffect(() => {
    setFilteredProducts(products);
    console.log("Products state updated:", products.length, "products");
  }, [products]);

  // Callback to handle each batch of products as they arrive
  const handleBatchProcessed = useCallback((newBatch: Product[]) => {
    console.log(`Received new batch with ${newBatch.length} products, updating UI immediately`);
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts, ...newBatch];
      return updatedProducts;
    });
    setTotalFound(prev => prev + newBatch.length);
  }, []);

  const fetchProducts = async (query: string, postalCode: string) => {
    setIsLoading(true);
    setIsStreamComplete(false);
    setProducts([]); 
    setFilteredProducts([]);
    setCurrentPage(1);
    setTotalFound(0);
    
    console.log(`Starting search for: "${query}" with ZIP: ${postalCode}`);
    
    try {
      const url = `https://api.anye.com.br/search?q=${encodeURIComponent(query)}&cep=${encodeURIComponent(postalCode)}&stream=true`;
      console.log(`Calling API: ${url}`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status} - ${response.statusText}`);
      }
      
      const reader = response.body?.getReader();
      
      if (!reader) {
        throw new Error('Stream not supported');
      }

      const totalProcessed = await processStream(reader, handleBatchProcessed);
      setIsStreamComplete(true);
      
      if (totalProcessed === 0) {
        toast({
          title: "No products found",
          description: "Your search returned no results. Try different terms.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Search completed",
          description: `${totalProcessed} products found.`,
          variant: "default"
        });
      }
      
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsStreamComplete(true);
      
      let errorMessage = "Could not load products. Please try again.";
      if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
      }
      
      toast({
        title: "Error fetching products",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
}
