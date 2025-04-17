export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categories: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
}

export interface IProductCreate {
  name: string;
  description: string;
  price: number;
  stock: number;
  categories: string[];
  images: string[];
  isActive?: boolean;
}

export interface IProductUpdate {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categories?: string[];
  images?: string[];
  isActive?: boolean;
}

export interface IProductReview {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    fullName: string;
    avatarUrl?: string;
  };
}

export interface IProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'rating';
  search?: string;
  page?: number;
  limit?: number;
} 