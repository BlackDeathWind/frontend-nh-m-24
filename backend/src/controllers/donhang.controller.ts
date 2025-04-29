import { Request, Response, NextFunction } from 'express';
import donhangService from '../services/donhang.service';
import { successResponse } from '../utils/responseHandler';
import { AppError } from '../middlewares/errorHandler';
import logger from '../utils/logger';

const DonHangController = {
  // Lấy danh sách đơn hàng
  async getDonHangs(req: Request, res: Response, next: NextFunction) {
    try {
      const maKH = req.query.maKH as string;
      const trangThai = req.query.trangThai as string;
      
      const donhangs = await donhangService.getDonHangs(maKH, trangThai);
      return successResponse(res, donhangs, 'Lấy danh sách đơn hàng thành công.');
    } catch (error) {
      next(error);
    }
  },

  // Lấy thông tin chi tiết đơn hàng
  async getDonHangById(req: Request, res: Response, next: NextFunction) {
    try {
      const maDonHang = parseInt(req.params.id);
      
      if (isNaN(maDonHang)) {
        return next(new AppError('Mã đơn hàng không hợp lệ.', 400));
      }
      
      const donhang = await donhangService.getDonHangById(maDonHang);
      
      if (!donhang) {
        return next(new AppError('Đơn hàng không tồn tại.', 404));
      }
      
      return successResponse(res, donhang, 'Lấy thông tin đơn hàng thành công.');
    } catch (error) {
      next(error);
    }
  },

  // Tạo đơn hàng mới
  async createDonHang(req: Request, res: Response, next: NextFunction) {
    try {
      const donhangData = req.body;
      
      // Validation cơ bản
      if (!donhangData.MaKH || !donhangData.TenNguoiNhan || !donhangData.SoDienThoaiNhan || 
          !donhangData.DiaChiGiaoHang || !donhangData.ChiTietDonHang || donhangData.ChiTietDonHang.length === 0) {
        return next(new AppError('Vui lòng cung cấp đầy đủ thông tin đơn hàng.', 400));
      }
      
      const newDonHang = await donhangService.createDonHang(donhangData);
      return successResponse(res, newDonHang, 'Tạo đơn hàng thành công.', 201);
    } catch (error) {
      next(error);
    }
  },

  // Cập nhật trạng thái đơn hàng
  async updateDonHang(req: Request, res: Response, next: NextFunction) {
    try {
      const maDonHang = parseInt(req.params.id);
      const updateData = req.body;
      
      if (isNaN(maDonHang)) {
        return next(new AppError('Mã đơn hàng không hợp lệ.', 400));
      }
      
      const updatedDonHang = await donhangService.updateDonHang(maDonHang, updateData);
      
      if (!updatedDonHang) {
        return next(new AppError('Đơn hàng không tồn tại.', 404));
      }
      
      return successResponse(res, updatedDonHang, 'Cập nhật đơn hàng thành công.');
    } catch (error) {
      next(error);
    }
  },

  // Hủy đơn hàng
  async cancelDonHang(req: Request, res: Response, next: NextFunction) {
    try {
      const maDonHang = parseInt(req.params.id);
      const { lyDo } = req.body;
      
      if (isNaN(maDonHang)) {
        return next(new AppError('Mã đơn hàng không hợp lệ.', 400));
      }
      
      const cancelledDonHang = await donhangService.cancelDonHang(maDonHang, lyDo);
      
      if (!cancelledDonHang) {
        return next(new AppError('Đơn hàng không tồn tại hoặc không thể hủy.', 404));
      }
      
      return successResponse(res, cancelledDonHang, 'Hủy đơn hàng thành công.');
    } catch (error) {
      next(error);
    }
  }
};

export default DonHangController; 