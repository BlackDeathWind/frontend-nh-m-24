import { v4 as uuidv4 } from 'uuid';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface MockOrder {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
  paymentMethod: 'credit_card' | 'bank_transfer' | 'cod' | 'e_wallet';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mock data cho đơn hàng
export const mockOrders: MockOrder[] = [
  {
    id: uuidv4(),
    userId: 'mock-customer-id-789',
    customerName: 'Nguyễn Văn A',
    customerEmail: 'nguyenvana@example.com',
    customerPhone: '0901234567',
    shippingAddress: {
      street: '123 Đường Nguyễn Huệ',
      city: 'Quận 1',
      state: 'TP. Hồ Chí Minh',
      postalCode: '700000',
      country: 'Việt Nam'
    },
    items: [
      {
        productId: 'product-1',
        name: 'Bút bi cao cấp Montblanc',
        price: 150000,
        quantity: 2,
        subtotal: 300000
      },
      {
        productId: 'product-2',
        name: 'Sổ tay bìa da thật',
        price: 250000,
        quantity: 1,
        subtotal: 250000
      }
    ],
    totalAmount: 550000,
    status: 'completed',
    paymentMethod: 'credit_card',
    paymentStatus: 'paid',
    notes: 'Gửi hàng vào buổi sáng',
    createdAt: new Date('2023-10-15'),
    updatedAt: new Date('2023-10-16')
  },
  {
    id: uuidv4(),
    userId: 'mock-customer-id-456',
    customerName: 'Trần Thị B',
    customerEmail: 'tranthib@example.com',
    customerPhone: '0909876543',
    shippingAddress: {
      street: '456 Đường Lê Lợi',
      city: 'Quận 3',
      state: 'TP. Hồ Chí Minh',
      postalCode: '700000',
      country: 'Việt Nam'
    },
    items: [
      {
        productId: 'product-3',
        name: 'Bộ màu nước chuyên nghiệp',
        price: 320000,
        quantity: 1,
        subtotal: 320000
      },
      {
        productId: 'product-4',
        name: 'Kéo văn phòng cao cấp',
        price: 75000,
        quantity: 2,
        subtotal: 150000
      },
      {
        productId: 'product-5',
        name: 'Bút chì màu nghệ thuật',
        price: 180000,
        quantity: 1,
        subtotal: 180000
      }
    ],
    totalAmount: 650000,
    status: 'processing',
    paymentMethod: 'bank_transfer',
    paymentStatus: 'paid',
    createdAt: new Date('2023-10-15'),
    updatedAt: new Date('2023-10-15')
  },
  {
    id: uuidv4(),
    userId: 'mock-customer-id-123',
    customerName: 'Lê Văn C',
    customerEmail: 'levanc@example.com',
    customerPhone: '0912345678',
    shippingAddress: {
      street: '789 Đường Cách Mạng Tháng 8',
      city: 'Quận 10',
      state: 'TP. Hồ Chí Minh',
      postalCode: '700000',
      country: 'Việt Nam'
    },
    items: [
      {
        productId: 'product-1',
        name: 'Bút bi cao cấp Montblanc',
        price: 150000,
        quantity: 1,
        subtotal: 150000
      },
      {
        productId: 'product-6',
        name: 'Bộ thước kẻ kiến trúc',
        price: 95000,
        quantity: 1,
        subtotal: 95000
      }
    ],
    totalAmount: 245000,
    status: 'pending',
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    notes: 'Gọi điện trước khi giao hàng',
    createdAt: new Date('2023-10-14'),
    updatedAt: new Date('2023-10-14')
  },
  {
    id: uuidv4(),
    userId: 'mock-customer-id-789',
    customerName: 'Phạm Thị D',
    customerEmail: 'phamthid@example.com',
    customerPhone: '0987654321',
    shippingAddress: {
      street: '101 Đường Nguyễn Văn Linh',
      city: 'Quận 7',
      state: 'TP. Hồ Chí Minh',
      postalCode: '700000',
      country: 'Việt Nam'
    },
    items: [
      {
        productId: 'product-2',
        name: 'Sổ tay bìa da thật',
        price: 250000,
        quantity: 2,
        subtotal: 500000
      },
      {
        productId: 'product-8',
        name: 'Bút lông viết thư pháp',
        price: 125000,
        quantity: 3,
        subtotal: 375000
      }
    ],
    totalAmount: 875000,
    status: 'cancelled',
    paymentMethod: 'e_wallet',
    paymentStatus: 'refunded',
    notes: 'Khách hàng đã hủy đơn',
    createdAt: new Date('2023-10-13'),
    updatedAt: new Date('2023-10-14')
  }
]; 