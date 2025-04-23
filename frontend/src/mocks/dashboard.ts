// Dữ liệu biểu đồ doanh thu
export const revenueData = [
  { month: 'T1', value: 1500000 },
  { month: 'T2', value: 2300000 },
  { month: 'T3', value: 1800000 },
  { month: 'T4', value: 2800000 },
  { month: 'T5', value: 2100000 },
  { month: 'T6', value: 2700000 },
  { month: 'T7', value: 3100000 },
  { month: 'T8', value: 2900000 },
  { month: 'T9', value: 3500000 },
  { month: 'T10', value: 3800000 },
  { month: 'T11', value: 4200000 },
  { month: 'T12', value: 4800000 },
];

// Dữ liệu sản phẩm bán chạy
export const topProducts = [
  { id: 1, name: 'Bút bi cao cấp', quantity: 120, revenue: 3600000 },
  { id: 2, name: 'Sổ tay ghi chép', quantity: 85, revenue: 1700000 },
  { id: 3, name: 'Bộ màu vẽ 24 màu', quantity: 70, revenue: 3150000 },
  { id: 4, name: 'Kẹp giấy (hộp 100 cái)', quantity: 65, revenue: 650000 },
  { id: 5, name: 'Bút highlight (bộ 5 cái)', quantity: 60, revenue: 900000 },
];

// Dữ liệu đơn hàng gần đây
export const recentOrders = [
  { id: 'DH-12345', customer: 'Nguyễn Văn A', date: '15/10/2023', amount: 560000, status: 'completed' },
  { id: 'DH-12346', customer: 'Trần Thị B', date: '15/10/2023', amount: 870000, status: 'processing' },
  { id: 'DH-12347', customer: 'Lê Văn C', date: '14/10/2023', amount: 350000, status: 'completed' },
  { id: 'DH-12348', customer: 'Phạm Thị D', date: '14/10/2023', amount: 1250000, status: 'pending' },
  { id: 'DH-12349', customer: 'Hoàng Văn E', date: '13/10/2023', amount: 780000, status: 'cancelled' },
];

// Dữ liệu sản phẩm sắp hết hàng
export const lowStockProducts = [
  { id: 1, name: 'Bút bi xanh', current: 5, min: 10 },
  { id: 2, name: 'Sổ ghi chép bìa cứng', current: 3, min: 10 },
  { id: 3, name: 'Kẹp giấy màu', current: 7, min: 20 },
  { id: 4, name: 'Mực in màu đen', current: 2, min: 5 },
];

// Dữ liệu thống kê tổng quan
export const dashboardStats = [
  {
    title: 'Doanh thu tháng này',
    value: '156.500.000 ₫',
    growth: 12.5,
    color: 'blue',
  },
  {
    title: 'Đơn hàng tháng này',
    value: '1,245',
    growth: 8.2,
    color: 'green',
  },
  {
    title: 'Khách hàng mới',
    value: '358',
    growth: 5.7,
    color: 'purple',
  },
  {
    title: 'Lượt truy cập',
    value: '12,543',
    growth: 15.3,
    color: 'orange',
  },
]; 