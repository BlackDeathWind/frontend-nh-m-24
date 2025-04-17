import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import { useNotification } from '@/lib/notification-context';
import { ChevronLeft, CreditCard, Truck, Check, AlertCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const { isLoggedIn, user } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phoneNumber || '',
    address: user?.address || '',
    city: '',
    district: '',
    ward: '',
    paymentMethod: 'cod',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shippingFee = 30000;
  const finalTotal = totalPrice + shippingFee;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND', 
      minimumFractionDigits: 0 
    }).format(price);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên';
    if (!formData.email.trim()) newErrors.email = 'Vui lòng nhập email';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email không hợp lệ';
    
    if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
    else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) 
      newErrors.phone = 'Số điện thoại không hợp lệ';
    
    if (!formData.address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ';
    if (!formData.city.trim()) newErrors.city = 'Vui lòng chọn tỉnh/thành phố';
    if (!formData.district.trim()) newErrors.district = 'Vui lòng chọn quận/huyện';
    if (!formData.ward.trim()) newErrors.ward = 'Vui lòng chọn phường/xã';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      showNotification('warning', 'Vui lòng đăng nhập để tiếp tục thanh toán');
      navigate('/login');
      return;
    }
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Mô phỏng gửi đơn hàng đến server
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Nếu thành công
      showNotification('success', 'Đặt hàng thành công! Cảm ơn bạn đã mua sắm');
      clearCart();
      navigate('/profile');
    } catch (error) {
      showNotification('error', 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Chuyển hướng nếu giỏ hàng trống
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  // Chuyển hướng người dùng chưa đăng nhập
  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Thanh toán</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form thông tin thanh toán */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Thông tin giao hàng</h2>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Họ và tên
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="fullName"
                          id="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`block w-full rounded-md sm:text-sm ${
                            errors.fullName 
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`block w-full rounded-md sm:text-sm ${
                            errors.email 
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Số điện thoại
                      </label>
                      <div className="mt-1">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`block w-full rounded-md sm:text-sm ${
                            errors.phone 
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                          }`}
                        />
                        {errors.phone && (
                          <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Địa chỉ
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={formData.address}
                          onChange={handleChange}
                          className={`block w-full rounded-md sm:text-sm ${
                            errors.address 
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                          }`}
                        />
                        {errors.address && (
                          <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        Tỉnh/Thành phố
                      </label>
                      <div className="mt-1">
                        <select
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`block w-full rounded-md sm:text-sm ${
                            errors.city 
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                          }`}
                        >
                          <option value="">Chọn Tỉnh/Thành phố</option>
                          <option value="hanoi">Hà Nội</option>
                          <option value="hochiminh">TP. Hồ Chí Minh</option>
                          <option value="danang">Đà Nẵng</option>
                          <option value="haiphong">Hải Phòng</option>
                          <option value="cantho">Cần Thơ</option>
                        </select>
                        {errors.city && (
                          <p className="mt-2 text-sm text-red-600">{errors.city}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                        Quận/Huyện
                      </label>
                      <div className="mt-1">
                        <select
                          id="district"
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
                          className={`block w-full rounded-md sm:text-sm ${
                            errors.district 
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                          }`}
                        >
                          <option value="">Chọn Quận/Huyện</option>
                          <option value="district1">Quận 1</option>
                          <option value="district2">Quận 2</option>
                          <option value="district3">Quận 3</option>
                          <option value="district4">Quận 4</option>
                          <option value="district5">Quận 5</option>
                        </select>
                        {errors.district && (
                          <p className="mt-2 text-sm text-red-600">{errors.district}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="ward" className="block text-sm font-medium text-gray-700">
                        Phường/Xã
                      </label>
                      <div className="mt-1">
                        <select
                          id="ward"
                          name="ward"
                          value={formData.ward}
                          onChange={handleChange}
                          className={`block w-full rounded-md sm:text-sm ${
                            errors.ward 
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                          }`}
                        >
                          <option value="">Chọn Phường/Xã</option>
                          <option value="ward1">Phường 1</option>
                          <option value="ward2">Phường 2</option>
                          <option value="ward3">Phường 3</option>
                          <option value="ward4">Phường 4</option>
                          <option value="ward5">Phường 5</option>
                        </select>
                        {errors.ward && (
                          <p className="mt-2 text-sm text-red-600">{errors.ward}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                      Ghi chú
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="notes"
                        name="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Phương thức thanh toán</h2>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center">
                    <input
                      id="payment-cod"
                      name="paymentMethod"
                      type="radio"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="payment-cod" className="ml-3 block text-sm font-medium text-gray-700">
                      Thanh toán khi nhận hàng (COD)
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="payment-banking"
                      name="paymentMethod"
                      type="radio"
                      checked={formData.paymentMethod === 'banking'}
                      onChange={() => setFormData(prev => ({ ...prev, paymentMethod: 'banking' }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="payment-banking" className="ml-3 block text-sm font-medium text-gray-700">
                      Chuyển khoản ngân hàng
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="payment-credit"
                      name="paymentMethod"
                      type="radio"
                      checked={formData.paymentMethod === 'credit'}
                      onChange={() => setFormData(prev => ({ ...prev, paymentMethod: 'credit' }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="payment-credit" className="ml-3 block text-sm font-medium text-gray-700">
                      Thẻ tín dụng/Ghi nợ
                    </label>
                  </div>

                  {formData.paymentMethod === 'banking' && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <AlertCircle className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-gray-800">Thông tin chuyển khoản</h3>
                          <div className="mt-2 text-sm text-gray-600">
                            <p>Ngân hàng: VietcomBank</p>
                            <p>Số tài khoản: 1234567890</p>
                            <p>Chủ tài khoản: CÔNG TY CỔ PHẦN THƯƠNG MẠI ĐIỆN TỬ</p>
                            <p>Nội dung: [Họ tên] thanh toán đơn hàng</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'credit' && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <CreditCard className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-gray-800">Thanh toán bằng thẻ</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Chúng tôi hỗ trợ thanh toán qua Visa, Mastercard, JCB
                          </p>
                          <div className="mt-2 flex space-x-2">
                            <div className="h-8 w-12 bg-gray-200 rounded"></div>
                            <div className="h-8 w-12 bg-gray-200 rounded"></div>
                            <div className="h-8 w-12 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tóm tắt đơn hàng chỉ hiển thị ở màn hình nhỏ */}
              <div className="lg:hidden mb-6">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Tóm tắt đơn hàng</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">Tạm tính ({totalItems} sản phẩm)</p>
                      <p className="text-sm font-medium text-gray-900">{formatPrice(totalPrice)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">Phí vận chuyển</p>
                      <p className="text-sm font-medium text-gray-900">{formatPrice(shippingFee)}</p>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                      <p className="text-base font-medium text-gray-900">Tổng cộng</p>
                      <p className="text-base font-bold text-blue-600">{formatPrice(finalTotal)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                  </>
                ) : 'Hoàn tất đặt hàng'}
              </button>
            </form>
          </div>

          {/* Tóm tắt đơn hàng chỉ hiển thị ở màn hình lớn */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg shadow sticky top-24">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Tóm tắt đơn hàng</h2>
              </div>
              
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flow-root">
                  <ul className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <li key={item.product.id} className="py-3 flex">
                        <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-gray-900">
                              {item.product.name}
                            </h3>
                            <p className="text-sm font-medium text-gray-900">
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-gray-500">SL: {item.quantity}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Tạm tính ({totalItems} sản phẩm)</p>
                  <p className="text-sm font-medium text-gray-900">{formatPrice(totalPrice)}</p>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <p className="text-sm text-gray-600">Phí vận chuyển</p>
                    <div className="ml-2 group relative">
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-200 text-xs text-gray-600 cursor-help">?</span>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        Phí vận chuyển cố định 30.000đ cho mọi đơn hàng.
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{formatPrice(shippingFee)}</p>
                </div>
                
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <p className="text-base font-medium text-gray-900">Tổng cộng</p>
                  <p className="text-base font-bold text-blue-600">{formatPrice(finalTotal)}</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-md p-4 flex items-start">
                  <div className="flex-shrink-0">
                    <Truck className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-800">Thông tin vận chuyển</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Đơn hàng sẽ được giao trong vòng 3-5 ngày làm việc kể từ khi xác nhận thanh toán thành công.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center mt-4 text-center">
                  <p className="text-xs text-gray-500">Chúng tôi chấp nhận</p>
                  <div className="mt-2 flex justify-center space-x-2">
                    <div className="h-6 w-10 bg-gray-200 rounded"></div>
                    <div className="h-6 w-10 bg-gray-200 rounded"></div>
                    <div className="h-6 w-10 bg-gray-200 rounded"></div>
                    <div className="h-6 w-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 