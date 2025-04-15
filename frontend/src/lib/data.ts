import { Product } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Bút bi cao cấp Montblanc',
    price: 150000,
    description: 'Bút bi cao cấp Montblanc với thiết kế sang trọng, mực viết mượt mà và bền bỉ.',
    category: 'Bút viết',
    imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    stock: 15,
    rating: 4.8,
    reviews: 120,
    features: ['Viết mượt mà', 'Thiết kế sang trọng', 'Độ bền cao', 'Mực không lem']
  },
  {
    id: '2',
    name: 'Sổ tay bìa da thật',
    price: 250000,
    description: 'Sổ tay bìa da thật với giấy chất lượng cao, phù hợp cho ghi chú và vẽ phác thảo.',
    category: 'Sổ & Vở',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    stock: 25,
    rating: 4.7,
    reviews: 85,
    features: ['Bìa da thật', 'Giấy dày 100gsm', 'Không thấm mực', 'Có bookmark']
  },
  {
    id: '3',
    name: 'Bộ màu nước chuyên nghiệp',
    price: 320000,
    description: 'Bộ màu nước chuyên nghiệp với 24 màu, lý tưởng cho các nghệ sĩ chuyên nghiệp và học sinh mỹ thuật.',
    category: 'Dụng cụ vẽ',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    stock: 18,
    rating: 4.9,
    reviews: 67,
    features: ['24 màu đa dạng', 'Màu sắc tươi sáng', 'Dễ pha trộn', 'Không độc hại']
  },
  {
    id: '4',
    name: 'Kéo văn phòng cao cấp',
    price: 75000,
    description: 'Kéo văn phòng cao cấp với lưỡi thép không gỉ, sắc bén và bền bỉ.',
    category: 'Văn phòng phẩm',
    imageUrl: 'https://images.unsplash.com/photo-1503788311183-fa3bf9c3bddf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    stock: 32,
    rating: 4.6,
    reviews: 95,
    features: ['Lưỡi thép không gỉ', 'Cán cầm êm ái', 'Độ sắc bén cao', 'Phù hợp mọi mục đích']
  },
  {
    id: '5',
    name: 'Bút chì màu nghệ thuật',
    price: 180000,
    description: 'Bộ bút chì màu nghệ thuật với 36 màu sắc tươi sáng, lý tưởng cho vẽ và phác thảo.',
    category: 'Dụng cụ vẽ',
    imageUrl: 'https://images.unsplash.com/photo-1513525693483-5f8868305499?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    stock: 22,
    rating: 4.7,
    reviews: 73,
    features: ['36 màu sắc', 'Ruột chì mềm mại', 'Dễ dàng pha trộn', 'Bền màu']
  },
  {
    id: '6',
    name: 'Bộ thước kẻ kiến trúc',
    price: 95000,
    description: 'Bộ thước kẻ chuyên dụng cho kiến trúc sư và sinh viên thiết kế.',
    category: 'Văn phòng phẩm',
    imageUrl: 'https://images.unsplash.com/photo-1615714946704-aca90a68a8c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    stock: 28,
    rating: 4.5,
    reviews: 42,
    features: ['Độ chính xác cao', 'Vạch chia rõ ràng', 'Chống trầy xước', 'Bộ 3 thước đa năng']
  },
  {
    id: '7',
    name: 'Vở ghi chú cao cấp',
    price: 65000,
    description: 'Vở ghi chú cao cấp với giấy dày, không thấm mực và bìa cứng bảo vệ.',
    category: 'Sổ & Vở',
    imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    stock: 45,
    rating: 4.4,
    reviews: 63,
    features: ['Giấy dày 120gsm', 'Bìa cứng chống thấm', 'Gáy đóng chắc chắn', '100 tờ']
  },
  {
    id: '8',
    name: 'Bút lông viết thư pháp',
    price: 125000,
    description: 'Bút lông chuyên dụng cho thư pháp và vẽ mỹ thuật với đầu bút linh hoạt.',
    category: 'Bút viết',
    imageUrl: 'https://images.unsplash.com/photo-1602720429908-f3dc4f59c4c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    stock: 20,
    rating: 4.8,
    reviews: 52,
    features: ['Đầu bút linh hoạt', 'Mực không lem', 'Cán bút êm ái', 'Phù hợp cho nghệ thuật thư pháp']
  },
  {
    id: '9',
    name: 'Giấy màu nghệ thuật',
    price: 85000,
    description: 'Bộ giấy màu chất lượng cao dùng cho các dự án nghệ thuật, origami và scrapbooking.',
    category: 'Dụng cụ vẽ',
    imageUrl: 'https://images.unsplash.com/photo-1517697471339-4aa32003c11a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    stock: 38,
    rating: 4.6,
    reviews: 47,
    features: ['50 màu đa dạng', 'Giấy dày bền', 'Màu sắc tươi sáng', 'Kích thước đa dạng']
  },
  {
    id: '10',
    name: 'Bấm lỗ chuyên nghiệp',
    price: 145000,
    description: 'Bấm lỗ chuyên nghiệp dùng cho văn phòng, có thể đục lỗ đến 50 tờ cùng lúc.',
    category: 'Văn phòng phẩm',
    imageUrl: 'https://images.unsplash.com/photo-1558127691-11954e5ca42b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    stock: 15,
    rating: 4.7,
    reviews: 39,
    features: ['Đục lỗ đến 50 tờ', 'Cấu trúc kim loại bền bỉ', 'Thiết kế chống kẹt giấy', 'Điều chỉnh khoảng cách lỗ']
  }
]; 