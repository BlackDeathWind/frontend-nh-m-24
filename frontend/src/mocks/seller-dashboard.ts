// Dữ liệu doanh thu theo ngày
export const sellerRevenueData = [
  { day: 'T2', value: 150000 },
  { day: 'T3', value: 230000 },
  { day: 'T4', value: 180000 },
  { day: 'T5', value: 280000 },
  { day: 'T6', value: 210000 },
  { day: 'T7', value: 300000 },
  { day: 'CN', value: 120000 },
];

// Dữ liệu sản phẩm của seller
export const sellerProducts = [
  { id: 1, name: 'Bút bi cao cấp', quantity: 120, sold: 25, stock: 95 },
  { id: 2, name: 'Sổ tay ghi chép', quantity: 85, sold: 32, stock: 53 },
  { id: 3, name: 'Bộ màu vẽ 24 màu', quantity: 70, sold: 15, stock: 55 },
  { id: 4, name: 'Kẹp giấy (hộp 100 cái)', quantity: 65, sold: 12, stock: 53 },
  { id: 5, name: 'Bút highlight (bộ 5 cái)', quantity: 60, sold: 20, stock: 40 },
];

// Dữ liệu đơn hàng của seller
export const sellerOrders = [
  { id: 'DH-12345', customer: 'Nguyễn Văn A', date: '15/10/2023', amount: 560000, status: 'completed' },
  { id: 'DH-12346', customer: 'Trần Thị B', date: '15/10/2023', amount: 870000, status: 'processing' },
  { id: 'DH-12347', customer: 'Lê Văn C', date: '14/10/2023', amount: 350000, status: 'completed' },
  { id: 'DH-12348', customer: 'Phạm Thị D', date: '14/10/2023', amount: 1250000, status: 'pending' },
  { id: 'DH-12349', customer: 'Hoàng Văn E', date: '13/10/2023', amount: 780000, status: 'cancelled' },
];

// Dữ liệu sản phẩm sắp hết hàng
export const sellerLowStockProducts = [
  { id: 1, name: 'Bút bi xanh', current: 5, min: 10 },
  { id: 2, name: 'Sổ ghi chép bìa cứng', current: 3, min: 10 },
  { id: 3, name: 'Kẹp giấy màu', current: 7, min: 20 },
];

// Dữ liệu thống kê tổng quan của seller
export const sellerStats = [
  {
    title: 'Doanh thu tuần này',
    value: '1.470.000 ₫',
    growth: 8.2,
    color: 'blue',
    icon: null
  },
  {
    title: 'Đơn hàng',
    value: '37',
    growth: 12.5,
    color: 'green',
    icon: null
  },
  {
    title: 'Sản phẩm đã bán',
    value: '104',
    growth: 5.7,
    color: 'purple',
    icon: null
  },
  {
    title: 'Tỷ lệ hoàn thành',
    value: '98%',
    growth: 3.1,
    color: 'orange',
    icon: null
  },
]; 