import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderAPI } from '@/lib/api';
import { useNotification } from '@/lib/notification-context';
import { AlertDialog } from '@/components/ui/alert-dialog';
import {
  ArrowLeft,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Package,
  ShoppingBag,
  Truck,
  CheckCircle,
  XCircle,
  RefreshCw,
  Clock,
} from 'lucide-react';

interface OrderItem {
  MaChiTietDH: number;
  MaDonHang: number;
  MaSP: number;
  SoLuong: number;
  DonGia: number;
  ThanhTien: number;
  TenSP: string;
  HinhAnhChinhURL: string;
}

interface Order {
  MaDonHang: number;
  MaKH: string;
  TenKhachHang: string;
  TenNguoiNhan: string;
  SoDienThoaiNhan: string;
  EmailNguoiNhan: string;
  DiaChiGiaoHang: string;
  NgayDatHang: string;
  TongTienSanPham: number;
  PhiVanChuyen: number;
  GiamGia: number;
  TongThanhToan: number;
  PhuongThucThanhToan: string;
  TrangThaiThanhToan: string;
  TrangThaiDonHang: string;
  GhiChuKhachHang?: string;
  GhiChuQuanTri?: string;
  NgayCapNhat: string;
  ChiTietDonHang: OrderItem[];
}

// Định nghĩa interface cho alert dialog
interface ConfirmDialogState {
  open: boolean;
  title: string;
  description: string;
  confirmText: string;
  action: () => Promise<void>;
  variant: 'danger' | 'default';
}

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // State cho confirm dialog
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    open: false,
    title: '',
    description: '',
    confirmText: '',
    action: async () => {},
    variant: 'default',
  });

  useEffect(() => {
    if (id) {
      fetchOrderDetail(Number(id));
    }
  }, [id]);

  const fetchOrderDetail = async (orderId: number) => {
    try {
      setLoading(true);
      const response = await orderAPI.getOrderDetail(orderId.toString());

      if (response.status === 'success' && response.data) {
        setOrder(response.data);
      } else {
        showNotification('error', 'Không thể tải thông tin đơn hàng');
      }
    } catch (error) {
      console.error('Error fetching order detail:', error);
      showNotification('error', 'Đã xảy ra lỗi khi tải thông tin đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  // Format tiền tệ
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Format ngày
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  // Mở dialog xác nhận đơn hàng
  const openConfirmApproveDialog = (orderId: number) => {
    setConfirmDialog({
      open: true,
      title: 'Xác nhận đơn hàng?',
      description: 'Bạn có chắc muốn xác nhận đơn hàng này? Trạng thái sẽ chuyển thành Đang xử lý.',
      confirmText: 'Xác nhận',
      action: async () => handleApproveOrder(orderId),
      variant: 'default',
    });
  };

  // Mở dialog hủy đơn hàng
  const openConfirmCancelDialog = (orderId: number) => {
    setConfirmDialog({
      open: true,
      title: 'Xác nhận hủy?',
      description: 'Bạn có chắc muốn hủy đơn hàng này? Hành động này không thể hoàn tác.',
      confirmText: 'Hủy đơn hàng',
      action: async () => handleCancelOrder(orderId),
      variant: 'danger',
    });
  };

  // Đóng dialog
  const closeConfirmDialog = () => {
    setConfirmDialog(prev => ({ ...prev, open: false }));
  };

  // Hàm xử lý xác nhận đơn hàng "Chờ xác nhận" -> "Đang xử lý"
  const handleApproveOrder = async (orderId: number) => {
    try {
      const response = await orderAPI.updateOrderStatus(orderId.toString(), {
        status: 'DangXuLy'
      });

      if (response.status === 'success') {
        showNotification('success', 'Đã xác nhận đơn hàng thành công');
        fetchOrderDetail(orderId);
      } else {
        showNotification('error', 'Không thể cập nhật trạng thái đơn hàng');
      }
    } catch (error) {
      console.error(`Error updating order ${orderId} status:`, error);
      showNotification('error', 'Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng');
    }
  };

  // Xử lý cập nhật trạng thái đơn hàng
  const handleUpdateStatus = async (orderId: number, newStatus: string) => {
    try {
      const response = await orderAPI.updateOrderStatus(orderId.toString(), {
        status: newStatus
      });

      if (response.status === 'success') {
        let message = 'Cập nhật trạng thái đơn hàng thành công';
        if (newStatus === 'DangXuLy') message = 'Đã xác nhận đơn hàng thành công';
        if (newStatus === 'DaXacNhan') message = 'Đã xác nhận đơn hàng thành công';
        if (newStatus === 'DangGiaoHang') message = 'Đã chuyển trạng thái sang đang giao hàng';
        if (newStatus === 'DaHoanThanh') message = 'Đã hoàn thành đơn hàng';

        showNotification('success', message);
        fetchOrderDetail(orderId);
      } else {
        showNotification('error', 'Không thể cập nhật trạng thái đơn hàng');
      }
    } catch (error) {
      console.error(`Error updating order ${orderId} status:`, error);
      showNotification('error', 'Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng');
    }
  };

  // Hàm xử lý hủy đơn hàng
  const handleCancelOrder = async (orderId: number) => {
    try {
      const response = await orderAPI.updateOrderStatus(orderId.toString(), {
        status: 'DaHuy',
        adminNote: 'Đơn hàng đã bị hủy bởi quản trị viên'
      });

      if (response.status === 'success') {
        showNotification('success', 'Đã hủy đơn hàng thành công');
        fetchOrderDetail(orderId);
      } else {
        showNotification('error', 'Không thể hủy đơn hàng');
      }
    } catch (error) {
      console.error(`Error cancelling order ${orderId}:`, error);
      showNotification('error', 'Đã xảy ra lỗi khi hủy đơn hàng');
    }
  };

  // Đối tượng chuyển đổi trạng thái thành hiển thị người dùng
  const statusMapping: Record<string, string> = {
    'ChoXacNhan': 'Chờ xác nhận',
    'DangXuLy': 'Đang xử lý',
    'DaXacNhan': 'Đã xác nhận',
    'DangGiaoHang': 'Đang giao hàng',
    'DaHoanThanh': 'Đã hoàn thành',
    'DaHuy': 'Đã hủy'
  };

  const statusColors: Record<string, string> = {
    'Chờ xác nhận': 'bg-orange-100 text-orange-800',
    'Đang xử lý': 'bg-blue-100 text-blue-800',
    'Đã xác nhận': 'bg-indigo-100 text-indigo-800',
    'Đang giao hàng': 'bg-yellow-100 text-yellow-800',
    'Đã hoàn thành': 'bg-green-100 text-green-800',
    'Đã hủy': 'bg-red-100 text-red-800'
  };

  // Hiển thị trình trạng đơn hàng
  const renderOrderTimeline = (status: string) => {
    const steps = [
      { key: 'ChoXacNhan', label: 'Chờ xác nhận', icon: <Clock className="h-5 w-5" /> },
      { key: 'DangXuLy', label: 'Đang xử lý', icon: <Package className="h-5 w-5" /> },
      { key: 'DaXacNhan', label: 'Đã xác nhận', icon: <CheckCircle className="h-5 w-5" /> },
      { key: 'DangGiaoHang', label: 'Đang giao hàng', icon: <Truck className="h-5 w-5" /> },
      { key: 'DaHoanThanh', label: 'Đã hoàn thành', icon: <ShoppingBag className="h-5 w-5" /> },
    ];

    // Xác định index của trạng thái hiện tại
    let currentIndex = steps.findIndex(step => step.key === status);
    if (currentIndex === -1) currentIndex = 0; // Mặc định là bước đầu tiên

    if (status === 'DaHuy') {
      return (
        <div className="flex items-center justify-center py-6 bg-red-50 rounded-lg">
          <XCircle className="h-8 w-8 text-red-600 mr-2" />
          <span className="text-lg font-medium text-red-700">Đơn hàng đã bị hủy</span>
        </div>
      );
    }

    return (
      <div className="py-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.key} className="flex flex-col items-center relative">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                index <= currentIndex ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step.icon}
              </div>
              <div className="mt-2 text-sm font-medium text-center">{step.label}</div>
              
              {/* Dòng kết nối giữa các bước */}
              {index < steps.length - 1 && (
                <div className={`absolute top-5 h-0.5 w-[200%] -right-1/2 ${
                  index < currentIndex ? 'bg-blue-500' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin đơn hàng...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl text-gray-700 mb-4">Không tìm thấy thông tin đơn hàng</p>
        <button
          onClick={() => navigate('/admin/orders')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại danh sách đơn hàng
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Dialog xác nhận */}
      <AlertDialog
        open={confirmDialog.open}
        onOpenChange={closeConfirmDialog}
        title={confirmDialog.title}
        description={confirmDialog.description}
        onConfirm={confirmDialog.action}
        confirmText={confirmDialog.confirmText}
        cancelText="Không, hủy bỏ"
        variant={confirmDialog.variant}
      />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/orders')}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Quay lại
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            Chi tiết đơn hàng #{order.MaDonHang}
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => fetchOrderDetail(order.MaDonHang)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Làm mới
          </button>
          
          {/* Hiển thị nút thao tác tùy theo trạng thái */}
          {order.TrangThaiDonHang === 'ChoXacNhan' && (
            <>
              <button
                onClick={() => openConfirmApproveDialog(order.MaDonHang)}
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Xác nhận đơn hàng
              </button>
              <button
                onClick={() => openConfirmCancelDialog(order.MaDonHang)}
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <XCircle className="h-4 w-4 mr-1" />
                Hủy đơn
              </button>
            </>
          )}
          
          {order.TrangThaiDonHang === 'DangXuLy' && (
            <>
              <button
                onClick={() => handleUpdateStatus(order.MaDonHang, 'DaXacNhan')}
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Xác nhận đơn hàng
              </button>
              <button
                onClick={() => openConfirmCancelDialog(order.MaDonHang)}
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <XCircle className="h-4 w-4 mr-1" />
                Hủy đơn
              </button>
            </>
          )}
          
          {order.TrangThaiDonHang === 'DaXacNhan' && (
            <>
              <button
                onClick={() => handleUpdateStatus(order.MaDonHang, 'DangGiaoHang')}
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                <Truck className="h-4 w-4 mr-1" />
                Xác nhận đang giao hàng
              </button>
              <button
                onClick={() => openConfirmCancelDialog(order.MaDonHang)}
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <XCircle className="h-4 w-4 mr-1" />
                Hủy đơn
              </button>
            </>
          )}
          
          {order.TrangThaiDonHang === 'DangGiaoHang' && (
            <button
              onClick={() => handleUpdateStatus(order.MaDonHang, 'DaHoanThanh')}
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Package className="h-4 w-4 mr-1" />
              Xác nhận đã giao hàng
            </button>
          )}
        </div>
      </div>

      {/* Trạng thái đơn hàng */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Trạng thái đơn hàng</h2>
        
        <div className="flex items-center mb-4">
          <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
            statusColors[statusMapping[order.TrangThaiDonHang] || order.TrangThaiDonHang] || 'bg-gray-100 text-gray-800'
          }`}>
            {statusMapping[order.TrangThaiDonHang] || order.TrangThaiDonHang}
          </span>
          <span className="ml-3 text-sm text-gray-500">
            Cập nhật lần cuối: {formatDate(order.NgayCapNhat)}
          </span>
        </div>
        
        {renderOrderTimeline(order.TrangThaiDonHang)}
      </div>

      {/* Thông tin chi tiết đơn hàng */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Thông tin khách hàng */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Thông tin khách hàng</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <User className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Tên khách hàng</h3>
                <p className="mt-1 text-sm text-gray-900">{order.TenKhachHang}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <User className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Tên người nhận</h3>
                <p className="mt-1 text-sm text-gray-900">{order.TenNguoiNhan}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Số điện thoại</h3>
                <p className="mt-1 text-sm text-gray-900">{order.SoDienThoaiNhan}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-sm text-gray-900">{order.EmailNguoiNhan}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Địa chỉ giao hàng</h3>
                <p className="mt-1 text-sm text-gray-900">{order.DiaChiGiaoHang}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin đơn hàng */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Thông tin đơn hàng</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Ngày đặt hàng</h3>
                <p className="mt-1 text-sm text-gray-900">{formatDate(order.NgayDatHang)}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CreditCard className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phương thức thanh toán</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {order.PhuongThucThanhToan === 'TienMat' || order.PhuongThucThanhToan === 'COD' 
                    ? 'Thanh toán khi nhận hàng' 
                    : 'Ví điện tử'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Trạng thái thanh toán</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {order.TrangThaiThanhToan === 'DaThanhToan' 
                    ? 'Đã thanh toán' 
                    : 'Chưa thanh toán'}
                </p>
              </div>
            </div>
            
            {order.GhiChuKhachHang && (
              <div className="flex items-start">
                <Package className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Ghi chú khách hàng</h3>
                  <p className="mt-1 text-sm text-gray-900">{order.GhiChuKhachHang}</p>
                </div>
              </div>
            )}
            
            {order.GhiChuQuanTri && (
              <div className="flex items-start">
                <Package className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Ghi chú quản trị</h3>
                  <p className="mt-1 text-sm text-gray-900">{order.GhiChuQuanTri}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Danh sách sản phẩm</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đơn giá</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thành tiền</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order.ChiTietDonHang && order.ChiTietDonHang.map((item) => (
                <tr key={item.MaChiTietDH} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-md object-cover" 
                          src={item.HinhAnhChinhURL} 
                          alt={item.TenSP} 
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.TenSP}</div>
                        <div className="text-sm text-gray-500">Mã SP: {item.MaSP}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(item.DonGia)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.SoLuong}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                    {formatCurrency(item.ThanhTien)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-500">Tổng tiền sản phẩm:</td>
                <td className="px-6 py-3 text-right text-sm font-medium text-gray-900">{formatCurrency(order.TongTienSanPham)}</td>
              </tr>
              <tr>
                <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-500">Phí vận chuyển:</td>
                <td className="px-6 py-3 text-right text-sm font-medium text-gray-900">{formatCurrency(order.PhiVanChuyen)}</td>
              </tr>
              {order.GiamGia > 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-500">Giảm giá:</td>
                  <td className="px-6 py-3 text-right text-sm font-medium text-green-600">-{formatCurrency(order.GiamGia)}</td>
                </tr>
              )}
              <tr className="bg-gray-100">
                <td colSpan={3} className="px-6 py-3 text-right text-base font-semibold text-gray-900">Tổng thanh toán:</td>
                <td className="px-6 py-3 text-right text-base font-semibold text-blue-600">{formatCurrency(order.TongThanhToan)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
} 