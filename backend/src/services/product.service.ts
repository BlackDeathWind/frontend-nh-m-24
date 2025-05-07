import { SanPham, DanhMuc, DanhGia } from '../models';
import { AppError } from '../middlewares/errorHandler';
import logger from '../utils/logger';
import { Op, Order, literal, QueryTypes } from 'sequelize';
import { ISanPhamWithReviews } from '../interfaces/product.interface';
import { sequelize } from '../config/database';

class ProductService {
  /**
   * Lấy danh sách sản phẩm với các bộ lọc sử dụng view vw_SanPham
   */
  async getProducts(options: {
    keyword?: string;
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'popular';
    page?: number;
    limit?: number;
  }) {
    try {
      const { 
        keyword = '', 
        categoryId, 
        minPrice, 
        maxPrice,
        sortBy = 'newest',
        page = 1, 
        limit = 10 
      } = options;

      // Xây dựng điều kiện lọc
      const whereClause: any = {};
      
      // Tìm kiếm theo từ khóa
      if (keyword) {
        whereClause.TenSP = { [Op.like]: `%${keyword}%` };
      }
      
      // Lọc theo danh mục
      if (categoryId) {
        whereClause.MaDanhMuc = categoryId;
      }
      
      // Lọc theo giá
      if (minPrice !== undefined || maxPrice !== undefined) {
        whereClause.GiaBan = {};
        if (minPrice !== undefined) {
          whereClause.GiaBan[Op.gte] = minPrice;
        }
        if (maxPrice !== undefined) {
          whereClause.GiaBan[Op.lte] = maxPrice;
        }
      }

      // Xác định thứ tự sắp xếp
      let order: Order = [];
      switch (sortBy) {
        case 'price_asc':
          order = [['GiaBan', 'ASC']];
          break;
        case 'price_desc':
          order = [['GiaBan', 'DESC']];
          break;
        case 'popular':
          order = [['LuotXem', 'DESC']];
          break;
        case 'newest':
        default:
          order = [['NgayTao', 'DESC']];
          break;
      }

      // Tính toán phân trang
      const offset = (page - 1) * limit;

      // Thực hiện truy vấn
      const { rows: products, count: totalItems } = await SanPham.findAndCountAll({
        where: whereClause,
        order,
        limit,
        offset,
        include: [
          {
            model: DanhMuc,
            attributes: ['MaDanhMuc', 'TenDanhMuc']
          }
        ]
      });

      // Tính toán thông tin phân trang
      const totalPages = Math.ceil(totalItems / limit);
      const nextPage = page < totalPages ? page + 1 : null;
      const prevPage = page > 1 ? page - 1 : null;

      return {
        products,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
          itemsPerPage: limit,
          nextPage,
          prevPage
        }
      };
    } catch (error) {
      logger.error(`Error in getProducts service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi lấy danh sách sản phẩm.', 500);
    }
  }

  /**
   * Lấy sản phẩm với đánh giá sử dụng view vw_SanPham_DanhGia
   */
  async getProductsWithReviews(options: {
    page?: number;
    limit?: number;
    sortBy?: string;
  }) {
    try {
      const { page = 1, limit = 10, sortBy = 'newest' } = options;
      const offset = (page - 1) * limit;

      let order: any[] = [];
      switch (sortBy) {
        case 'rating':
          order = [[literal('DiemDanhGiaTrungBinh'), 'DESC']];
          break;
        case 'popular':
          order = [[literal('SoLuongDanhGia'), 'DESC']];
          break;
        case 'price_asc':
          order = [['GiaBan', 'ASC']];
          break;
        case 'price_desc':
          order = [['GiaBan', 'DESC']];
          break;
        default:
          order = [['MaSP', 'DESC']];
      }

      // Sử dụng ORM với include và attributes
      const { rows: products, count: totalItems } = await SanPham.findAndCountAll({
        attributes: [
          'MaSP', 'TenSP', 'MoTaDai', 'GiaBan', 'SoLuongTon', 'HinhAnhChinhURL',
          'MaDanhMuc', 'DacDiemNoiBat', 'LuotXem', 'NgayTao', 'NgayCapNhat',
          [
            literal(`(
              SELECT AVG(CAST(DiemSo AS FLOAT))
              FROM DanhGia
              WHERE DanhGia.MaSP = SanPham.MaSP AND DanhGia.TrangThai = 1
            )`),
            'DiemDanhGiaTrungBinh'
          ],
          [
            literal(`(
              SELECT COUNT(*)
              FROM DanhGia
              WHERE DanhGia.MaSP = SanPham.MaSP AND DanhGia.TrangThai = 1
            )`),
            'SoLuongDanhGia'
          ]
        ],
        include: [
          {
            model: DanhMuc,
            attributes: ['MaDanhMuc', 'TenDanhMuc']
          }
        ],
        order,
        limit,
        offset,
        distinct: true
      });

      const totalPages = Math.ceil(totalItems / limit);

      return {
        products,
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
      logger.error(`Error in getProductsWithReviews service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi lấy danh sách sản phẩm với đánh giá.', 500);
    }
  }

  /**
   * Lấy thông tin chi tiết sản phẩm theo ID
   */
  async getProductById(productId: number) {
    try {
      const product = await SanPham.findByPk(productId, {
        include: [
          {
            model: DanhMuc,
            attributes: ['MaDanhMuc', 'TenDanhMuc']
          },
          {
            model: DanhGia,
            attributes: ['MaDanhGia', 'MaKH', 'DiemSo', 'BinhLuan', 'NgayDanhGia']
          }
        ]
      });

      if (!product) {
        throw new AppError('Không tìm thấy sản phẩm.', 404);
      }

      // Tăng lượt xem sử dụng literal cho cập nhật số lượng an toàn
      await product.update({ 
        LuotXem: literal('LuotXem + 1') 
      });

      return product;
    } catch (error) {
      logger.error(`Error in getProductById service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi lấy thông tin sản phẩm.', 500);
    }
  }

  /**
   * Lấy sản phẩm bán chạy sử dụng ORM
   */
  async getBestSellingProducts(limit: number = 10) {
    try {
      const bestSellingProducts = await SanPham.findAll({
        attributes: [
          'MaSP', 'TenSP', 'GiaBan', 'HinhAnhChinhURL', 'MaDanhMuc',
          [
            literal(`(
              SELECT SUM(ChiTietDonHang.SoLuong)
              FROM ChiTietDonHang
              JOIN DonHang ON ChiTietDonHang.MaDonHang = DonHang.MaDonHang
              WHERE ChiTietDonHang.MaSP = SanPham.MaSP
              AND DonHang.TrangThaiDonHang NOT IN ('Đã hủy', 'Trả hàng')
            )`),
            'TongSoLuongBan'
          ]
        ],
        include: [
          {
            model: DanhMuc,
            attributes: ['MaDanhMuc', 'TenDanhMuc']
          }
        ],
        order: [[literal('TongSoLuongBan'), 'DESC']],
        limit
      });

      return bestSellingProducts;
    } catch (error) {
      logger.error(`Error in getBestSellingProducts service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi lấy sản phẩm bán chạy.', 500);
    }
  }

  /**
   * Tạo sản phẩm mới
   */
  async createProduct(productData: {
    TenSP: string;
    MoTaDai: string;
    GiaBan: number;
    SoLuongTon: number;
    HinhAnhChinhURL: string;
    MaDanhMuc: number;
    DacDiemNoiBat?: string;
  }) {
    try {
      // Kiểm tra tồn tại của danh mục
      const categoryExists = await DanhMuc.findByPk(productData.MaDanhMuc);
      if (!categoryExists) {
        throw new AppError('Danh mục không tồn tại.', 400);
      }

      // Tạo sản phẩm mới
      const newProduct = await SanPham.create({
        ...productData,
        LuotXem: 0,
        NgayTao: new Date(),
        NgayCapNhat: new Date()
      });

      return newProduct;
    } catch (error) {
      logger.error(`Error in createProduct service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi tạo sản phẩm.', 500);
    }
  }

  /**
   * Cập nhật sản phẩm
   */
  async updateProduct(productId: number, productData: {
    TenSP?: string;
    MoTaDai?: string;
    GiaBan?: number;
    SoLuongTon?: number;
    HinhAnhChinhURL?: string;
    MaDanhMuc?: number;
    DacDiemNoiBat?: string;
  }) {
    try {
      // Kiểm tra tồn tại của sản phẩm
      const product = await SanPham.findByPk(productId);
      if (!product) {
        throw new AppError('Không tìm thấy sản phẩm.', 404);
      }

      // Kiểm tra tồn tại của danh mục nếu được cập nhật
      if (productData.MaDanhMuc) {
        const categoryExists = await DanhMuc.findByPk(productData.MaDanhMuc);
        if (!categoryExists) {
          throw new AppError('Danh mục không tồn tại.', 400);
        }
      }

      // Cập nhật thông tin sản phẩm
      await product.update({
        ...productData,
        NgayCapNhat: new Date()
      });

      return product;
    } catch (error) {
      logger.error(`Error in updateProduct service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi cập nhật sản phẩm.', 500);
    }
  }

  /**
   * Xóa sản phẩm
   */
  async deleteProduct(productId: number) {
    try {
      // Kiểm tra tồn tại của sản phẩm
      const product = await SanPham.findByPk(productId);
      if (!product) {
        throw new AppError('Không tìm thấy sản phẩm.', 404);
      }

      // Xóa sản phẩm
      await product.destroy();

      return { success: true };
    } catch (error) {
      logger.error(`Error in deleteProduct service: ${error}`);
      if (error instanceof AppError) throw error;
      throw new AppError('Đã xảy ra lỗi khi xóa sản phẩm.', 500);
    }
  }
}

export default new ProductService(); 