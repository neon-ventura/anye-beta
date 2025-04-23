
import { useState } from "react";
import { Product } from "@/types";
import { decodeBase64 } from "@/utils/base64";
import { transformApiDataToProduct } from "@/utils/transform-product";
import { useToast } from "./use-toast";

export const useProductStream = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const processStream = async (
    reader: ReadableStreamDefaultReader<Uint8Array>,
    onBatchProcessed: (batch: Product[]) => void
  ) => {
    const BATCH_SIZE = 5;
    let buffer = '';
    let batch: Product[] = [];
    let totalProcessed = 0;
    
    const processAndUpdateBatch = () => {
      if (batch.length > 0) {
        // Clone the batch to ensure we're passing a new array reference
        const batchToProcess = [...batch];
        onBatchProcessed(batchToProcess);
        console.log(`Batch processed: ${batch.length} products. Total so far: ${totalProcessed}`);
        batch = [];
      }
    };
    
    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          // Process any remaining items in the batch
          processAndUpdateBatch();
          console.log('Stream complete. Final total:', totalProcessed, 'products');
          return totalProcessed;
        }

        const textDecoder = new TextDecoder('utf-8');
        const chunk = textDecoder.decode(value);
        buffer += chunk;
        
        const lines = buffer.split('\n').filter(line => line.trim());
        buffer = lines.pop() || '';
        
        for (const line of lines) {
          try {
            let jsonData;
            try {
              jsonData = line.startsWith('{') ? JSON.parse(line) : JSON.parse(decodeBase64(line));
            } catch (decodeError) {
              console.error('Error decoding line:', decodeError);
              continue;
            }
            
            const product = transformApiDataToProduct(jsonData);
            if (product) {
              batch.push(product);
              totalProcessed++;

              // Force batch processing whenever we reach the batch size
              if (batch.length >= BATCH_SIZE) {
                processAndUpdateBatch();
              }
            }
          } catch (e) {
            console.error('Error processing line:', e);
          }
        }
      }
    } catch (error) {
      console.error('Error processing stream:', error);
      throw error;
    }
  };

  return {
    isLoading,
    setIsLoading,
    processStream,
  };
};
