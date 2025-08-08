export interface Product {
  id: string;
  title: string;
  price: number;
  stokBalance: number;
}

export interface CreateProductRequest {
  title: string;
  price: number;
  stokBalance: number;
}

export interface ReduceStockRequest {
  productId: string;
  amount: number;
} 