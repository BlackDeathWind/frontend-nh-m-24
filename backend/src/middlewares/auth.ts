import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { AppError } from './errorHandler';
import { redisClient } from '../config/redis';

// Mở rộng interface Request để thêm thuộc tính user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

interface JwtPayload {
  id: string;
  role: string;
  iat: number;
  exp: number;
  [key: string]: any;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1) Lấy token từ header
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(new AppError('Bạn chưa đăng nhập! Vui lòng đăng nhập để truy cập.', 401));
    }

    // 2) Xác minh token
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
    } catch (err) {
      return next(new AppError('Token không hợp lệ hoặc đã hết hạn.', 401));
    }

    // 3) Kiểm tra xem token có trong danh sách hết hạn không (đã đăng xuất)
    // Bỏ qua kiểm tra blacklist nếu SKIP_REDIS=true
    if (process.env.SKIP_REDIS !== 'true') {
      try {
        const isBlacklisted = await redisClient.get(`blacklist:${token}`);
        if (isBlacklisted) {
          return next(new AppError('Token không hợp lệ. Vui lòng đăng nhập lại.', 401));
        }
      } catch (error) {
        console.warn('Không thể kiểm tra blacklist token, bỏ qua bước này');
      }
    }

    // 4) Kiểm tra user có tồn tại không - tạm thời bỏ qua, sẽ thêm khi có model User
    // const user = await User.findByPk(decoded.id);
    // if (!user) {
    //   return next(new AppError('Người dùng không tồn tại.', 401));
    // }

    // 5) Kiểm tra mật khẩu thay đổi sau khi token được cấp - tạm thời bỏ qua

    // Lưu user vào request để sử dụng sau này
    req.user = decoded;
    next();
  } catch (error: any) {
    return next(new AppError(error.message || 'Lỗi xác thực. Vui lòng đăng nhập lại.', 401));
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // roles: ['admin', 'manager']
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('Bạn không có quyền thực hiện hành động này.', 403));
    }
    next();
  };
}; 