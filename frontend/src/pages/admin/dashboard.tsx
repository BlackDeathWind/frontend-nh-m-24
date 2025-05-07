import { useState, useEffect } from 'react';
import { ShoppingBag, Users, TrendingUp, DollarSign, AlertTriangle, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getDashboardData } from '@/lib/data';

interface DashboardData {
  revenueData: { month: string; value: number }[];
  topProducts: { name: string; quantity: number; revenue: number }[];
  recentOrders: { id: string; customer: string; date: string; amount: number; status: string }[];
  lowStockProducts: { name: string; current: number; min: number }[];
  dashboardStats: { title: string; value: string; color: string; growth: number }[];
}

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('month');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getDashboardData();
        if (response.success && response.data) {
          setDashboardData(response.data);
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
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

  // Các icon tương ứng với từng loại thống kê
  const statIcons = {
    'Doanh thu tháng này': <DollarSign size={24} />,
    'Đơn hàng tháng này': <ShoppingBag size={24} />,
    'Khách hàng mới': <Users size={24} />,
    'Lượt truy cập': <TrendingUp size={24} />
  };

  // Nếu đang tải dữ liệu, hiển thị trạng thái loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Nếu không có dữ liệu
  if (!dashboardData) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-gray-700">Không thể tải dữ liệu</h2>
        <p className="text-gray-500 mt-2">Vui lòng thử lại sau</p>
      </div>
    );
  }

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
        {dashboardData.dashboardStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100 text-${stat.color}-600`}>
                {statIcons[stat.title as keyof typeof statIcons] || <TrendingUp size={24} />}
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
              {dashboardData.revenueData.map((item, index) => (
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
            {dashboardData.topProducts.slice(0, 5).map((product, index) => (
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
                {dashboardData.recentOrders.map((order) => (
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
            {dashboardData.lowStockProducts.map((product, index) => (
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