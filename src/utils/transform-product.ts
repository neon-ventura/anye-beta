
import { Product } from "@/types";
import { ApiProductData } from "@/types/product-data";

export const transformApiDataToProduct = (jsonData: ApiProductData): Product | null => {
  try {
    if (jsonData.type === 'item' && jsonData.data) {
      const data = jsonData.data;
      
      // Map logistic_type to display type
      let type = "cross_docking";
      switch (data.logistic_type) {
        case "fulfillment":
          type = "FULL";
          break;
        case "cross_docking":
          type = "CROSS";
          break;
        case "xd_drop_off":
          type = "drop-off";
          break;
      }
      
      return {
        id: data.id,
        image: data.thumb || "",
        title: data.title,
        price: data.price || 0,
        daysToSell: data.tts || 0,
        sales: data.sales_quantity || 0,
        shipping: data.shipping_tax || 0,
        fees: data.listing_tax || 0,
        receivable: data.leftover || 0,
        type,
        gtin: data.gtin || "",
        location: data.seller?.address?.state || "",
        seller: data.seller?.nickname || "",
        sellerPermalink: data.seller?.nickname 
          ? `https://loja.mercadolivre.com.br/${data.seller.nickname.toLowerCase()}` 
          : "",
        catalog: false,
        stock: data.available_quantity || 0,
        productCost: (data.price || 0) * 0.5,
        mlb: data.id || "MLB não encontrado",
        permalink: data.permalink || ""
      };
    }
    return null;
  } catch (e) {
    console.error('Error transforming product data:', e);
    return null;
  }
};
