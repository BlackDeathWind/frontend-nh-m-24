import { v4 as uuidv4 } from 'uuid';

export interface MockAdminProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'draft' | 'outOfStock';
  createdAt: string;
}

// Mock data sản phẩm cho trang quản lý admin
export const mockAdminProducts: MockAdminProduct[] = [
  {
    id: '1',
    name: 'Bút bi cao cấp',
    category: 'Bút viết',
    price: 30000,
    stock: 50,
    status: 'active',
    createdAt: '2023-09-15',
  },
  {
    id: '2',
    name: 'Sổ tay ghi chép',
    category: 'Sổ & Vở',
    price: 20000,
    stock: 100,
    status: 'active',
    createdAt: '2023-09-12',
  },
  {
    id: '3',
    name: 'Bút chì 2B',
    category: 'Bút viết',
    price: 5000,
    stock: 200,
    status: 'active',
    createdAt: '2023-09-10',
  },
  {
    id: '4',
    name: 'Kẹp giấy (hộp 100 cái)',
    category: 'Văn phòng phẩm',
    price: 10000,
    stock: 30,
    status: 'active',
    createdAt: '2023-09-05',
  },
  {
    id: '5',
    name: 'Bộ màu vẽ 24 màu',
    category: 'Dụng cụ vẽ',
    price: 45000,
    stock: 0,
    status: 'outOfStock',
    createdAt: '2023-08-28',
  },
  {
    id: '6',
    name: 'Giấy note (5 màu)',
    category: 'Văn phòng phẩm',
    price: 15000,
    stock: 80,
    status: 'active',
    createdAt: '2023-08-20',
  },
  {
    id: '7',
    name: 'Bút highlight (bộ 5 cái)',
    category: 'Bút viết',
    price: 40000,
    stock: 25,
    status: 'active',
    createdAt: '2023-08-15',
  },
  {
    id: '8',
    name: 'Thước kẻ 30cm',
    category: 'Văn phòng phẩm',
    price: 7000,
    stock: 120,
    status: 'active',
    createdAt: '2023-08-10',
  },
  {
    id: '9',
    name: 'Máy tính cầm tay',
    category: 'Văn phòng phẩm',
    price: 120000,
    stock: 15,
    status: 'active',
    createdAt: '2023-08-05',
  },
  {
    id: '10',
    name: 'Băng keo trong suốt',
    category: 'Văn phòng phẩm',
    price: 12000,
    stock: 60,
    status: 'active',
    createdAt: '2023-07-30',
  },
]; 