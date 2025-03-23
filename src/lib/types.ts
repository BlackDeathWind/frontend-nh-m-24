export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  stock: number;
  rating: number;
  reviews: number;
  features?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating-desc';
} 