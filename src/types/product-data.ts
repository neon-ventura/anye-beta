
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
    type?: string;
    gtin?: string;
    available_quantity?: number;
    seller: {
      address: {
        state: string
      },
      nickname: string
    }
  };
}

export interface UseProductDataProps {
  searchTerm?: string;
  cep?: string;
}
