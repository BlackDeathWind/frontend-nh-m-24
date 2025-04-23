import { useState } from 'react';
import { ShoppingBag, Package, TrendingUp, AlertTriangle, Clock, DollarSign, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  sellerRevenueData,
  sellerProducts,
  sellerOrders,
  sellerLowStockProducts,
  sellerStats
} from '@/mocks/seller-dashboard';

// Giả lập dữ liệu doanh thu
const revenueData = [
  { day: 'T2', value: 150000 },
  { day: 'T3', value: 230000 },
  { day: 'T4', value: 180000 },
  { day: 'T5', value: 280000 },
  { day: 'T6', value: 210000 },
  { day: 'T7', value: 300000 },
  { day: 'CN', value: 120000 },
];

// Giả lập dữ liệu sản phẩm của seller
const myProducts = [
  { id: 1, name: 'Bút bi cao cấp', quantity: 120, sold: 25, stock: 95 },
  { id: 2, name: 'Sổ tay ghi chép', quantity: 85, sold: 32, stock: 53 },
  { id: 3, name: 'Bộ màu vẽ 24 màu', quantity: 70, sold: 15, stock: 55 },
  { id: 4, name: 'Kẹp giấy (hộp 100 cái)', quantity: 65, sold: 12, stock: 53 },
  { id: 5, name: 'Bút highlight (bộ 5 cái)', quantity: 60, sold: 20, stock: 40 },
];

// Giả lập dữ liệu đơn hàng của seller
const myOrders = [
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
];

// Sử dụng dữ liệu từ mocks/seller-dashboard.ts

export default function SellerDashboard() {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Đếm số đơn hàng theo trạng thái
  const orderStatusCount = {
    pending: sellerOrders.filter(order => order.status === 'pending').length,
    processing: sellerOrders.filter(order => order.status === 'processing').length,
    completed: sellerOrders.filter(order => order.status === 'completed').length,
    cancelled: sellerOrders.filter(order => order.status === 'cancelled').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard nhân viên bán hàng</h1>
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
        </div>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sellerStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100 text-${stat.color}-600`}>
                {stat.icon ? stat.icon : <TrendingUp size={24} />}
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

      {/* Biểu đồ doanh thu và đơn hàng đang xử lý */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Doanh thu theo ngày</h2>
            <select className="text-sm border border-gray-300 rounded-md p-1">
              <option>7 ngày gần nhất</option>
              <option>14 ngày gần nhất</option>
              <option>30 ngày gần nhất</option>
            </select>
          </div>
          
          {/* Biểu đồ doanh thu */}
          <div className="h-64 w-full">
            <div className="flex items-end justify-between h-52 w-full">
              {sellerRevenueData.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-full">
                  <div 
                    className="bg-blue-500 rounded-t-sm w-12"
                    style={{ height: `${Math.max((item.value / 300000) * 100, 10)}%` }}
                  ></div>
                  <span className="text-xs mt-2 text-gray-600">{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Đơn hàng cần xử lý</h2>
            <div className="text-yellow-500 bg-yellow-50 rounded-full p-1">
              <Clock size={20} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">{orderStatusCount.pending}</p>
              <p className="text-sm text-gray-600 mt-1">Chờ xác nhận</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{orderStatusCount.processing}</p>
              <p className="text-sm text-gray-600 mt-1">Đang xử lý</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-purple-600">{orderStatusCount.completed}</p>
              <p className="text-sm text-gray-600 mt-1">Hoàn thành</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-red-600">{orderStatusCount.cancelled}</p>
              <p className="text-sm text-gray-600 mt-1">Đã hủy</p>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium flex items-center justify-center">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Xử lý đơn hàng
            </button>
          </div>
        </div>
      </div>

      {/* Sản phẩm của tôi và cảnh báo tồn kho */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h2 className="text-lg font-medium mb-4">Sản phẩm của tôi</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đã bán</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Còn lại</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {myProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{product.sold}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button className="mt-4 text-blue-600 text-sm font-medium hover:underline w-full text-center">
            Xem tất cả sản phẩm
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
          
          <div className="mt-6">
            <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium flex items-center justify-center">
              <Package className="h-4 w-4 mr-2" />
              Thêm sản phẩm mới
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 