import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const isLoggedIn = user !== null;

  // Mô phỏng đăng nhập - trong thực tế sẽ gọi API
  const login = async (email: string, password: string): Promise<boolean> => {
    // Giả lập việc gọi API
    // Trong dự án thực tế, thay thế bằng gọi API thực sự
    try {
      // Mô phỏng đăng nhập thành công
      if (email && password.length >= 6) {
        const mockUser: User = {
          id: '1',
          name: 'Người dùng',
          email: email,
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      return false;
    }
  };

  // Mô phỏng đăng ký - trong thực tế sẽ gọi API
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Giả lập việc gọi API
    // Trong dự án thực tế, thay thế bằng gọi API thực sự
    try {
      // Mô phỏng đăng ký thành công
      if (name && email && password.length >= 6) {
        const mockUser: User = {
          id: '1',
          name: name,
          email: email,
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Kiểm tra người dùng đã đăng nhập từ localStorage khi khởi động
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Lỗi khi phân tích dữ liệu người dùng từ localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const value = {
    user,
    isLoggedIn,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}; 