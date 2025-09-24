export interface PriceItem {
  id: number;
  price: string;
  name: string;
  discount: string;
  'not-avaliable': string;
  novetly: string;
  ppk: string;
  'action-text': string;
  'price-wd': string;
  'in-basket': number;
  'action-all-label': string[];
}

export interface Product {
  action: string[];
  'all-not-available': number;
  'special-offer': number;
  'product-special-offer-text': string;
  'special-offer-faso-text': string;
  'special-offer-text': string;
  'in-favorites': boolean;
  'label-text': string;
  'label-color': string;
  'label-text-color': string;
  items: Record<string, boolean>;
  prices: PriceItem[];
  url: string;
  compare: boolean;
  'min-price': string;
}

interface Catalog {
  goods: Product[];
}

interface PageProps {
  catalog: Catalog;
}

export interface ApiResponse {
  menuData: unknown[];
  dataTranslations: Record<string, unknown>;
  dataBaseInfo: Record<string, unknown>;
  pageProps: PageProps;
  __N_SSP: boolean;
}
