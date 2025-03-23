import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import HomePage from './pages/home';
import ProductsPage from './pages/products';
import ProductDetailPage from './pages/product-detail';
import CartPage from './pages/cart';
import { CartProvider } from './lib/cart-context';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;