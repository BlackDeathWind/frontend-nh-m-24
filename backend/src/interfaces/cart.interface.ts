export interface ICartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICart {
  id: string;
  userId: string;
  cartItems?: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartItemCreate {
  productId: string;
  quantity: number;
}

export interface ICartItemUpdate {
  quantity: number;
}

export interface ICartWithProducts extends ICart {
  cartItems: Array<ICartItem & {
    product: {
      id: string;
      name: string;
      price: number;
      stock: number;
      images: string[];
      slug: string;
    }
  }>;
  totalItems: number;
  totalAmount: number;
} 