import { v4 as uuidv4 } from 'uuid';

export interface MockNhanVien {
  MaNhanVien: number;
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

// Mock data nhân viên cho backend
export const mockNhanViens: MockNhanVien[] = [
  {
    MaNhanVien: 1,
    HoTen: 'Admin',
    Email: 'admin@example.com',
    SDT: '0987654321',
    DiaChi: '1 Đường Lý Tự Trọng, Quận 1, TP.HCM',
    NgaySinh: new Date('1985-05-10'),
    GioiTinh: 'Nam',
    MatKhau: '$2a$10$Rw8Yk79YaFRP1aXjYIrOK.8h/JO.t8bQwvXxW41QxP7/kD6UZu22q', // Admin123!
    MaVaiTro: 1, // Admin
    TrangThai: true,
    AnhDaiDien: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    NgayTao: new Date(),
    NgayCapNhat: new Date()
  },
  {
    MaNhanVien: 2,
    HoTen: 'Nguyễn Thị Quản Lý',
    Email: 'manager@example.com',
    SDT: '0976543210',
    DiaChi: '2 Đường Nguyễn Trãi, Quận 5, TP.HCM',
    NgaySinh: new Date('1988-06-15'),
    GioiTinh: 'Nữ',
    MatKhau: '$2a$10$Rw8Yk79YaFRP1aXjYIrOK.8h/JO.t8bQwvXxW41QxP7/kD6UZu22q', // Admin123!
    MaVaiTro: 3, // Quản lý
    TrangThai: true,
    AnhDaiDien: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    NgayTao: new Date(),
    NgayCapNhat: new Date()
  },
  {
    MaNhanVien: 3,
    HoTen: 'Trần Văn Nhân Viên',
    Email: 'staff@example.com',
    SDT: '0965432109',
    DiaChi: '3 Đường Lê Hồng Phong, Quận 5, TP.HCM',
    NgaySinh: new Date('1990-09-20'),
    GioiTinh: 'Nam',
    MatKhau: '$2a$10$Rw8Yk79YaFRP1aXjYIrOK.8h/JO.t8bQwvXxW41QxP7/kD6UZu22q', // Admin123!
    MaVaiTro: 4, // Nhân viên bán hàng
    TrangThai: true,
    AnhDaiDien: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    NgayTao: new Date(),
    NgayCapNhat: new Date()
  },
  {
    MaNhanVien: 4,
    HoTen: 'Lê Thị Kho',
    Email: 'inventory@example.com',
    SDT: '0954321098',
    DiaChi: '4 Đường Trần Hưng Đạo, Quận 1, TP.HCM',
    NgaySinh: new Date('1992-11-05'),
    GioiTinh: 'Nữ',
    MatKhau: '$2a$10$Rw8Yk79YaFRP1aXjYIrOK.8h/JO.t8bQwvXxW41QxP7/kD6UZu22q', // Admin123!
    MaVaiTro: 5, // Nhân viên kho
    TrangThai: true,
    AnhDaiDien: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    NgayTao: new Date(),
    NgayCapNhat: new Date()
  },
  {
    MaNhanVien: 5,
    HoTen: 'Phạm Văn Giao Hàng',
    Email: 'delivery@example.com',
    SDT: '0943210987',
    DiaChi: '5 Đường Nguyễn Đình Chiểu, Quận 3, TP.HCM',
    NgaySinh: new Date('1993-12-12'),
    GioiTinh: 'Nam',
    MatKhau: '$2a$10$Rw8Yk79YaFRP1aXjYIrOK.8h/JO.t8bQwvXxW41QxP7/kD6UZu22q', // Admin123!
    MaVaiTro: 6, // Nhân viên giao hàng
    TrangThai: true,
    AnhDaiDien: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    NgayTao: new Date(),
    NgayCapNhat: new Date()
  }
];

// Nhân viên mẫu cho đăng nhập (Admin)
export const mockNhanVien = mockNhanViens[0]; 