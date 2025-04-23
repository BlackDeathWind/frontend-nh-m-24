import { v4 as uuidv4 } from 'uuid';

interface MockProduct {
  id: string;
  name: string;
  slug: string;
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
}

// Mock data sản phẩm cho backend
export const mockProducts: MockProduct[] = [
  {
    id: uuidv4(),
    name: 'Bút bi cao cấp Montblanc',
    slug: 'but-bi-cao-cap-montblanc',
    description: 'Bút bi cao cấp Montblanc với thiết kế sang trọng, mực viết mượt mà và bền bỉ.',
    price: 150000,
    stock: 15,
    categories: ['Bút viết', 'Văn phòng phẩm cao cấp'],
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595925088461-4daf8c5a2e7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 120,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    name: 'Sổ tay bìa da thật',
    slug: 'so-tay-bia-da-that',
    description: 'Sổ tay bìa da thật với giấy chất lượng cao, phù hợp cho ghi chú và vẽ phác thảo.',
    price: 250000,
    stock: 25,
    categories: ['Sổ & Vở', 'Văn phòng phẩm cao cấp'],
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589401277148-0d4906e49a13?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 85,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    name: 'Bộ màu nước chuyên nghiệp',
    slug: 'bo-mau-nuoc-chuyen-nghiep',
    description: 'Bộ màu nước chuyên nghiệp với 24 màu, lý tưởng cho các nghệ sĩ chuyên nghiệp và học sinh mỹ thuật.',
    price: 320000,
    stock: 18,
    categories: ['Dụng cụ vẽ', 'Sản phẩm nghệ thuật'],
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1604419622426-5366256f357f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 67,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    name: 'Kéo văn phòng cao cấp',
    slug: 'keo-van-phong-cao-cap',
    description: 'Kéo văn phòng cao cấp với lưỡi thép không gỉ, sắc bén và bền bỉ.',
    price: 75000,
    stock: 32,
    categories: ['Văn phòng phẩm', 'Dụng cụ cắt'],
    images: [
      'https://images.unsplash.com/photo-1503788311183-fa3bf9c3bddf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601510285708-34f7959edf6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 95,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    name: 'Bút chì màu nghệ thuật',
    slug: 'but-chi-mau-nghe-thuat',
    description: 'Bộ bút chì màu nghệ thuật với 36 màu sắc tươi sáng, lý tưởng cho vẽ và phác thảo.',
    price: 180000,
    stock: 22,
    categories: ['Dụng cụ vẽ', 'Bút viết'],
    images: [
      'https://images.unsplash.com/photo-1513525693483-5f8868305499?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587369198211-38638628e280?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 73,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]; 