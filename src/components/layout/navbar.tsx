import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { isLoggedIn, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">Modern Stationery</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-blue-600">
              Sản phẩm
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">
              Giới thiệu
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">
              Liên hệ
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <div className="relative">
              <Button variant="ghost" onClick={() => navigate('/cart')}>
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>
            
            {isLoggedIn ? (
              <>
                <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                  <User className="h-5 w-5" />
                  <span className="ml-2 text-sm">{user?.name}</span>
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => navigate('/login')}>
                  Đăng nhập
                </Button>
                <Button onClick={() => navigate('/register')}>
                  Đăng ký
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <div className="mr-4 relative">
              <Button variant="ghost" onClick={() => navigate('/cart')}>
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center"
            >
              <span className="sr-only">Mở menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 pb-3 pt-2">
            <Link
              to="/products"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            >
              Sản phẩm
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            >
              Giới thiệu
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            >
              Liên hệ
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                >
                  Tài khoản
                </Link>
                <button
                  className="block w-full px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}