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
    userType?: string;
    vaiTroId?: number;
  }
}

// Mở rộng interface Request
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        vaiTroId: string;
        userType: string;
      };
    }
  }
}

// Interfaces cho user response
interface IUserResponse {
  [key: string]: any; // Để có thể truy cập thuộc tính với string index
  MaKH?: string;
  MaNV?: string;
  MaVaiTro?: number;
}

// Hàm kiểm tra xem có đang bỏ qua DB hay không
const isSkipDB = () => process.env.SKIP_DB === 'true' && process.env.NODE_ENV === 'development';

const AuthController = {
  // Đăng ký
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, fullName, phoneNumber } = req.body;

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
        Email: email,
        MatKhau: password,
        HoTen: fullName,
        SoDienThoai: phoneNumber,
        MaVaiTro: 1, // Vai trò mặc định khách hàng
      });

      return successResponse(res, user, 'Đăng ký tài khoản thành công.', 201);
    } catch (error) {
      next(error);
    }
  },

  // Đăng nhập
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, isAdmin } = req.body;

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
            req.session.userType = 'admin';
            req.session.vaiTroId = 1;
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
            req.session.userType = 'admin';
            req.session.vaiTroId = 2;
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
      const result = await authService.login({ 
        Email: email, 
        MatKhau: password,
        isAdmin: isAdmin === true
      });

      // Lưu thông tin vào session nếu session tồn tại
      if (req.session && process.env.SKIP_REDIS !== 'true') {
        const userObj = result.user as IUserResponse;
        req.session.userId = isAdmin ? userObj.MaNV : userObj.MaKH;
        req.session.userType = isAdmin ? 'admin' : 'customer';
        req.session.vaiTroId = userObj.MaVaiTro;
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
        if (req.user && req.user.userType === 'admin') {
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
      const user = await authService.getUserFromToken(req.user.id, req.user.userType);
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

      const { hoTen, soDienThoai } = req.body;
      
      // Kiểm tra các trường dữ liệu
      if (!hoTen) {
        return next(new AppError('Họ tên không được để trống.', 400));
      }

      // Nếu đang bỏ qua DB, trả về user giả đã cập nhật
      if (isSkipDB()) {
        // Xác định user cần cập nhật dựa trên role
        const baseUser = req.user && req.user.userType === 'admin' ? mockSellerUser : mockAdminUser;
        
        // Cập nhật thông tin user
        const updatedUser = { 
          ...baseUser,
          hoTen: hoTen || baseUser.fullName,
          soDienThoai: soDienThoai || '',
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
        HoTen: hoTen,
        SoDienThoai: soDienThoai,
      }, req.user.userType);

      return successResponse(res, updatedUser, 'Cập nhật thông tin người dùng thành công.');
    } catch (error) {
      next(error);
    }
  }
};

export default AuthController; 