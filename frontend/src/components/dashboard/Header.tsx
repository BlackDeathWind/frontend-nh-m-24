import { useState, useRef, useEffect } from 'react';
import { Bell, Menu, Search, User, Moon, Sun, ChevronDown } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export default function Header({ toggleSidebar, toggleTheme, isDarkMode }: HeaderProps) {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Mock notifications
  const notifications = [
    {
      id: 1,
      message: 'Có 5 đơn hàng mới cần xử lý',
      time: '5 phút trước',
      read: false,
    },
    {
      id: 2,
      message: 'Sản phẩm "Bút bi cao cấp" sắp hết hàng',
      time: '1 giờ trước',
      read: false,
    },
    {
      id: 3,
      message: 'Có đánh giá mới cho sản phẩm của bạn',
      time: '3 giờ trước',
      read: true,
    },
  ];

  // Handle outside click to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleLogout = () => {
    logout();
  };

  const unreadNotifications = notifications.filter(notification => !notification.read).length;

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 focus:outline-none mr-4"
        >
          <Menu size={24} />
        </button>

        <form onSubmit={handleSearch} className="hidden md:flex">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleTheme}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Bell size={20} />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-200">
              <div className="py-2 px-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <span className="font-medium text-gray-700">Thông báo</span>
                <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                  Đánh dấu tất cả đã đọc
                </span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  <div>
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={cn(
                          "px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer",
                          !notification.read && "bg-blue-50"
                        )}
                      >
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center text-gray-500">
                    Không có thông báo nào
                  </div>
                )}
              </div>
              <div className="py-2 px-4 bg-gray-50 border-t border-gray-200 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Xem tất cả thông báo
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <User size={18} />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium text-gray-700">{user?.fullName || 'User'}</div>
              <div className="text-xs text-gray-500">{user?.role === 'admin' ? 'Quản trị viên' : 'Nhân viên bán hàng'}</div>
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-200">
              <div className="py-2">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Hồ sơ cá nhân
                </Link>
                <Link to="/profile/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Cài đặt tài khoản
                </Link>
                <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Trở về trang chủ
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <button 
                  onClick={handleLogout} 
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 