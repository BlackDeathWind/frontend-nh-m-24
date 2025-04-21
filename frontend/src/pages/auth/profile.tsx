import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/auth-context';
import { User, Mail, Phone, MapPin, Edit, Camera, Save, X, CheckCircle, UserCircle, ShoppingCart } from 'lucide-react';
import { showToast } from '../../lib/toast';
import { AlertDialog } from '../../components/ui/alert-dialog';
import { Breadcrumb } from '../../components/ui/breadcrumb';

// Interface cho location state
interface LocationState {
  openEditMode?: boolean;
  fromCheckout?: boolean;
}

const Profile = () => {
  const { user, isLoggedIn, updateProfile, loading } = useAuth();
  const navigate = useNavigate();
  
  // Lấy location để kiểm tra state
  const location = useLocation();
  const locationState = location.state as LocationState;
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
  });
  
  const [originalData, setOriginalData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [fromCheckout, setFromCheckout] = useState(false);

  useEffect(() => {
    // Nếu không đăng nhập, chuyển hướng đến trang đăng nhập
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    // Cập nhật formData từ thông tin user
    if (user) {
      const userData = {
        fullName: user.fullName || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
      };
      
      setFormData(userData);
      setOriginalData(userData);
      
      // Nếu có state yêu cầu mở chế độ chỉnh sửa
      if (locationState?.openEditMode) {
        setIsEditing(true);
        
        // Kiểm tra nếu điều hướng từ trang checkout
        if (locationState?.fromCheckout) {
          setFromCheckout(true);
        }
        
        // Xóa state sau khi đã sử dụng để tránh mở lại khi refresh
        navigate(location.pathname, { replace: true, state: undefined });
      }
    }
  }, [isLoggedIn, user, navigate, location.pathname, locationState]);

  // Kiểm tra xem form có thay đổi không
  const hasChanges = useCallback(() => {
    return formData.fullName !== originalData.fullName || 
           formData.phoneNumber !== originalData.phoneNumber || 
           formData.address !== originalData.address;
  }, [formData, originalData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    if (hasChanges()) {
      setShowAlertDialog(true);
    } else {
      setIsEditing(false);
    }
  };

  const confirmCancel = () => {
    // Khôi phục dữ liệu ban đầu
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName) {
      showToast('error', 'Vui lòng nhập họ tên');
      return;
    }
    
    try {
      const success = await updateProfile({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      });
      
      if (success) {
        setOriginalData({...formData});
        setUpdateSuccess(true);
        
        // Hiển thị thông báo thành công trong 2 giây
        setTimeout(() => {
          setUpdateSuccess(false);
          setIsEditing(false);
          
          // Nếu người dùng đến từ checkout, đề xuất quay lại
          if (fromCheckout) {
            setFromCheckout(false);
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin:', error);
      showToast('error', 'Cập nhật thông tin thất bại');
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-blue-400 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-blue-400 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-blue-400 rounded"></div>
              <div className="h-4 bg-blue-400 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb
          items={[
            { label: 'Tài khoản', href: '/profile', icon: <UserCircle size={14} /> },
            { label: isEditing ? 'Chỉnh sửa thông tin' : 'Thông tin tài khoản' }
          ]}
          className="mb-6"
        />
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-40 bg-gradient-to-r from-blue-500 to-blue-700">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white p-1">
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center relative overflow-hidden">
                    {user.avatarUrl ? (
                      <img 
                        src={user.avatarUrl} 
                        alt={user.fullName} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <User size={50} className="text-gray-400" />
                    )}
                    
                    <button className="absolute bottom-0 w-full h-8 bg-black/40 text-white flex items-center justify-center text-xs">
                      <Camera size={14} className="mr-1" />
                      Thay đổi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{user.fullName}</h1>
                <p className="text-gray-500 flex items-center mt-1">
                  <Mail size={16} className="mr-2" /> {user.email}
                </p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors"
                >
                  <Edit size={16} className="mr-2" />
                  Chỉnh sửa thông tin
                </button>
              )}
            </div>

            {!isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Thông tin cá nhân</h2>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Họ tên</p>
                        <p className="font-medium text-gray-800">{user.fullName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-800">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Vai trò</p>
                        <p className="font-medium text-gray-800 capitalize">{user.role}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Thông tin liên hệ</h2>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Số điện thoại</p>
                        <div className="flex items-center">
                          <Phone size={16} className="text-gray-400 mr-2" />
                          <p className="font-medium text-gray-800">
                            {user.phoneNumber || 'Chưa cập nhật'}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Địa chỉ</p>
                        <div className="flex items-start">
                          <MapPin size={16} className="text-gray-400 mr-2 mt-1" />
                          <p className="font-medium text-gray-800">
                            {user.address || 'Chưa cập nhật'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8">
                {updateSuccess && (
                  <div className="mb-6 p-4 rounded-md bg-green-50 text-green-700 flex items-center">
                    <CheckCircle size={20} className="mr-2 text-green-500" />
                    <span>Cập nhật thông tin thành công!</span>
                  </div>
                )}
                
                {/* Thêm thông báo cho người dùng khi đến từ trang checkout */}
                {fromCheckout && (
                  <div className="mb-6 p-4 rounded-md bg-blue-50 border border-blue-100 text-blue-800">
                    <div className="flex">
                      <ShoppingCart className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Bạn đến từ trang thanh toán</p>
                        <p className="mt-1 text-sm">
                          Sau khi cập nhật thông tin, bạn có thể quay lại trang thanh toán để hoàn tất đơn hàng.
                        </p>
                        <button 
                          type="button"
                          onClick={() => navigate('/checkout')}
                          className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none flex items-center"
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Quay lại thanh toán
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-700 mb-4">Thông tin cá nhân</h2>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                            Họ tên <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={user.email}
                            disabled
                            className="w-full px-4 py-2 border border-gray-200 bg-gray-100 rounded-md text-gray-500 cursor-not-allowed"
                          />
                          <p className="mt-1 text-xs text-gray-500">Email không thể thay đổi</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-700 mb-4">Thông tin liên hệ</h2>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Số điện thoại
                          </label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                              <Phone size={16} />
                            </span>
                            <input
                              type="tel"
                              id="phoneNumber"
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Địa chỉ
                          </label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                              <MapPin size={16} />
                            </span>
                            <input
                              type="text"
                              id="address"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-8">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <X size={16} className="inline mr-1" />
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !hasChanges()}
                    className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${!hasChanges() ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang lưu...
                      </>
                    ) : (
                      <>
                        <Save size={16} className="inline mr-1" />
                        Lưu thay đổi
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      
      <AlertDialog 
        title="Xác nhận hủy thay đổi"
        description="Bạn có những thay đổi chưa được lưu. Bạn có chắc chắn muốn hủy bỏ các thay đổi này không?"
        open={showAlertDialog}
        onOpenChange={setShowAlertDialog}
        onConfirm={confirmCancel}
        confirmText="Hủy thay đổi"
        cancelText="Tiếp tục chỉnh sửa"
        variant="danger"
      />
      
      {/* Hiển thị thông báo sau khi cập nhật thành công từ checkout */}
      {updateSuccess && fromCheckout && (
        <div className="fixed bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg border border-green-100 w-72 animate-fade-in">
          <div className="flex">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-800">Cập nhật thông tin thành công!</p>
              <p className="mt-1 text-sm text-gray-600">
                Bạn có thể quay lại trang thanh toán để hoàn tất đơn hàng.
              </p>
              <button 
                onClick={() => navigate('/checkout')}
                className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 w-full"
              >
                Quay lại thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 