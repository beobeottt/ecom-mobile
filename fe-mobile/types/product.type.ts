export interface ProductVariant {
  id?: string;
  label: string;
  price: number;
  quantity: number;
  sku?: string;
  image?: string;
}

export interface Product {
  ProductId: string;
  ProductName: string;
  description: string;
  price: number;
  brand: string;
  quantity: number;
  imgUrl?: string;
  images?: string[];
  category: string;
  rating: number;
  sold: number;
  discount: number;
  variants?: ProductVariant[];
}