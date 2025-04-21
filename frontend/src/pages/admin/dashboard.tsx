import { useState } from 'react';
import { ShoppingBag, Users, TrendingUp, DollarSign, AlertTriangle, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

// Giả lập dữ liệu cho biểu đồ
const revenueData = [
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

// Giả lập dữ liệu sản phẩm bán chạy
const topProducts = [
  { id: 1, name: 'Bút bi cao cấp', quantity: 120, revenue: 3600000 },
  { id: 2, name: 'Sổ tay ghi chép', quantity: 85, revenue: 1700000 },
  { id: 3, name: 'Bộ màu vẽ 24 màu', quantity: 70, revenue: 3150000 },
  { id: 4, name: 'Kẹp giấy (hộp 100 cái)', quantity: 65, revenue: 650000 },
  { id: 5, name: 'Bút highlight (bộ 5 cái)', quantity: 60, revenue: 900000 },
];

// Giả lập dữ liệu đơn hàng gần đây
const recentOrders = [
  { id: 'DH-12345', customer: 'Nguyễn Văn A', date: '15/10/2023', amount: 560000, status: 'completed' },
  { id: 'DH-12346', customer: 'Trần Thị B', date: '15/10/2023', amount: 870000, status: 'processing' },
  { id: 'DH-12347', customer: 'Lê Văn C', date: '14/10/2023', amount: 350000, status: 'completed' },
  { id: 'DH-12348', customer: 'Phạm Thị D', date: '14/10/2023', amount: 1250000, status: 'pending' },
  { id: 'DH-12349', customer: 'Hoàng Văn E', date: '13/10/2023', amount: 780000, status: 'cancelled' },
];

// Giả lập dữ liệu sản phẩm sắp hết hàng
const lowStockProducts = [
  { id: 1, name: 'Bút bi xanh', current: 5, min: 10 },
  { id: 2, name: 'Sổ ghi chép bìa cứng', current: 3, min: 10 },
  { id: 3, name: 'Kẹp giấy màu', current: 7, min: 20 },
  { id: 4, name: 'Mực in màu đen', current: 2, min: 5 },
];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('month');
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Tính % tăng trưởng so với kỳ trước
  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  };

  const stats = [
    {
      title: 'Doanh thu tháng này',
      value: formatCurrency(156500000),
      icon: <DollarSign size={24} />,
      growth: 12.5,
      color: 'blue',
    },
    {
      title: 'Đơn hàng tháng này',
      value: '1,245',
      icon: <ShoppingBag size={24} />,
      growth: 8.2,
      color: 'green',
    },
    {
      title: 'Khách hàng mới',
      value: '358',
      icon: <Users size={24} />,
      growth: 5.7,
      color: 'purple',
    },
    {
      title: 'Lượt truy cập',
      value: '12,543',
      icon: <TrendingUp size={24} />,
      growth: 15.3,
      color: 'orange',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="bg-white rounded-md shadow p-1 flex">
          <button 
            className={cn(
              "px-3 py-1 text-sm rounded-md",
              timeRange === 'day' 
                ? "bg-blue-100 text-blue-700" 
                : "text-gray-600 hover:bg-gray-100"
            )}
            onClick={() => setTimeRange('day')}
          >
            Ngày
          </button>
          <button 
            className={cn(
              "px-3 py-1 text-sm rounded-md",
              timeRange === 'week' 
                ? "bg-blue-100 text-blue-700" 
                : "text-gray-600 hover:bg-gray-100"
            )}
            onClick={() => setTimeRange('week')}
          >
            Tuần
          </button>
          <button 
            className={cn(
              "px-3 py-1 text-sm rounded-md",
              timeRange === 'month' 
                ? "bg-blue-100 text-blue-700" 
                : "text-gray-600 hover:bg-gray-100"
            )}
            onClick={() => setTimeRange('month')}
          >
            Tháng
          </button>
          <button 
            className={cn(
              "px-3 py-1 text-sm rounded-md",
              timeRange === 'year' 
                ? "bg-blue-100 text-blue-700" 
                : "text-gray-600 hover:bg-gray-100"
            )}
            onClick={() => setTimeRange('year')}
          >
            Năm
          </button>
        </div>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100 text-${stat.color}-600`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={stat.growth >= 0 ? "text-green-600" : "text-red-600"}>
                {stat.growth >= 0 ? "+" : ""}{stat.growth.toFixed(1)}%
              </span>
              <span className="text-gray-500 text-sm ml-2">so với kỳ trước</span>
            </div>
          </div>
        ))}
      </div>

      {/* Biểu đồ doanh thu và sản phẩm bán chạy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Biểu đồ doanh thu</h2>
            <select className="text-sm border border-gray-300 rounded-md p-1">
              <option>12 tháng gần nhất</option>
              <option>6 tháng gần nhất</option>
              <option>3 tháng gần nhất</option>
            </select>
          </div>
          
          {/* Biểu đồ doanh thu */}
          <div className="h-80 w-full">
            <div className="flex items-end justify-between h-64 w-full">
              {revenueData.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-full">
                  <div 
                    className="bg-blue-500 rounded-t-sm w-6"
                    style={{ height: `${Math.max((item.value / 5000000) * 100, 10)}%` }}
                  ></div>
                  <span className="text-xs mt-2 text-gray-600">{item.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Sản phẩm bán chạy</h2>
          
          <div className="space-y-4">
            {topProducts.slice(0, 5).map((product, index) => (
              <div key={index} className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium">
                  {index + 1}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.quantity} sản phẩm</p>
                </div>
                <p className="text-sm font-medium">{formatCurrency(product.revenue)}</p>
              </div>
            ))}
          </div>
          
          <button className="mt-4 text-blue-600 text-sm font-medium hover:underline w-full text-center">
            Xem tất cả sản phẩm
          </button>
        </div>
      </div>

      {/* Đơn hàng gần đây và cảnh báo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h2 className="text-lg font-medium mb-4">Đơn hàng gần đây</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(order.amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                        order.status === 'completed' && "bg-green-100 text-green-800",
                        order.status === 'processing' && "bg-blue-100 text-blue-800",
                        order.status === 'pending' && "bg-yellow-100 text-yellow-800",
                        order.status === 'cancelled' && "bg-red-100 text-red-800",
                      )}>
                        {order.status === 'completed' && 'Hoàn thành'}
                        {order.status === 'processing' && 'Đang xử lý'}
                        {order.status === 'pending' && 'Chờ xác nhận'}
                        {order.status === 'cancelled' && 'Đã hủy'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button className="mt-4 text-blue-600 text-sm font-medium hover:underline w-full text-center">
            Xem tất cả đơn hàng
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Cảnh báo tồn kho</h2>
            <div className="text-red-500 bg-red-50 rounded-full p-1">
              <AlertTriangle size={20} />
            </div>
          </div>
          
          <div className="space-y-4">
            {lowStockProducts.map((product, index) => (
              <div key={index} className="flex items-start">
                <div className="p-2 rounded-md bg-red-50 text-red-500">
                  <Package size={18} />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-gray-500">
                    Còn {product.current}/{product.min} sản phẩm
                  </p>
                </div>
                <button className="text-sm text-blue-600 hover:underline">
                  Đặt hàng
                </button>
              </div>
            ))}
          </div>
          
          <button className="mt-4 text-blue-600 text-sm font-medium hover:underline w-full text-center">
            Xem tất cả cảnh báo
          </button>
        </div>
      </div>
    </div>
  );
} 