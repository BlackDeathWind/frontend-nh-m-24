import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import ProfilePage from './pages/auth/profile';
import HomePage from './pages/home';
import ProductsPage from './pages/products';
import ProductDetailPage from './pages/product-detail';
import CartPage from './pages/cart';
import CheckoutPage from './pages/checkout';
import DashboardLayout from './components/dashboard/DashboardLayout';
import AdminDashboard from './pages/admin/dashboard';
import SellerDashboard from './pages/seller/dashboard';
import ProductsManagement from './pages/admin/products';
import { ToastContainer } from './components/ui/toast-container';
import { useAuth } from './lib/auth-context';

// Component dùng để chuyển hướng dựa trên vai trò
function DashboardRedirect() {
  const { user } = useAuth();
  
  if (user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  } else if (user?.role === 'seller') {
    return <Navigate to="/seller/dashboard" replace />;
  } else {
    return <Navigate to="/" replace />;
  }
}

function App() {
  return (
    <>
      {/* Public Routes - Hiển thị Navbar */}
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Outlet />
              <ToastContainer />
            </>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="profile" element={<ProfilePage />} />
          {/* Route mới để chuyển hướng đến dashboard dựa trên vai trò */}
          <Route path="dashboard" element={<DashboardRedirect />} />
        </Route>

        {/* Admin Dashboard Routes - Không hiển thị Navbar */}
        <Route path="/admin" element={<DashboardLayout requiredRole="admin" />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<ProductsManagement />} />
          {/* Thêm các routes admin khác ở đây */}
        </Route>

        {/* Seller Dashboard Routes - Không hiển thị Navbar */}
        <Route path="/seller" element={<DashboardLayout requiredRole="seller" />}>
          <Route index element={<Navigate to="/seller/dashboard" replace />} />
          <Route path="dashboard" element={<SellerDashboard />} />
          {/* Thêm các routes seller khác ở đây */}
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;