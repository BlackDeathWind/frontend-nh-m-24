import { DanhGia, KhachHang, SanPham } from '../models';
import { AppError } from '../middlewares/errorHandler';
import logger from '../utils/logger';
import { Op } from 'sequelize';

class ReviewService {
  /**
   * Lấy danh sách đánh giá của sản phẩm
   */
  async getProductReviews(productId: number) {
    try {
      // Kiểm tra tồn tại của sản phẩm
      const product = await SanPham.findByPk(productId);
      if (!product) {
        throw new AppError('Không tìm thấy sản phẩm.', 404);
      }

      // Lấy đánh giá
      const reviews = await DanhGia.findAll({
        where: { MaSP: productId, TrangThai: true },
        include: [
          {
            model: KhachHang,
            as: 'KhachHang',
            attributes: ['MaKH', 'HoTen']
          }
        ],
        order: [['NgayDanhGia', 'DESC']]
      });

      // Tính điểm trung bình
      const avgRating = reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.DiemSo, 0) / reviews.length
        : 0;

      return {
        reviews,
        averageRating: avgRating,
        totalReviews: reviews.length
      };
    } catch (error) {
      logger.error(`Error in getProductReviews service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi lấy danh sách đánh giá.', 500);
    }
  }

  /**
   * Lấy chi tiết đánh giá theo ID
   */
  async getReviewById(reviewId: number) {
    try {
      const review = await DanhGia.findByPk(reviewId, {
        include: [
          {
            model: KhachHang,
            as: 'KhachHang',
            attributes: ['MaKH', 'HoTen']
          },
          {
            model: SanPham,
            as: 'SanPham',
            attributes: ['MaSP', 'TenSP']
          }
        ]
      });

      if (!review) {
        throw new AppError('Không tìm thấy đánh giá.', 404);
      }

      return review;
    } catch (error) {
      logger.error(`Error in getReviewById service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi lấy thông tin đánh giá.', 500);
    }
  }

  /**
   * Tạo đánh giá mới
   */
  async createReview(reviewData: {
    MaSP: number;
    MaKH: string;
    DiemSo: number;
    BinhLuan?: string;
  }) {
    try {
      // Kiểm tra tồn tại của sản phẩm
      const product = await SanPham.findByPk(reviewData.MaSP);
      if (!product) {
        throw new AppError('Không tìm thấy sản phẩm.', 404);
      }

      // Kiểm tra tồn tại của khách hàng
      const customer = await KhachHang.findByPk(reviewData.MaKH);
      if (!customer) {
        throw new AppError('Không tìm thấy khách hàng.', 404);
      }

      // Kiểm tra xem khách hàng đã đánh giá sản phẩm này chưa
      const existingReview = await DanhGia.findOne({
        where: {
          MaSP: reviewData.MaSP,
          MaKH: reviewData.MaKH
        }
      });

      if (existingReview) {
        throw new AppError('Bạn đã đánh giá sản phẩm này trước đó.', 400);
      }

      // Kiểm tra điểm số hợp lệ
      if (reviewData.DiemSo < 1 || reviewData.DiemSo > 5) {
        throw new AppError('Điểm đánh giá phải từ 1 đến 5.', 400);
      }

      // Tạo đánh giá mới
      const newReview = await DanhGia.create({
        ...reviewData,
        NgayDanhGia: new Date(),
        TrangThai: true
      });

      return newReview;
    } catch (error) {
      logger.error(`Error in createReview service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi tạo đánh giá.', 500);
    }
  }

  /**
   * Cập nhật đánh giá
   */
  async updateReview(reviewId: number, userId: string, reviewData: {
    DiemSo?: number;
    BinhLuan?: string;
  }) {
    try {
      // Kiểm tra tồn tại của đánh giá
      const review = await DanhGia.findByPk(reviewId);
      if (!review) {
        throw new AppError('Không tìm thấy đánh giá.', 404);
      }

      // Kiểm tra người dùng có quyền cập nhật đánh giá này không
      if (review.MaKH !== userId) {
        throw new AppError('Bạn không có quyền cập nhật đánh giá này.', 403);
      }

      // Kiểm tra điểm số hợp lệ
      if (reviewData.DiemSo !== undefined && (reviewData.DiemSo < 1 || reviewData.DiemSo > 5)) {
        throw new AppError('Điểm đánh giá phải từ 1 đến 5.', 400);
      }

      // Cập nhật đánh giá
      await review.update({
        DiemSo: reviewData.DiemSo !== undefined ? reviewData.DiemSo : review.DiemSo,
        BinhLuan: reviewData.BinhLuan !== undefined ? reviewData.BinhLuan : review.BinhLuan,
        NgayDanhGia: new Date() // Cập nhật ngày đánh giá
      });

      return review;
    } catch (error) {
      logger.error(`Error in updateReview service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi cập nhật đánh giá.', 500);
    }
  }

  /**
   * Xóa đánh giá
   */
  async deleteReview(reviewId: number, userId: string, isAdmin: boolean) {
    try {
      // Kiểm tra tồn tại của đánh giá
      const review = await DanhGia.findByPk(reviewId);
      if (!review) {
        throw new AppError('Không tìm thấy đánh giá.', 404);
      }

      // Kiểm tra người dùng có quyền xóa đánh giá này không
      if (!isAdmin && review.MaKH !== userId) {
        throw new AppError('Bạn không có quyền xóa đánh giá này.', 403);
      }

      // Xóa đánh giá
      await review.destroy();

      return { success: true };
    } catch (error) {
      logger.error(`Error in deleteReview service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi xóa đánh giá.', 500);
    }
  }
}

export default new ReviewService(); 