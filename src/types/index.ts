export interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  minStock: number;
  price: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  productId: string;
  productName: string;
  type: 'in' | 'out';
  quantity: number;
  note: string;
  date: string;
}

export interface StockAdjustment {
  productId: string;
  quantity: number;
  type: 'in' | 'out';
  note: string;
}
