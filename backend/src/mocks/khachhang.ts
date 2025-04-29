import { v4 as uuidv4 } from 'uuid';

export interface MockKhachHang {
  MaKhachHang: number;
  HoTen: string;
  Email: string;
  SDT: string;
  DiaChi: string;
  NgaySinh?: Date;
  GioiTinh?: string;
  MatKhau: string;
  MaVaiTro: number;
  TrangThai: boolean;
  AnhDaiDien?: string;
  NgayTao: Date;
  NgayCapNhat: Date;
}

// Mock data khách hàng cho backend
export const mockKhachHangs: MockKhachHang[] = [
  {
    MaKhachHang: 1,
    HoTen: 'Nguyễn Văn A',
    Email: 'nguyenvana@example.com',
    SDT: '0901234567',
    DiaChi: '123 Đường Lê Lợi, Quận 1, TP.HCM',
    NgaySinh: new Date('1990-01-15'),
    GioiTinh: 'Nam',
    MatKhau: '$2a$10$Rw8Yk79YaFRP1aXjYIrOK.8h/JO.t8bQwvXxW41QxP7/kD6UZu22q', // Admin123!
    MaVaiTro: 2, // Khách hàng thường
    TrangThai: true,
    AnhDaiDien: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    NgayTao: new Date(),
    NgayCapNhat: new Date()
  },
  {
    MaKhachHang: 2,
    HoTen: 'Trần Thị B',
    Email: 'tranthib@example.com',
    SDT: '0912345678',
    DiaChi: '456 Đường Nguyễn Huệ, Quận 1, TP.HCM',
    NgaySinh: new Date('1992-05-20'),
    GioiTinh: 'Nữ',
    MatKhau: '$2a$10$Rw8Yk79YaFRP1aXjYIrOK.8h/JO.t8bQwvXxW41QxP7/kD6UZu22q', // Admin123!
    MaVaiTro: 2, // Khách hàng thường
    TrangThai: true,
    AnhDaiDien: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    NgayTao: new Date(),
    NgayCapNhat: new Date()
  },
  {
    MaKhachHang: 3,
    HoTen: 'Lê Văn C',
    Email: 'levanc@example.com',
    SDT: '0923456789',
    DiaChi: '789 Đường Võ Văn Tần, Quận 3, TP.HCM',
    NgaySinh: new Date('1988-11-10'),
    GioiTinh: 'Nam',
    MatKhau: '$2a$10$Rw8Yk79YaFRP1aXjYIrOK.8h/JO.t8bQwvXxW41QxP7/kD6UZu22q', // Admin123!
    MaVaiTro: 2, // Khách hàng thường
    TrangThai: true,
    AnhDaiDien: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    NgayTao: new Date(),
    NgayCapNhat: new Date()
  },
  {
    MaKhachHang: 4,
    HoTen: 'Phạm Thị D',
    Email: 'phamthid@example.com',
    SDT: '0934567890',
    DiaChi: '321 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM',
    NgaySinh: new Date('1995-08-25'),
    GioiTinh: 'Nữ',
    MatKhau: '$2a$10$Rw8Yk79YaFRP1aXjYIrOK.8h/JO.t8bQwvXxW41QxP7/kD6UZu22q', // Admin123!
    MaVaiTro: 2, // Khách hàng thường
    TrangThai: true,
    AnhDaiDien: 'https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    NgayTao: new Date(),
    NgayCapNhat: new Date()
  },
  {
    MaKhachHang: 5,
    HoTen: 'Hoàng Văn E',
    Email: 'hoangvane@example.com',
    SDT: '0945678901',
    DiaChi: '567 Đường 3 Tháng 2, Quận 10, TP.HCM',
    NgaySinh: new Date('1993-03-18'),
    GioiTinh: 'Nam',
    MatKhau: '$2a$10$Rw8Yk79YaFRP1aXjYIrOK.8h/JO.t8bQwvXxW41QxP7/kD6UZu22q', // Admin123!
    MaVaiTro: 2, // Khách hàng thường
    TrangThai: false, // Tài khoản bị khóa
    AnhDaiDien: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    NgayTao: new Date(),
    NgayCapNhat: new Date()
  }
];

// Khách hàng mẫu cho đăng nhập
export const mockKhachHang = mockKhachHangs[0]; 