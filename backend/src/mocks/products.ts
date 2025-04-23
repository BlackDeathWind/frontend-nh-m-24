import { v4 as uuidv4 } from 'uuid';

export interface MockProduct {
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
  features?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Mock data sản phẩm cho backend
export const mockProducts: MockProduct[] = [
  {
    id: '1',
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
    features: ['Viết mượt mà', 'Thiết kế sang trọng', 'Độ bền cao', 'Mực không lem'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
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
    features: ['Bìa da thật', 'Giấy dày 100gsm', 'Không thấm mực', 'Có bookmark'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
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
    features: ['24 màu đa dạng', 'Màu sắc tươi sáng', 'Dễ pha trộn', 'Không độc hại'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
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
    features: ['Lưỡi thép không gỉ', 'Cán cầm êm ái', 'Độ sắc bén cao', 'Phù hợp mọi mục đích'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
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
    features: ['36 màu sắc', 'Ruột chì mềm mại', 'Dễ dàng pha trộn', 'Bền màu'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    name: 'Bộ thước kẻ kiến trúc',
    slug: 'bo-thuoc-ke-kien-truc',
    description: 'Bộ thước kẻ chuyên dụng cho kiến trúc sư và sinh viên thiết kế.',
    price: 95000,
    stock: 28,
    categories: ['Văn phòng phẩm', 'Dụng cụ vẽ'],
    images: [
      'https://images.unsplash.com/photo-1615714946704-aca90a68a8c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.5,
    reviewCount: 42,
    features: ['Độ chính xác cao', 'Vạch chia rõ ràng', 'Chống trầy xước', 'Bộ 3 thước đa năng'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '7',
    name: 'Vở ghi chú cao cấp',
    slug: 'vo-ghi-chu-cao-cap',
    description: 'Vở ghi chú cao cấp với giấy dày, không thấm mực và bìa cứng bảo vệ.',
    price: 65000,
    stock: 45,
    categories: ['Sổ & Vở', 'Văn phòng phẩm'],
    images: [
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.4,
    reviewCount: 63,
    features: ['Giấy dày 120gsm', 'Bìa cứng chống thấm', 'Gáy đóng chắc chắn', '100 tờ'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '8',
    name: 'Bút lông viết thư pháp',
    slug: 'but-long-viet-thu-phap',
    description: 'Bút lông chuyên dụng cho thư pháp và vẽ mỹ thuật với đầu bút linh hoạt.',
    price: 125000,
    stock: 20,
    categories: ['Bút viết', 'Sản phẩm nghệ thuật'],
    images: [
      'https://images.unsplash.com/photo-1602720429908-f3dc4f59c4c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 52,
    features: ['Đầu bút linh hoạt', 'Mực không lem', 'Cán bút êm ái', 'Phù hợp cho nghệ thuật thư pháp'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '9',
    name: 'Giấy màu nghệ thuật',
    slug: 'giay-mau-nghe-thuat',
    description: 'Bộ giấy màu chất lượng cao dùng cho các dự án nghệ thuật, origami và scrapbooking.',
    price: 85000,
    stock: 38,
    categories: ['Dụng cụ vẽ', 'Sản phẩm nghệ thuật'],
    images: [
      'https://images.unsplash.com/photo-1517697471339-4aa32003c11a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 47,
    features: ['50 màu đa dạng', 'Giấy dày bền', 'Màu sắc tươi sáng', 'Kích thước đa dạng'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '10',
    name: 'Bấm lỗ chuyên nghiệp',
    slug: 'bam-lo-chuyen-nghiep',
    description: 'Bấm lỗ chuyên nghiệp dùng cho văn phòng, có thể đục lỗ đến 50 tờ cùng lúc.',
    price: 145000,
    stock: 15,
    categories: ['Văn phòng phẩm', 'Dụng cụ văn phòng'],
    images: [
      'https://images.unsplash.com/photo-1558127691-11954e5ca42b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 39,
    features: ['Đục lỗ đến 50 tờ', 'Cấu trúc kim loại bền bỉ', 'Thiết kế chống kẹt giấy', 'Điều chỉnh khoảng cách lỗ'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]; 