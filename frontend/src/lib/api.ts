import axios from 'axios';

// API cơ sở URL từ biến môi trường
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Tạo axios instance với cấu hình chung
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Để gửi cookie CSRF và JWT
});

// Thêm interceptor để xử lý token trong header khi gửi request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API Authentication
export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      // Lưu token vào localStorage
      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (userData: {
    email: string;
    password: string;
    fullName: string;
    phoneNumber?: string;
    address?: string;
  }) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('token');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  updateProfile: async (userData: {
    fullName: string;
    phoneNumber?: string;
    address?: string;
  }) => {
    try {
      const response = await api.put('/auth/profile', userData);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },
};

// API Sản phẩm (khi backend triển khai API này)
export const productAPI = {
  getProducts: async (filters?: any) => {
    try {
      const response = await api.get('/products', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Get products error:', error);
      throw error;
    }
  },

  getProductById: async (id: string) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Get product ${id} error:`, error);
      throw error;
    }
  },

  // Thêm API để lấy mock data từ backend
  getMockProducts: async () => {
    try {
      const response = await api.get('/mock/products');
      return response.data;
    } catch (error) {
      console.error('Get mock products error:', error);
      throw error;
    }
  },

  getMockAdminProducts: async () => {
    try {
      const response = await api.get('/mock/admin-products');
      return response.data;
    } catch (error) {
      console.error('Get mock admin products error:', error);
      throw error;
    }
  }
};

// API Dashboard (sử dụng mock data từ backend)
export const dashboardAPI = {
  getMockDashboardData: async () => {
    try {
      const response = await api.get('/mock/dashboard');
      return response.data;
    } catch (error) {
      console.error('Get mock dashboard data error:', error);
      throw error;
    }
  },

  getMockSellerDashboardData: async () => {
    try {
      const response = await api.get('/mock/seller-dashboard');
      return response.data;
    } catch (error) {
      console.error('Get mock seller dashboard data error:', error);
      throw error;
    }
  }
};

// API Giỏ hàng (khi backend triển khai API này)
export const cartAPI = {
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      console.error('Get cart error:', error);
      throw error;
    }
  },

  addToCart: async (productId: string, quantity: number) => {
    try {
      const response = await api.post('/cart/items', { productId, quantity });
      return response.data;
    } catch (error) {
      console.error('Add to cart error:', error);
      throw error;
    }
  },

  updateCartItem: async (productId: string, quantity: number) => {
    try {
      const response = await api.put(`/cart/items/${productId}`, { quantity });
      return response.data;
    } catch (error) {
      console.error('Update cart item error:', error);
      throw error;
    }
  },

  removeFromCart: async (productId: string) => {
    try {
      const response = await api.delete(`/cart/items/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Remove from cart error:', error);
      throw error;
    }
  },
};

// API Đơn hàng
export const orderAPI = {
  createOrder: async (orderData: {
    items: {
      productId: string;
      quantity: number;
    }[];
    shippingAddress: string;
    paymentMethod: 'cod' | 'digital';
    notes?: string;
    digitalWallet?: 'momo' | 'zalopay' | 'vnpay';
  }) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Create order error:', error);
      throw error;
    }
  },

  getOrders: async () => {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Get orders error:', error);
      throw error;
    }
  },

  getOrderById: async (id: string) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Get order ${id} error:`, error);
      throw error;
    }
  },

  cancelOrder: async (id: string) => {
    try {
      const response = await api.put(`/orders/${id}/cancel`);
      return response.data;
    } catch (error) {
      console.error(`Cancel order ${id} error:`, error);
      throw error;
    }
  },

  // Thêm API để lấy mock order data từ backend
  getMockOrders: async () => {
    try {
      const response = await api.get('/mock/orders');
      return response.data;
    } catch (error) {
      console.error('Get mock orders error:', error);
      throw error;
    }
  }
};

// API Thanh toán
export const paymentAPI = {
  // Khởi tạo thanh toán qua ví điện tử
  initiateDigitalWalletPayment: async (
    orderId: string, 
    wallet: 'momo' | 'zalopay' | 'vnpay',
    returnUrl: string
  ) => {
    try {
      const response = await api.post(`/payments/digital-wallet`, {
        orderId,
        wallet,
        returnUrl
      });
      return response.data;
    } catch (error) {
      console.error('Digital wallet payment initiation error:', error);
      throw error;
    }
  },

  // Kiểm tra trạng thái thanh toán
  checkPaymentStatus: async (orderId: string) => {
    try {
      const response = await api.get(`/payments/status/${orderId}`);
      return response.data;
    } catch (error) {
      console.error(`Check payment status for order ${orderId} error:`, error);
      throw error;
    }
  },
};

// Xuất các API khác khi cần
export default api; 