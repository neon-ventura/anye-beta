export interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  daysToSell: number;
  sales: number;
  stock: number;
  shipping: number;
  fees: number;
  receivable: number;
  type: string;
  gtin: string;
  location: string;
  seller: string;
  catalog: boolean;
  productCost: number;
}

export interface Integration {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  description: string;
}

export interface AutoMessage {
  id: string;
  type: string;
  name: string;
  message: string;
  active: boolean;
  triggers: string[];
}

export interface ProfitabilityData {
  id: string;
  product: string;
  fullPrice: number;
  marketplaceFee: number;
  promotionalPrice: number;
  discount: number;
  productCost: number;
  finalMargin: number;
}

export interface Compatibility {
  id: string;
  product: string;
  brand: string;
  model: string;
  year: string;
  engine: string;
  compatibility: string;
}

export interface SalesStats {
  totalSales: number;
  growth: number;
  averageTicket: number;
  topProducts: { name: string; sales: number }[];
}

export interface StockStats {
  totalItems: number;
  lowStock: number;
  outOfStock: number;
  mostStocked: { name: string; stock: number }[];
}

export interface RevenueData {
  date: string;
  amount: number;
}
