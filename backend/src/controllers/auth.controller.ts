import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';
import { successResponse, errorResponse } from '../utils/responseHandler';
import { isValidEmail, isValidPassword } from '../utils/validator';
import { AppError } from '../middlewares/errorHandler';
import logger from '../utils/logger';
import { mockAdminUser, mockSellerUser, mockTokens } from '../mocks';

// Mở rộng interface SessionData
declare module 'express-session' {
  interface SessionData {
    userId?: string;
    userRole?: string;
  }
}

// Hàm kiểm tra xem có đang bỏ qua DB hay không
const isSkipDB = () => process.env.SKIP_DB === 'true' && process.env.NODE_ENV === 'development';

const AuthController = {
  // Đăng ký
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, fullName, phoneNumber, address } = req.body;

      // Validation
      if (!email || !password || !fullName) {
        return next(new AppError('Vui lòng điền đầy đủ thông tin cần thiết.', 400));
      }

      if (!isValidEmail(email)) {
        return next(new AppError('Email không hợp lệ.', 400));
      }

      if (!isValidPassword(password)) {
        return next(
          new AppError('Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số.', 400)
        );
      }

      // Nếu đang bỏ qua DB, trả về user giả
      if (isSkipDB()) {
        return successResponse(res, mockAdminUser, 'Đăng ký tài khoản thành công (chế độ giả lập).', 201);
      }

      // Đăng ký người dùng thật với DB
      const user = await authService.register({
        email,
        password,
        fullName,
        phoneNumber,
        address,
      });

      return successResponse(res, user, 'Đăng ký tài khoản thành công.', 201);
    } catch (error) {
      next(error);
    }
  },

  // Đăng nhập
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
        return next(new AppError('Vui lòng nhập email và mật khẩu.', 400));
      }

      // Nếu đang bỏ qua DB, trả về kết quả giả
      if (isSkipDB()) {
        // Kiểm tra đăng nhập đơn giản cho môi trường phát triển
        if (email === 'admin@example.com' && password === 'Admin123!') {
          // Lưu thông tin vào session nếu session tồn tại
          if (req.session && process.env.SKIP_REDIS !== 'true') {
            req.session.userId = mockAdminUser.id;
            req.session.userRole = mockAdminUser.role;
          }

          // Đặt cookie JWT nếu cần
          if (process.env.SKIP_REDIS !== 'true') {
            res.cookie('jwt', mockTokens.adminToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 24 * 60 * 60 * 1000, // 1 ngày
            });
          }

          return successResponse(
            res, 
            { user: mockAdminUser, token: mockTokens.adminToken }, 
            'Đăng nhập thành công (chế độ giả lập).'
          );
        } else if (email === 'seller@example.com' && password === 'Seller123!') {
          // Lưu thông tin vào session nếu session tồn tại
          if (req.session && process.env.SKIP_REDIS !== 'true') {
            req.session.userId = mockSellerUser.id;
            req.session.userRole = mockSellerUser.role;
          }

          // Đặt cookie JWT nếu cần
          if (process.env.SKIP_REDIS !== 'true') {
            res.cookie('jwt', mockTokens.sellerToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 24 * 60 * 60 * 1000, // 1 ngày
            });
          }

          return successResponse(
            res, 
            { user: mockSellerUser, token: mockTokens.sellerToken }, 
            'Đăng nhập thành công (chế độ giả lập).'
          );
        } else {
          return next(new AppError('Email hoặc mật khẩu không chính xác.', 401));
        }
      }

      // Đăng nhập thật với DB
      const result = await authService.login({ email, password });

      // Lưu thông tin vào session nếu session tồn tại
      if (req.session && process.env.SKIP_REDIS !== 'true') {
        req.session.userId = result.user.id;
        req.session.userRole = result.user.role;
      }

      // Đặt cookie JWT nếu cần
      if (process.env.SKIP_REDIS !== 'true') {
        res.cookie('jwt', result.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 24 * 60 * 60 * 1000, // 1 ngày
        });
      }

      return successResponse(res, result, 'Đăng nhập thành công.');
    } catch (error) {
      next(error);
    }
  },

  // Đăng xuất
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      let token = '';
      // Lấy token từ header hoặc cookie
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      } else if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
      }

      if (token && process.env.SKIP_REDIS !== 'true' && !isSkipDB()) {
        // Đăng xuất bằng cách đưa token vào blacklist
        await authService.logout(token);
      }

      // Xóa session nếu có
      if (req.session && process.env.SKIP_REDIS !== 'true') {
        req.session.destroy((err) => {
          if (err) {
            logger.error(`Error destroying session: ${err}`);
          }
        });
      }

      // Xóa cookie nếu không bỏ qua Redis
      if (process.env.SKIP_REDIS !== 'true') {
        res.clearCookie('jwt');
      }

      return successResponse(res, null, 'Đăng xuất thành công.');
    } catch (error) {
      next(error);
    }
  },

  // Lấy profile của người dùng hiện tại
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user || !req.user.id) {
        return next(new AppError('Không tìm thấy thông tin người dùng.', 401));
      }

      // Nếu đang bỏ qua DB, trả về user giả
      if (isSkipDB()) {
        // Kiểm tra xem có phải là tài khoản seller không
        if (req.user && req.user.role === 'seller') {
          return successResponse(
            res, 
            mockSellerUser, 
            'Lấy thông tin người dùng thành công (chế độ giả lập).'
          );
        }
        
        return successResponse(
          res, 
          mockAdminUser, 
          'Lấy thông tin người dùng thành công (chế độ giả lập).'
        );
      }

      // Lấy thông tin người dùng thật từ DB
      const user = await authService.getUserFromToken(req.user.id);
      return successResponse(res, user, 'Lấy thông tin người dùng thành công.');
    } catch (error) {
      next(error);
    }
  },

  // Cập nhật thông tin người dùng
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user || !req.user.id) {
        return next(new AppError('Không tìm thấy thông tin người dùng.', 401));
      }

      const { fullName, phoneNumber, address } = req.body;
      
      // Kiểm tra các trường dữ liệu
      if (!fullName) {
        return next(new AppError('Họ tên không được để trống.', 400));
      }

      // Nếu đang bỏ qua DB, trả về user giả đã cập nhật
      if (isSkipDB()) {
        // Xác định user cần cập nhật dựa trên role
        const baseUser = req.user && req.user.role === 'seller' ? mockSellerUser : mockAdminUser;
        
        // Cập nhật thông tin user
        const updatedUser = { 
          ...baseUser,
          fullName: fullName || baseUser.fullName,
          phoneNumber: phoneNumber || '',
          address: address || '',
          updatedAt: new Date()
        };

        return successResponse(
          res, 
          updatedUser, 
          'Cập nhật thông tin người dùng thành công (chế độ giả lập).'
        );
      }

      // Cập nhật thông tin người dùng thật từ DB
      const updatedUser = await authService.updateUserProfile(req.user.id, {
        fullName,
        phoneNumber,
        address
      });

      return successResponse(res, updatedUser, 'Cập nhật thông tin người dùng thành công.');
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController; 