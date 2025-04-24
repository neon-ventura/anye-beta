
export interface ApiProductData {
  type: string;
  data: {
    id: string;
    thumb: string;
    title: string;
    price: number;
    tts: number;
    sales_quantity: number;
    shipping_tax: number;
    listing_tax: number;
    leftover: number; // Added the missing leftover property
    type?: string;
    gtin?: string;
    available_quantity?: number;
    catalog_id?: string;
    logistic_type?: string;
    seller: {
      address: {
        state: string
      },
      nickname: string
    },
    permalink: string;
  };
}

export interface UseProductDataProps {
  searchTerm?: string;
  cep?: string;
}
