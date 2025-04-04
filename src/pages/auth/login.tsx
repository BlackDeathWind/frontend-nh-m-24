import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { useNotification } from '@/lib/notification-context';

interface LoginForm {
  identifier: string;
  password: string;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showNotification } = useNotification();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const success = await login(data.identifier, data.password);
      
      if (success) {
        showNotification('success', 'Đăng nhập thành công!');
        navigate('/');
      } else {
        showNotification('error', 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.');
      }
    } catch (error) {
      showNotification('error', 'Có lỗi xảy ra khi đăng nhập.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Đăng nhập vào tài khoản
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
                Email hoặc Số điện thoại
              </label>
              <div className="mt-1">
                <Input
                  id="identifier"
                  type="text"
                  {...register('identifier', {
                    required: 'Email hoặc số điện thoại là bắt buộc',
                    validate: value => {
                      // Kiểm tra nếu là email
                      const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
                      // Kiểm tra nếu là số điện thoại Việt Nam
                      const isPhone = /^(0|\+84)(\d{9,10})$/.test(value);
                      return (isEmail || isPhone) || 'Email hoặc số điện thoại không hợp lệ';
                    }
                  })}
                />
                {errors.identifier && (
                  <p className="mt-1 text-sm text-red-600">{errors.identifier.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <div className="mt-1 relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Mật khẩu là bắt buộc',
                    minLength: {
                      value: 6,
                      message: 'Mật khẩu phải có ít nhất 6 ký tự'
                    }
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full flex justify-center" size="lg">
                <LogIn className="mr-2 h-5 w-5" />
                Đăng nhập
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Hoặc</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                variant="outline"
                className="flex items-center justify-center"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Quay lại
              </Button>
              
              <div className="text-sm text-center">
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  Chưa có tài khoản? Đăng ký ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}