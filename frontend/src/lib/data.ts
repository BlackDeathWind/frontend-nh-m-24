// Đây là file dùng để quản lý và truy xuất dữ liệu từ backend
// Hãy sử dụng các API từ api.ts để lấy dữ liệu

import { productAPI, dashboardAPI, orderAPI } from './api';

// Export các function getter để lấy dữ liệu từ backend
export const getProducts = () => productAPI.getProducts();
export const getProductById = (id: string) => productAPI.getProductById(Number(id));
export const getDashboardData = () => dashboardAPI.getDashboardData();
export const getSellerDashboardData = () => dashboardAPI.getSellerDashboardData();
export const getOrders = () => orderAPI.getOrders();

// Các biến sẽ được lấy từ API
let products = [];
let adminProducts = [];

// Tự động fetch dữ liệu khi import
if (typeof window !== 'undefined') {
  getProducts().then(response => {
    if (response.success && response.data) {
      products = response.data;
    }
  }).catch(err => console.error('Lỗi khi tải sản phẩm:', err));
}

export { products }; 