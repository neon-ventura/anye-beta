
import { Product } from "@/types";
import { ApiProductData } from "@/types/product-data";

export const transformApiDataToProduct = (jsonData: ApiProductData): Product | null => {
  try {
    if (jsonData.type === 'item' && jsonData.data) {
      const data = jsonData.data;
      
      return {
        id: data.id,
        image: data.thumb || "",
        title: data.title,
        price: data.price || 0,
        daysToSell: data.tts || 0,
        sales: data.sales_quantity || 0,
        shipping: data.shipping_tax || 0,
        fees: data.listing_tax || 0,
        receivable: (data.price || 0) - (data.listing_tax || 0),
        type: data.type || "Regular",
        gtin: data.gtin || "",
        location: data.seller?.address?.state || "",
        seller: data.seller?.nickname || "",
        catalog: false,
        stock: data.available_quantity || 0,
        productCost: (data.price || 0) * 0.5
      };
    }
    return null;
  } catch (e) {
    console.error('Error transforming product data:', e);
    return null;
  }
};
