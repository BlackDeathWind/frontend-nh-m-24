import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models';
import { IUserCreate, IUserLogin, IUserUpdate } from '../interfaces/user.interface';
import { AppError } from '../middlewares/errorHandler';
import config from '../config/config';
import { redisClient } from '../config/redis';
import logger from '../utils/logger';
import { SignOptions } from 'jsonwebtoken';

class AuthService {
  /**
   * Đăng ký người dùng mới
   */
  async register(userData: IUserCreate) {
    try {
      // Kiểm tra xem email đã tồn tại chưa
      const existingUser = await User.findOne({ where: { email: userData.email } });
      if (existingUser) {
        throw new AppError('Email đã được sử dụng. Vui lòng chọn email khác.', 400);
      }

      // Tạo người dùng mới
      const newUser = await User.create({
        ...userData,
        role: userData.role || 'user',
      });

      // Không trả về mật khẩu
      const userWithoutPassword = { ...newUser.toJSON() };
      if ('password' in userWithoutPassword) {
        delete (userWithoutPassword as any).password;
      }

      return userWithoutPassword;
    } catch (error) {
      logger.error(`Error in register service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.', 500);
    }
  }

  /**
   * Đăng nhập người dùng
   */
  async login(credentials: IUserLogin) {
    try {
      // Tìm người dùng
      const user = await User.findOne({ where: { email: credentials.email } });
      if (!user) {
        throw new AppError('Email hoặc mật khẩu không chính xác.', 401);
      }

      // Kiểm tra mật khẩu
      const isPasswordCorrect = await user.comparePassword(credentials.password);
      if (!isPasswordCorrect) {
        throw new AppError('Email hoặc mật khẩu không chính xác.', 401);
      }

      // Kiểm tra người dùng có bị khóa không
      if (!user.isActive) {
        throw new AppError('Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.', 403);
      }

      // Cập nhật thời gian đăng nhập cuối
      await user.update({ lastLogin: new Date() });

      // Tạo JWT token
      const token = this.generateToken(user.id, user.role);

      // Không trả về mật khẩu
      const userWithoutPassword = { ...user.toJSON() };
      if ('password' in userWithoutPassword) {
        delete (userWithoutPassword as any).password;
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
  generateToken(userId: string, role: string): string {
    // Đơn giản hóa bằng cách sử dụng giá trị cố định
    const options: SignOptions = {
      expiresIn: '7d'  // Sử dụng giá trị cố định '7d'
    };
    
    return jwt.sign(
      { id: userId, role },
      config.JWT_SECRET,
      options
    );
  }

  /**
   * Lấy thông tin người dùng từ token
   */
  async getUserFromToken(userId: string) {
    try {
      const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] }
      });

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
  async updateUserProfile(userId: string, userData: IUserUpdate) {
    try {
      // Tìm người dùng
      const user = await User.findByPk(userId);
      if (!user) {
        throw new AppError('Không tìm thấy người dùng.', 404);
      }

      // Cập nhật thông tin
      await user.update({
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
      });

      // Không trả về mật khẩu
      const userWithoutPassword = { ...user.toJSON() };
      if ('password' in userWithoutPassword) {
        delete (userWithoutPassword as any).password;
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