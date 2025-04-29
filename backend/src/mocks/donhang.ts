import { v4 as uuidv4 } from 'uuid';
import { mockKhachHang } from './khachhang';
import { mockNhanVien } from './nhanvien';

export interface MockDonHang {
  MaDonHang: number;
  MaKhachHang: number;
  MaNhanVien: number | null;
  NgayDatHang: Date;
  NgayGiaoHang?: Date;
  DiaChiGiaoHang: string;
  SDTGiaoHang: string;
  GhiChu?: string;
  TrangThai: number; // 1: Chờ xác nhận, 2: Đã xác nhận, 3: Đang giao, 4: Đã giao, 5: Đã hủy
  TongTien: number;
  PhuongThucThanhToan: number; // 1: Tiền mặt, 2: Chuyển khoản, 3: Thẻ tín dụng
  TrangThaiThanhToan: boolean;
  NgayTao: Date;
  NgayCapNhat: Date;
  ChiTietDonHang: MockChiTietDonHang[];
}

export interface MockChiTietDonHang {
  MaChiTietDonHang: number;
  MaDonHang: number;
  MaSanPham: number;
  SoLuong: number;
  DonGia: number;
  ThanhTien: number;
}

// Mock data đơn hàng cho backend
export const mockDonHangs: MockDonHang[] = [
  {
    MaDonHang: 1,
    MaKhachHang: mockKhachHang.MaKhachHang,
    MaNhanVien: mockNhanVien.MaNhanVien,
    NgayDatHang: new Date('2023-12-15T08:30:00'),
    NgayGiaoHang: new Date('2023-12-17T14:00:00'),
    DiaChiGiaoHang: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM',
    SDTGiaoHang: '0912345678',
    GhiChu: 'Giao hàng trong giờ hành chính',
    TrangThai: 4, // Đã giao
    TongTien: 2500000,
    PhuongThucThanhToan: 1, // Tiền mặt
    TrangThaiThanhToan: true,
    NgayTao: new Date('2023-12-15T08:30:00'),
    NgayCapNhat: new Date('2023-12-17T14:00:00'),
    ChiTietDonHang: [
      {
        MaChiTietDonHang: 1,
        MaDonHang: 1,
        MaSanPham: 1,
        SoLuong: 2,
        DonGia: 800000,
        ThanhTien: 1600000
      },
      {
        MaChiTietDonHang: 2,
        MaDonHang: 1,
        MaSanPham: 3,
        SoLuong: 1,
        DonGia: 900000,
        ThanhTien: 900000
      }
    ]
  },
  {
    MaDonHang: 2,
    MaKhachHang: mockKhachHang.MaKhachHang,
    MaNhanVien: mockNhanVien.MaNhanVien,
    NgayDatHang: new Date('2023-12-20T10:15:00'),
    NgayGiaoHang: undefined,
    DiaChiGiaoHang: '45 Đường Lê Lợi, Quận 1, TP.HCM',
    SDTGiaoHang: '0912345678',
    GhiChu: 'Gọi trước khi giao',
    TrangThai: 2, // Đã xác nhận
    TongTien: 1750000,
    PhuongThucThanhToan: 2, // Chuyển khoản
    TrangThaiThanhToan: true,
    NgayTao: new Date('2023-12-20T10:15:00'),
    NgayCapNhat: new Date('2023-12-20T14:30:00'),
    ChiTietDonHang: [
      {
        MaChiTietDonHang: 3,
        MaDonHang: 2,
        MaSanPham: 2,
        SoLuong: 1,
        DonGia: 1200000,
        ThanhTien: 1200000
      },
      {
        MaChiTietDonHang: 4,
        MaDonHang: 2,
        MaSanPham: 5,
        SoLuong: 1,
        DonGia: 550000,
        ThanhTien: 550000
      }
    ]
  },
  {
    MaDonHang: 3,
    MaKhachHang: mockKhachHang.MaKhachHang,
    MaNhanVien: mockNhanVien.MaNhanVien,
    NgayDatHang: new Date('2024-01-05T15:45:00'),
    NgayGiaoHang: new Date('2024-01-07T11:20:00'),
    DiaChiGiaoHang: '78 Đường Trần Hưng Đạo, Quận 5, TP.HCM',
    SDTGiaoHang: '0912345678',
    GhiChu: undefined,
    TrangThai: 3, // Đang giao
    TongTien: 3200000,
    PhuongThucThanhToan: 3, // Thẻ tín dụng
    TrangThaiThanhToan: true,
    NgayTao: new Date('2024-01-05T15:45:00'),
    NgayCapNhat: new Date('2024-01-06T09:10:00'),
    ChiTietDonHang: [
      {
        MaChiTietDonHang: 5,
        MaDonHang: 3,
        MaSanPham: 4,
        SoLuong: 2,
        DonGia: 1100000,
        ThanhTien: 2200000
      },
      {
        MaChiTietDonHang: 6,
        MaDonHang: 3,
        MaSanPham: 6,
        SoLuong: 1,
        DonGia: 1000000,
        ThanhTien: 1000000
      }
    ]
  },
  {
    MaDonHang: 4,
    MaKhachHang: mockKhachHang.MaKhachHang,
    MaNhanVien: mockNhanVien.MaNhanVien,
    NgayDatHang: new Date('2024-01-10T09:00:00'),
    NgayGiaoHang: undefined,
    DiaChiGiaoHang: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM',
    SDTGiaoHang: '0912345678',
    GhiChu: 'Đổi ý không mua nữa',
    TrangThai: 5, // Đã hủy
    TongTien: 1500000,
    PhuongThucThanhToan: 1, // Tiền mặt
    TrangThaiThanhToan: false,
    NgayTao: new Date('2024-01-10T09:00:00'),
    NgayCapNhat: new Date('2024-01-10T14:00:00'),
    ChiTietDonHang: [
      {
        MaChiTietDonHang: 7,
        MaDonHang: 4,
        MaSanPham: 7,
        SoLuong: 1,
        DonGia: 1500000,
        ThanhTien: 1500000
      }
    ]
  },
  {
    MaDonHang: 5,
    MaKhachHang: mockKhachHang.MaKhachHang,
    MaNhanVien: null,
    NgayDatHang: new Date('2024-01-15T16:30:00'),
    NgayGiaoHang: undefined,
    DiaChiGiaoHang: '45 Đường Lê Lợi, Quận 1, TP.HCM',
    SDTGiaoHang: '0912345678',
    GhiChu: undefined,
    TrangThai: 1, // Chờ xác nhận
    TongTien: 2100000,
    PhuongThucThanhToan: 2, // Chuyển khoản
    TrangThaiThanhToan: false,
    NgayTao: new Date('2024-01-15T16:30:00'),
    NgayCapNhat: new Date('2024-01-15T16:30:00'),
    ChiTietDonHang: [
      {
        MaChiTietDonHang: 8,
        MaDonHang: 5,
        MaSanPham: 8,
        SoLuong: 1,
        DonGia: 850000,
        ThanhTien: 850000
      },
      {
        MaChiTietDonHang: 9,
        MaDonHang: 5,
        MaSanPham: 9,
        SoLuong: 1,
        DonGia: 750000,
        ThanhTien: 750000
      },
      {
        MaChiTietDonHang: 10,
        MaDonHang: 5,
        MaSanPham: 10,
        SoLuong: 1,
        DonGia: 500000,
        ThanhTien: 500000
      }
    ]
  }
];

// Đơn hàng mẫu
export const mockDonHang = mockDonHangs[0]; 