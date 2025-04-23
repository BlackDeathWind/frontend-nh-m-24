import express from 'express';
import { 
  mockProducts, MockProduct,
  mockAdminProducts, 
  mockRevenueData, mockTopProducts, mockRecentOrders, mockLowStockProducts, mockDashboardStats,
  mockSellerRevenueData, mockSellerProducts, mockSellerOrders, mockSellerLowStockProducts, mockSellerStats,
  mockOrders
} from '../mocks';

// Chuyển đổi dữ liệu từ MockProduct sang Product type trong frontend
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  stock: number;
  rating: number;
  reviews: number;
  features?: string[];
}

const router = express.Router();

// Route để lấy tất cả sản phẩm theo định dạng frontend
router.get('/products', (req, res) => {
  try {
    // Chuyển đổi mockProducts sang định dạng Product cho frontend
    const products: Product[] = mockProducts.map((product: MockProduct) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.categories[0], // Lấy category đầu tiên
      imageUrl: product.images[0], // Lấy image đầu tiên
      stock: product.stock,
      rating: product.rating,
      reviews: product.reviewCount,
      features: product.features
    }));

    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error getting mock products:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Route để lấy sản phẩm backend raw
router.get('/products-raw', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: mockProducts
    });
  } catch (error) {
    console.error('Error getting raw mock products:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Route để lấy admin products
router.get('/admin-products', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: mockAdminProducts
    });
  } catch (error) {
    console.error('Error getting mock admin products:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Route để lấy dashboard data
router.get('/dashboard', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        revenueData: mockRevenueData,
        topProducts: mockTopProducts,
        recentOrders: mockRecentOrders,
        lowStockProducts: mockLowStockProducts,
        dashboardStats: mockDashboardStats
      }
    });
  } catch (error) {
    console.error('Error getting mock dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Route để lấy seller dashboard data
router.get('/seller-dashboard', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        sellerRevenueData: mockSellerRevenueData,
        sellerProducts: mockSellerProducts,
        sellerOrders: mockSellerOrders,
        sellerLowStockProducts: mockSellerLowStockProducts,
        sellerStats: mockSellerStats
      }
    });
  } catch (error) {
    console.error('Error getting mock seller dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Route để lấy orders data
router.get('/orders', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: mockOrders
    });
  } catch (error) {
    console.error('Error getting mock orders:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router; 