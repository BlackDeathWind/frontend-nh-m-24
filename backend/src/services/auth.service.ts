import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { KhachHang, NhanVien } from '../models';
import { AppError } from '../middlewares/errorHandler';
import config from '../config/config';
import { redisClient } from '../config/redis';
import logger from '../utils/logger';
import { SignOptions } from 'jsonwebtoken';

interface IUserCreate {
  HoTen: string;
  Email: string;
  MatKhau: string;
  SoDienThoai?: string;
  MaVaiTro?: number;
}

interface IUserLogin {
  Email: string;
  MatKhau: string;
  isAdmin?: boolean;
}

interface IUserUpdate {
  HoTen?: string;
  SoDienThoai?: string;
}

class AuthService {
  /**
   * Đăng ký khách hàng mới
   */
  async register(userData: IUserCreate) {
    try {
      // Kiểm tra xem email đã tồn tại chưa
      const existingUser = await KhachHang.findOne({ where: { Email: userData.Email } });
      if (existingUser) {
        throw new AppError('Email đã được sử dụng. Vui lòng chọn email khác.', 400);
      }

      // Tạo người dùng mới
      const newUser = await KhachHang.create({
        ...userData,
        MaVaiTro: userData.MaVaiTro || 1, // Vai trò mặc định là khách hàng
        NgayDangKy: new Date(),
        TrangThai: true
      });

      // Không trả về mật khẩu
      const userWithoutPassword = { ...newUser.toJSON() };
      if ('MatKhau' in userWithoutPassword) {
        delete (userWithoutPassword as any).MatKhau;
      }

      return userWithoutPassword;
    } catch (error) {
      logger.error(`Error in register service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.', 500);
    }
  }

  /**
   * Đăng nhập người dùng/quản trị
   */
  async login(credentials: IUserLogin) {
    try {
      let user: KhachHang | NhanVien | null = null;
      let role: string;
      let userId: string = '';

      // Kiểm tra đăng nhập cho quản trị viên hoặc khách hàng
      if (credentials.isAdmin) {
        // Tìm nhân viên
        user = await NhanVien.findOne({ where: { Email: credentials.Email } });
        role = 'admin';
        if (user) {
          userId = user.MaNV;
        }
      } else {
        // Tìm khách hàng
        user = await KhachHang.findOne({ where: { Email: credentials.Email } });
        role = 'customer';
        if (user) {
          userId = user.MaKH;
        }
      }

      if (!user) {
        throw new AppError('Email hoặc mật khẩu không chính xác.', 401);
      }

      // Kiểm tra mật khẩu
      const isPasswordCorrect = await user.comparePassword(credentials.MatKhau);
      if (!isPasswordCorrect) {
        throw new AppError('Email hoặc mật khẩu không chính xác.', 401);
      }

      // Kiểm tra người dùng có bị khóa không
      if (!user.TrangThai) {
        throw new AppError('Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.', 403);
      }

      // Cập nhật thời gian đăng nhập cuối
      if (credentials.isAdmin) {
        await (user as NhanVien).update({ LanDangNhapCuoi: new Date() });
      } else {
        await (user as KhachHang).update({ LanDangNhapCuoi: new Date() });
      }

      // Tạo JWT token
      const token = this.generateToken(userId, String(user.MaVaiTro), role);

      // Không trả về mật khẩu
      const userWithoutPassword = { ...user.toJSON() };
      if ('MatKhau' in userWithoutPassword) {
        delete (userWithoutPassword as any).MatKhau;
      }

      return {
        user: userWithoutPassword,
        token,
      };
    } catch (error) {
      logger.error(`Error in login service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.', 500);
    }
  }

  /**
   * Đăng xuất người dùng
   */
  async logout(token: string) {
    try {
      // Giải mã token để lấy thời gian hết hạn
      const decoded: any = jwt.verify(token, config.JWT_SECRET);
      const expiryTime = decoded.exp - Math.floor(Date.now() / 1000);

      // Đưa token vào danh sách đen
      await redisClient.setEx(`blacklist:${token}`, expiryTime, 'true');

      return true;
    } catch (error) {
      logger.error(`Error in logout service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại sau.', 500);
    }
  }

  /**
   * Tạo JWT token
   */
  generateToken(userId: string, vaiTroId: string, userType: string): string {
    // Đơn giản hóa bằng cách sử dụng giá trị cố định
    const options: SignOptions = {
      expiresIn: '7d'  // Sử dụng giá trị cố định '7d'
    };
    
    return jwt.sign(
      { id: userId, vaiTroId, userType },
      config.JWT_SECRET,
      options
    );
  }

  /**
   * Lấy thông tin người dùng từ token
   */
  async getUserFromToken(userId: string, userType: string) {
    try {
      let user;
      if (userType === 'admin') {
        user = await NhanVien.findByPk(userId, {
          attributes: { exclude: ['MatKhau'] }
        });
      } else {
        user = await KhachHang.findByPk(userId, {
          attributes: { exclude: ['MatKhau'] }
        });
      }

      if (!user) {
        throw new AppError('Người dùng không tồn tại.', 404);
      }

      return user;
    } catch (error) {
      logger.error(`Error in getUserFromToken service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi lấy thông tin người dùng.', 500);
    }
  }

  /**
   * Cập nhật thông tin người dùng
   */
  async updateUserProfile(userId: string, userData: IUserUpdate, userType: string) {
    try {
      let user;
      // Tìm người dùng dựa vào loại
      if (userType === 'admin') {
        user = await NhanVien.findByPk(userId);
        if (!user) {
          throw new AppError('Không tìm thấy người dùng.', 404);
        }
        
        // Cập nhật thông tin
        await (user as NhanVien).update({
          HoTen: userData.HoTen,
          SoDienThoai: userData.SoDienThoai,
        });
      } else {
        user = await KhachHang.findByPk(userId);
        if (!user) {
          throw new AppError('Không tìm thấy người dùng.', 404);
        }
        
        // Cập nhật thông tin
        await (user as KhachHang).update({
          HoTen: userData.HoTen,
          SoDienThoai: userData.SoDienThoai,
        });
      }

      // Không trả về mật khẩu
      const userWithoutPassword = { ...user.toJSON() };
      if ('MatKhau' in userWithoutPassword) {
        delete (userWithoutPassword as any).MatKhau;
      }

      return userWithoutPassword;
    } catch (error) {
      logger.error(`Error in updateUserProfile service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi cập nhật thông tin người dùng.', 500);
    }
  }
}

export default new AuthService(); 