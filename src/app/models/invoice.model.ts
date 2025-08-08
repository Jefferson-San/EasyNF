export interface InvoiceItem {
  id: string;
  productId: string;
  productTitle: string;
  price: number;
  amount: number;
  subtotal: number;
}

export interface Invoice {
  id: string;
  items: InvoiceItem[];
  total: number;
  itemCount: number;
  createdAt: Date;
}

export interface CreateInvoiceRequest {
  items: {
    id: string;
    amount: number;
  }[];
} 