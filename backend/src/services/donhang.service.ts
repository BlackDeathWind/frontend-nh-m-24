import { DonHang, ChiTietDonHang, SanPham, KhachHang } from '../models';
import { IDonHangCreate, IDonHangUpdate, IDonHangWithCustomer, IDonHangFull } from '../interfaces/order.interface';
import { AppError } from '../middlewares/errorHandler';
import { sequelize } from '../config/database';
import logger from '../utils/logger';
import { QueryTypes, literal } from 'sequelize';

class DonHangService {
  /**
   * Lấy danh sách đơn hàng với các điều kiện lọc sử dụng ORM
   */
  async getDonHangs(maKH?: string, trangThai?: string, page: number = 1, limit: number = 10) {
    try {
      // Xây dựng điều kiện tìm kiếm
      const whereClause: any = {};
      
      if (maKH) {
        whereClause.MaKH = maKH;
      }
      
      if (trangThai) {
        whereClause.TrangThaiDonHang = trangThai;
      }
      
      const offset = (page - 1) * limit;
      
      // Sử dụng ORM để lấy dữ liệu
      const { rows: donhangItems, count: totalItems } = await DonHang.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: KhachHang,
            attributes: ['MaKH', 'HoTen']
          }
        ],
        order: [['NgayDatHang', 'DESC']],
        limit,
        offset,
        distinct: true
      });
      
      // Chuyển đổi kết quả sang định dạng phù hợp
      const donhangs = donhangItems.map(item => {
        const data = item.get({ plain: true }) as any;
        return {
          MaDonHang: data.MaDonHang,
          MaKH: data.MaKH,
          TenKhachHang: data.KhachHang?.HoTen || '',
          TenNguoiNhan: data.TenNguoiNhan,
          SoDienThoaiNhan: data.SoDienThoaiNhan,
          DiaChiGiaoHang: data.DiaChiGiaoHang,
          EmailNguoiNhan: data.EmailNguoiNhan,
          NgayDatHang: data.NgayDatHang,
          TongTienSanPham: data.TongTienSanPham,
          PhiVanChuyen: data.PhiVanChuyen,
          GiamGia: data.GiamGia,
          TongThanhToan: data.TongThanhToan,
          PhuongThucThanhToan: data.PhuongThucThanhToan, 
          TrangThaiThanhToan: data.TrangThaiThanhToan,
          TrangThaiDonHang: data.TrangThaiDonHang,
          GhiChuKhachHang: data.GhiChuKhachHang,
          GhiChuQuanTri: data.GhiChuQuanTri,
          NgayCapNhat: data.NgayCapNhat
        } as IDonHangWithCustomer;
      });
      
      const totalPages = Math.ceil(totalItems / limit);
      
      return {
        donhangs,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
          itemsPerPage: limit,
          nextPage: page < totalPages ? page + 1 : null,
          prevPage: page > 1 ? page - 1 : null
        }
      };
    } catch (error) {
      logger.error(`Error in getDonHangs service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi lấy danh sách đơn hàng.', 500);
    }
  }

  /**
   * Lấy thông tin chi tiết đơn hàng theo mã sử dụng ORM
   */
  async getDonHangById(maDonHang: number) {
    try {
      // Lấy thông tin đơn hàng
      const donHang = await DonHang.findByPk(maDonHang, {
        include: [{
          model: KhachHang,
          attributes: ['MaKH', 'HoTen']
        }]
      });
      
      if (!donHang) {
        return null;
      }
      
      // Lấy chi tiết đơn hàng
      const chiTietDonHang = await ChiTietDonHang.findAll({
        where: { MaDonHang: maDonHang },
        include: [{
          model: SanPham,
          attributes: ['MaSP', 'TenSP', 'HinhAnhChinhURL']
        }]
      });
      
      // Chuyển đổi sang định dạng mong muốn
      const donHangData = donHang.get({ plain: true }) as any;
      
      const result: IDonHangFull = {
        MaDonHang: donHangData.MaDonHang,
        MaKH: donHangData.MaKH,
        TenKhachHang: donHangData.KhachHang?.HoTen || '',
        TenNguoiNhan: donHangData.TenNguoiNhan,
        SoDienThoaiNhan: donHangData.SoDienThoaiNhan,
        DiaChiGiaoHang: donHangData.DiaChiGiaoHang,
        EmailNguoiNhan: donHangData.EmailNguoiNhan,
        NgayDatHang: donHangData.NgayDatHang,
        TongTienSanPham: donHangData.TongTienSanPham,
        PhiVanChuyen: donHangData.PhiVanChuyen,
        GiamGia: donHangData.GiamGia,
        TongThanhToan: donHangData.TongThanhToan,
        PhuongThucThanhToan: donHangData.PhuongThucThanhToan,
        TrangThaiThanhToan: donHangData.TrangThaiThanhToan,
        TrangThaiDonHang: donHangData.TrangThaiDonHang,
        GhiChuKhachHang: donHangData.GhiChuKhachHang,
        GhiChuQuanTri: donHangData.GhiChuQuanTri,
        NgayCapNhat: donHangData.NgayCapNhat,
        ChiTietDonHang: chiTietDonHang.map(item => {
          const chiTietData = item.get({ plain: true }) as any;
          return {
            MaChiTietDH: chiTietData.MaChiTietDH,
            MaDonHang: chiTietData.MaDonHang,
            MaSP: chiTietData.MaSP,
            TenSP: chiTietData.SanPham?.TenSP || '',
            HinhAnhChinhURL: chiTietData.SanPham?.HinhAnhChinhURL || '',
            SoLuong: chiTietData.SoLuong,
            DonGia: chiTietData.DonGia,
            ThanhTien: chiTietData.ThanhTien
          };
        })
      };
      
      return result;
    } catch (error) {
      logger.error(`Error in getDonHangById service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi lấy thông tin đơn hàng.', 500);
    }
  }

  /**
   * Tạo đơn hàng mới
   */
  async createDonHang(donhangData: IDonHangCreate) {
    const t = await sequelize.transaction();

    try {
      // Tạo đơn hàng
      const newDonHang = await DonHang.create({
        MaKH: donhangData.MaKH,
        TenNguoiNhan: donhangData.TenNguoiNhan,
        SoDienThoaiNhan: donhangData.SoDienThoaiNhan,
        DiaChiGiaoHang: donhangData.DiaChiGiaoHang,
        EmailNguoiNhan: donhangData.EmailNguoiNhan,
        NgayDatHang: new Date(),
        TongTienSanPham: donhangData.TongTienSanPham,
        PhiVanChuyen: donhangData.PhiVanChuyen,
        GiamGia: donhangData.GiamGia,
        TongThanhToan: donhangData.TongThanhToan,
        PhuongThucThanhToan: donhangData.PhuongThucThanhToan,
        TrangThaiThanhToan: 'Chưa thanh toán',
        TrangThaiDonHang: 'Đang xử lý',
        GhiChuKhachHang: donhangData.GhiChuKhachHang,
        NgayCapNhat: new Date()
      }, { transaction: t });

      // Tạo chi tiết đơn hàng
      const chiTietDonHangPromises = donhangData.ChiTietDonHang.map(item => {
        return ChiTietDonHang.create({
          MaDonHang: newDonHang.MaDonHang,
          MaSP: item.MaSP,
          SoLuong: item.SoLuong,
          DonGia: item.DonGia,
          ThanhTien: item.ThanhTien
        }, { transaction: t });
      });

      await Promise.all(chiTietDonHangPromises);

      // Cập nhật số lượng tồn kho của sản phẩm
      for (const item of donhangData.ChiTietDonHang) {
        const sanPham = await SanPham.findByPk(item.MaSP, { transaction: t });
        if (sanPham) {
          const soLuongMoi = sanPham.SoLuongTon - item.SoLuong;
          if (soLuongMoi < 0) {
            throw new AppError(`Sản phẩm '${sanPham.TenSP}' không đủ số lượng.`, 400);
          }
          await sanPham.update({ 
            SoLuongTon: soLuongMoi,
            NgayCapNhat: new Date() 
          }, { transaction: t });
        }
      }

      await t.commit();

      // Lấy đơn hàng đầy đủ sau khi tạo
      const createdDonHang = await this.getDonHangById(newDonHang.MaDonHang);
      
      return createdDonHang;
    } catch (error) {
      await t.rollback();
      logger.error(`Error in createDonHang service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi tạo đơn hàng.', 500);
    }
  }

  /**
   * Cập nhật trạng thái đơn hàng
   */
  async updateDonHang(maDonHang: number, updateData: IDonHangUpdate) {
    try {
      const donhang = await DonHang.findByPk(maDonHang);

      if (!donhang) {
        return null;
      }

      // Cập nhật thông tin
      const updatedDonHang = await donhang.update({
        TrangThaiDonHang: updateData.TrangThaiDonHang || donhang.TrangThaiDonHang,
        TrangThaiThanhToan: updateData.TrangThaiThanhToan || donhang.TrangThaiThanhToan,
        GhiChuQuanTri: updateData.GhiChuQuanTri || donhang.GhiChuQuanTri,
        NgayCapNhat: new Date()
      });

      return this.getDonHangById(maDonHang);
    } catch (error) {
      logger.error(`Error in updateDonHang service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi cập nhật đơn hàng.', 500);
    }
  }

  /**
   * Hủy đơn hàng
   */
  async cancelDonHang(maDonHang: number, lyDo: string) {
    const t = await sequelize.transaction();

    try {
      const donhang = await DonHang.findByPk(maDonHang, { transaction: t });

      if (!donhang) {
        await t.rollback();
        return null;
      }

      // Chỉ cho phép hủy đơn hàng ở trạng thái 'Đang xử lý' hoặc 'Chờ thanh toán'
      if (!['Đang xử lý', 'Chờ thanh toán'].includes(donhang.TrangThaiDonHang)) {
        await t.rollback();
        throw new AppError('Không thể hủy đơn hàng đã được xử lý.', 400);
      }

      // Hoàn lại số lượng sản phẩm về kho
      const chiTietDonHang = await ChiTietDonHang.findAll({
        where: { MaDonHang: maDonHang },
        transaction: t
      });

      for (const item of chiTietDonHang) {
        const sanPham = await SanPham.findByPk(item.MaSP, { transaction: t });
        if (sanPham) {
          const soLuongMoi = sanPham.SoLuongTon + item.SoLuong;
          await sanPham.update({ SoLuongTon: soLuongMoi }, { transaction: t });
        }
      }

      // Cập nhật trạng thái đơn hàng
      await donhang.update({
        TrangThaiDonHang: 'Đã hủy',
        GhiChuQuanTri: lyDo ? `Đơn hàng bị hủy. Lý do: ${lyDo}` : 'Đơn hàng bị hủy.',
        NgayCapNhat: new Date()
      }, { transaction: t });

      await t.commit();

      return this.getDonHangById(maDonHang);
    } catch (error) {
      await t.rollback();
      logger.error(`Error in cancelDonHang service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi hủy đơn hàng.', 500);
    }
  }
}

export default new DonHangService(); 