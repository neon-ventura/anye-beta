import { AutoMessage, Compatibility, Integration, Product, ProfitabilityData, RevenueData, SalesStats, StockStats } from '@/types';

export const products: Product[] = [
  {
    id: "1",
    image: "/lovable-uploads/7eda923d-93cf-4253-82b3-0efe81249bf7.png",
    title: "Ventilador De Teto Spirit 202 Branco Lustre Globo 127v",
    price: 631.92,
    daysToSell: 5,
    sales: 100,
    stock: 3,
    shipping: 28.45,
    fees: 127.98,
    receivable: 475.49,
    type: "Peças",
    gtin: "7893698573283",
    location: "Queimados",
    seller: "SPIRITOFICIAL",
    catalog: false,
    productCost: 315.96
  },
  {
    id: "2",
    image: "/lovable-uploads/e707de88-d6d5-4a17-b327-23b4cb967639.png",
    title: "Ventilador De Teto Spirit Neevo2 Branco - 127v",
    price: 809.91,
    daysToSell: 5,
    sales: 100,
    stock: 11,
    shipping: 28.45,
    fees: 143.98,
    receivable: 637.48,
    type: "Peças",
    gtin: "7896771020551",
    location: "Queimados",
    seller: "SPIRITOFICIAL",
    catalog: false,
    productCost: 404.96
  },
  {
    id: "3",
    image: "/lovable-uploads/4f63fb43-122d-4cdc-bc94-47a79e851336.png",
    title: "Ventilador Torre Spirit Maxximos Tx1200 Branco Prata 127v",
    price: 719.92,
    daysToSell: 2,
    sales: 50,
    stock: 11,
    shipping: 44.45,
    fees: 143.98,
    receivable: 531.49,
    type: "Peças",
    gtin: "7899729177635",
    location: "Queimados",
    seller: "SPIRITOFICIAL",
    catalog: true,
    productCost: 359.96
  },
  {
    id: "4",
    image: "/lovable-uploads/f4c10ec7-9866-4af3-8667-1d0ddc75bdf7.png",
    title: "Ventilador De Teto Spirit 302 Branco Lustre Globo 127v",
    price: 719.92,
    daysToSell: 2,
    sales: 50,
    stock: 11,
    shipping: 28.45,
    fees: 143.98,
    receivable: 547.49,
    type: "Peças",
    gtin: "7898315540433",
    location: "Queimados",
    seller: "SPIRITOFICIAL",
    catalog: true,
    productCost: 359.96
  },
  {
    id: "5",
    image: "/lovable-uploads/5e795843-cf82-4e95-a883-6c554ec89fd5.png",
    title: "Ventilador De Teto Spirit Neevo3 Branco - 127v",
    price: 890.91,
    daysToSell: 9,
    sales: 50,
    stock: 5,
    shipping: 28.45,
    fees: 175.98,
    receivable: 686.48,
    type: "Peças",
    gtin: "7901886779031",
    location: "Queimados",
    seller: "SPIRITOFICIAL",
    catalog: false,
    productCost: 445.46
  },
  {
    id: "6",
    image: "/lovable-uploads/1f0e1cb7-b1e8-4726-9191-028c3befe867.png",
    title: "Ventilador Torre Spirit Maxximos Elegant Tx1200 Preto Prata 127v",
    price: 799.90,
    daysToSell: 351,
    sales: 35,
    stock: 11,
    shipping: 44.45,
    fees: 127.98,
    receivable: 627.47,
    type: "Full",
    gtin: "7899836916233",
    location: "São Paulo",
    seller: "JRMAGAZINES",
    catalog: true,
    productCost: 399.95
  },
  {
    id: "7",
    image: "/lovable-uploads/6d787cb0-e235-4e8e-975c-9a73adc4c8ec.png",
    title: "Ventilador Torre Spirit Tx900 Slim 90cm Preto Prata",
    price: 599.90,
    daysToSell: 11,
    sales: 25,
    stock: 11,
    shipping: 28.45,
    fees: 65.99,
    receivable: 505.46,
    type: "Full",
    gtin: "7899836916196",
    location: "São Paulo",
    seller: "JRMAGAZINES",
    catalog: true,
    productCost: 299.95
  },
];

export const integrations: Integration[] = [
  {
    id: "1",
    name: "Mercado Livre",
    icon: "marketplace",
    connected: true,
    description: "Integre seus produtos com o Mercado Livre"
  },
  {
    id: "2",
    name: "Amazon",
    icon: "amazon",
    connected: false,
    description: "Venda seus produtos na Amazon"
  },
  {
    id: "3",
    name: "Bling",
    icon: "bling",
    connected: true,
    description: "Sistema de gestão para e-commerce"
  },
  {
    id: "4",
    name: "Tiny",
    icon: "tiny",
    connected: false,
    description: "ERP para pequenas e médias empresas"
  },
  {
    id: "5",
    name: "Zapier",
    icon: "zapier",
    connected: true,
    description: "Automatize tarefas entre suas aplicações"
  },
];

export const profitabilityData: ProfitabilityData[] = [
  {
    id: "1",
    product: "Motor de Arranque Mitsubishi L200 2.5 Diesel 2006-2015",
    fullPrice: 1250.00,
    marketplaceFee: 125.00,
    promotionalPrice: 1199.90,
    discount: 50.10,
    productCost: 650.00,
    finalMargin: 424.90
  },
  {
    id: "2",
    product: "Bomba de Combustível Toyota Corolla 1.8 2010-2016",
    fullPrice: 890.00,
    marketplaceFee: 89.00,
    promotionalPrice: 849.90,
    discount: 40.10,
    productCost: 420.00,
    finalMargin: 340.90
  },
  {
    id: "3",
    product: "Kit Embreagem VW Gol 1.0 2010-2017",
    fullPrice: 750.00,
    marketplaceFee: 75.00,
    promotionalPrice: 699.90,
    discount: 50.10,
    productCost: 380.00,
    finalMargin: 244.90
  },
  {
    id: "4",
    product: "Radiador Honda Civic 1.8 2013-2017",
    fullPrice: 980.00,
    marketplaceFee: 98.00,
    promotionalPrice: 899.90,
    discount: 80.10,
    productCost: 450.00,
    finalMargin: 351.90
  },
  {
    id: "5",
    product: "Amortecedor Dianteiro Ford Ranger 2.2 2012-2019",
    fullPrice: 650.00,
    marketplaceFee: 65.00,
    promotionalPrice: 599.90,
    discount: 50.10,
    productCost: 280.00,
    finalMargin: 254.90
  }
];

export const compatibilities: Compatibility[] = [
  {
    id: "1",
    product: "Filtro de Óleo PH6017A",
    brand: "Ford",
    model: "Fiesta",
    year: "2008-2014",
    engine: "1.6",
    compatibility: "Compatível"
  },
  {
    id: "2",
    product: "Filtro de Óleo PH6017A",
    brand: "Volkswagen",
    model: "Gol",
    year: "2009-2015",
    engine: "1.6",
    compatibility: "Compatível"
  },
  {
    id: "3",
    product: "Filtro de Óleo PH6017A",
    brand: "Chevrolet",
    model: "Celta",
    year: "2007-2015",
    engine: "1.0",
    compatibility: "Não compatível"
  },
];

export const autoMessages: AutoMessage[] = [
  {
    id: "1",
    type: "absence",
    name: "Mensagem de férias",
    message: "Estamos em férias coletivas de 20/12 a 05/01. Retornaremos em seguida!",
    active: false,
    triggers: ["purchase"]
  },
  {
    id: "2",
    type: "auto_reply",
    name: "Agradecimento pós-compra",
    message: "Obrigado pela compra! Seu item será enviado em até 24h úteis.",
    active: true,
    triggers: ["purchase"]
  },
  {
    id: "3",
    type: "auto_reply",
    name: "Resposta sobre garantia",
    message: "Todos os nossos produtos possuem garantia de 3 meses. Para mais informações, consulte os termos no manual.",
    active: true,
    triggers: ["question", "warranty"]
  },
];

export const revenueData: RevenueData[] = [
  { date: "Jan", amount: 12500 },
  { date: "Fev", amount: 14000 },
  { date: "Mar", amount: 13200 },
  { date: "Abr", amount: 15400 },
  { date: "Mai", amount: 17800 },
  { date: "Jun", amount: 16500 },
  { date: "Jul", amount: 19200 },
];

export const salesStats: SalesStats = {
  totalSales: 1250,
  growth: 12.5,
  averageTicket: 725.90,
  topProducts: [
    { name: "Ventilador De Teto Spirit 202", sales: 120 },
    { name: "Ventilador Torre Spirit Maxximos", sales: 87 },
    { name: "Ventilador De Teto Spirit Neevo2", sales: 65 },
  ]
};

export const stockStats: StockStats = {
  totalItems: 845,
  lowStock: 32,
  outOfStock: 15,
  mostStocked: [
    { name: "Ventilador De Teto Spirit 202", stock: 87 },
    { name: "Ventilador Torre Spirit Maxximos", stock: 65 },
    { name: "Ventilador De Teto Spirit Neevo2", stock: 42 },
  ]
};
