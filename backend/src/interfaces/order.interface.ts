export interface IOrder {
  id: string;
  userId: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: 'cod' | 'digital';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: Date;
  updatedAt: Date;
  orderItems?: IOrderItem[];
}

export interface IOrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  productName: string;
  productImage?: string;
}

export interface IOrderCreate {
  userId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  shippingAddress: string;
  paymentMethod: 'cod' | 'digital';
  notes?: string;
  digitalWallet?: 'momo' | 'zalopay' | 'vnpay';
}

export interface IOrderUpdate {
  status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus?: 'pending' | 'paid' | 'failed';
}

export interface IOrderWithUser extends IOrder {
  user: {
    id: string;
    email: string;
    fullName: string;
  };
} 