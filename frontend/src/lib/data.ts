// Đây là file dùng để quản lý và truy xuất dữ liệu từ backend
// Tất cả mock data đã được chuyển sang backend
// Hãy sử dụng các API từ api.ts để lấy dữ liệu

import { productAPI, dashboardAPI, orderAPI } from './api';

// Export các function getter để lấy dữ liệu từ backend
export const getProducts = () => productAPI.getMockProducts();
export const getAdminProducts = () => productAPI.getMockAdminProducts();
export const getDashboardData = () => dashboardAPI.getMockDashboardData();
export const getSellerDashboardData = () => dashboardAPI.getMockSellerDashboardData();
export const getOrders = () => orderAPI.getMockOrders();

// Các export dưới đây chỉ để tương thích ngược với code cũ
// TODO: Cập nhật tất cả component để sử dụng API bất đồng bộ thay vì mock data trực tiếp

// Export mock data trực tiếp - CHỈ DÙNG CHO TƯƠNG THÍCH NGƯỢC
// Lấy dữ liệu mẫu từ backend khi component mount
let products = [];
let adminProducts = [];

// Tự động fetch dữ liệu khi import
if (typeof window !== 'undefined') {
  getProducts().then(response => {
    if (response.success && response.data) {
      products = response.data;
    }
  }).catch(err => console.error('Lỗi khi tải mock products:', err));
  
  getAdminProducts().then(response => {
    if (response.success && response.data) {
      adminProducts = response.data;
    }
  }).catch(err => console.error('Lỗi khi tải mock admin products:', err));
}

export { products, adminProducts }; 