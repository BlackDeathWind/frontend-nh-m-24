USE [shopdungcuhoctap]
GO
INSERT [dbo].[VaiTro] ([MaVaiTro], [TenVaiTro], [MoTa]) VALUES (1, N'Admin', N'Quản trị viên hệ thống')
GO
INSERT [dbo].[VaiTro] ([MaVaiTro], [TenVaiTro], [MoTa]) VALUES (2, N'Nhân viên', N'Nhân viên cửa hàng')
GO
INSERT [dbo].[VaiTro] ([MaVaiTro], [TenVaiTro], [MoTa]) VALUES (3, N'Khách hàng', N'Người dùng đã đăng ký tài khoản')
GO
INSERT [dbo].[KhachHang] ([MaKH], [HoTen], [Email], [MatKhau], [SoDienThoai], [NgayDangKy], [LanDangNhapCuoi], [TrangThai], [MaVaiTro], [DiaChi]) VALUES (N'KH001', N'Nguyễn Văn A', N'nguyenvana@example.com', N'$2b$10$5dwsS5snIRlKCx0sVbvtF.0BSUXnk5FOFPX5LD9ZWLsfAQ.H7.ag2', N'0901234567', CAST(N'2025-05-02T20:42:08.160' AS DateTime), NULL, 1, 3, NULL)
GO
INSERT [dbo].[KhachHang] ([MaKH], [HoTen], [Email], [MatKhau], [SoDienThoai], [NgayDangKy], [LanDangNhapCuoi], [TrangThai], [MaVaiTro], [DiaChi]) VALUES (N'KH002', N'Trần Thị B', N'tranthib@example.com', N'$2b$10$5dwsS5snIRlKCx0sVbvtF.0BSUXnk5FOFPX5LD9ZWLsfAQ.H7.ag2', N'0901234568', CAST(N'2025-05-02T20:42:08.160' AS DateTime), NULL, 1, 3, NULL)
GO
INSERT [dbo].[KhachHang] ([MaKH], [HoTen], [Email], [MatKhau], [SoDienThoai], [NgayDangKy], [LanDangNhapCuoi], [TrangThai], [MaVaiTro], [DiaChi]) VALUES (N'KH003', N'Lê Văn C', N'levanc@example.com', N'$2b$10$5dwsS5snIRlKCx0sVbvtF.0BSUXnk5FOFPX5LD9ZWLsfAQ.H7.ag2', N'0901234569', CAST(N'2025-05-02T20:42:08.160' AS DateTime), NULL, 1, 3, NULL)
GO
INSERT [dbo].[KhachHang] ([MaKH], [HoTen], [Email], [MatKhau], [SoDienThoai], [NgayDangKy], [LanDangNhapCuoi], [TrangThai], [MaVaiTro], [DiaChi]) VALUES (N'KH004', N'Nguyên', N'chunguyentest01@gmail.com', N'$2b$10$XTLkI86UP8v8mt4PhBPrWO8KXKIT7rbRWzu75ZyFIbKdw9THyDtma', N'0938320498', CAST(N'2025-05-02T20:48:38.637' AS DateTime), CAST(N'2025-05-07T08:37:50.507' AS DateTime), 1, 3, N'Đại học Bình Dương')
GO
INSERT [dbo].[NhanVien] ([MaNV], [HoTen], [Email], [MatKhau], [SoDienThoai], [MaVaiTro], [TrangThai], [NgayTao], [NgayCapNhat], [LanDangNhapCuoi], [DiaChi]) VALUES (N'NV001', N'Admin System', N'admin@example.com', N'$2a$12$1C0/4Iy1BZ3DPZVIvvzGze0jTdVAAqA08j/9Zy3cFVgLVuXr6LZVq', N'0909123456', 1, 1, CAST(N'2025-05-02T20:42:11.930' AS DateTime), CAST(N'2025-05-02T20:42:11.930' AS DateTime), CAST(N'2025-05-07T08:36:45.737' AS DateTime), NULL)
GO
INSERT [dbo].[NhanVien] ([MaNV], [HoTen], [Email], [MatKhau], [SoDienThoai], [MaVaiTro], [TrangThai], [NgayTao], [NgayCapNhat], [LanDangNhapCuoi], [DiaChi]) VALUES (N'NV002', N'Nhân Viên 1', N'nhanvien1@example.com', N'$2b$10$5dwsS5snIRlKCx0sVbvtF.0BSUXnk5FOFPX5LD9ZWLsfAQ.H7.ag2', N'0909123457', 2, 1, CAST(N'2025-05-02T20:42:11.930' AS DateTime), CAST(N'2025-05-02T20:42:11.930' AS DateTime), NULL, NULL)
GO
INSERT [dbo].[NhanVien] ([MaNV], [HoTen], [Email], [MatKhau], [SoDienThoai], [MaVaiTro], [TrangThai], [NgayTao], [NgayCapNhat], [LanDangNhapCuoi], [DiaChi]) VALUES (N'NV003', N'Nhân Viên 2', N'nhanvien2@example.com', N'$2b$10$5dwsS5snIRlKCx0sVbvtF.0BSUXnk5FOFPX5LD9ZWLsfAQ.H7.ag2', N'0909123458', 2, 1, CAST(N'2025-05-02T20:42:11.930' AS DateTime), CAST(N'2025-05-02T20:42:11.930' AS DateTime), NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[DonHang] ON 
GO
INSERT [dbo].[DonHang] ([MaDonHang], [MaKH], [TenNguoiNhan], [SoDienThoaiNhan], [DiaChiGiaoHang], [EmailNguoiNhan], [NgayDatHang], [TongTienSanPham], [PhiVanChuyen], [GiamGia], [TongThanhToan], [PhuongThucThanhToan], [TrangThaiThanhToan], [TrangThaiDonHang], [GhiChuKhachHang], [GhiChuQuanTri], [NgayCapNhat]) VALUES (1, N'KH001', N'Nguyễn Văn A', N'0901234567', N'123 Đường ABC, Quận 1, TP.HCM', N'nguyenvana@example.com', CAST(N'2025-05-02T20:42:22.750' AS DateTime), CAST(50000.00 AS Decimal(10, 2)), CAST(20000.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), CAST(70000.00 AS Decimal(10, 2)), N'COD', N'Chưa thanh toán', N'Đang xử lý', NULL, NULL, CAST(N'2025-05-02T20:42:22.750' AS DateTime))
GO
INSERT [dbo].[DonHang] ([MaDonHang], [MaKH], [TenNguoiNhan], [SoDienThoaiNhan], [DiaChiGiaoHang], [EmailNguoiNhan], [NgayDatHang], [TongTienSanPham], [PhiVanChuyen], [GiamGia], [TongThanhToan], [PhuongThucThanhToan], [TrangThaiThanhToan], [TrangThaiDonHang], [GhiChuKhachHang], [GhiChuQuanTri], [NgayCapNhat]) VALUES (2, N'KH002', N'Trần Thị B', N'0901234568', N'456 Đường XYZ, Quận 2, TP.HCM', N'tranthib@example.com', CAST(N'2025-05-02T20:42:22.750' AS DateTime), CAST(280000.00 AS Decimal(10, 2)), CAST(20000.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), CAST(300000.00 AS Decimal(10, 2)), N'Chuyển khoản', N'Đã thanh toán', N'Đã giao hàng', NULL, NULL, CAST(N'2025-05-02T20:42:22.750' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[DonHang] OFF
GO
SET IDENTITY_INSERT [dbo].[DanhMuc] ON 
GO
INSERT [dbo].[DanhMuc] ([MaDanhMuc], [TenDanhMuc], [MoTa], [HinhAnh], [NgayTao], [NgayCapNhat]) VALUES (1, N'Bút các loại', N'Các loại bút viết, bút chì, bút bi, bút mực', N'but.jpg', CAST(N'2025-05-02T20:42:15.923' AS DateTime), CAST(N'2025-05-02T20:42:15.923' AS DateTime))
GO
INSERT [dbo].[DanhMuc] ([MaDanhMuc], [TenDanhMuc], [MoTa], [HinhAnh], [NgayTao], [NgayCapNhat]) VALUES (2, N'Vở ghi', N'Vở ghi các loại: vở ô ly, vở kẻ ngang', N'vo.jpg', CAST(N'2025-05-02T20:42:15.923' AS DateTime), CAST(N'2025-05-02T20:42:15.923' AS DateTime))
GO
INSERT [dbo].[DanhMuc] ([MaDanhMuc], [TenDanhMuc], [MoTa], [HinhAnh], [NgayTao], [NgayCapNhat]) VALUES (3, N'Dụng cụ học tập', N'Thước kẻ, compa, gôm tẩy, bảng viết', N'dungcu.jpg', CAST(N'2025-05-02T20:42:15.923' AS DateTime), CAST(N'2025-05-02T20:42:15.923' AS DateTime))
GO
INSERT [dbo].[DanhMuc] ([MaDanhMuc], [TenDanhMuc], [MoTa], [HinhAnh], [NgayTao], [NgayCapNhat]) VALUES (4, N'Cặp và balo', N'Cặp sách, balo học sinh, túi đựng laptop', N'balo.jpg', CAST(N'2025-05-02T20:42:15.923' AS DateTime), CAST(N'2025-05-02T20:42:15.923' AS DateTime))
GO
INSERT [dbo].[DanhMuc] ([MaDanhMuc], [TenDanhMuc], [MoTa], [HinhAnh], [NgayTao], [NgayCapNhat]) VALUES (5, N'Văn phòng phẩm khác', N'Giấy note, băng keo, keo dán và các văn phòng phẩm khác', N'vanphongpham.jpg', CAST(N'2025-05-02T20:42:15.923' AS DateTime), CAST(N'2025-05-02T20:42:15.923' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[DanhMuc] OFF
GO
SET IDENTITY_INSERT [dbo].[SanPham] ON 
GO
INSERT [dbo].[SanPham] ([MaSP], [TenSP], [MoTaDai], [GiaBan], [SoLuongTon], [HinhAnhChinhURL], [MaDanhMuc], [LuotXem], [DacDiemNoiBat], [NgayTao], [NgayCapNhat]) VALUES (1, N'Bút bi Thiên Long', N'Bút bi cao cấp Thiên Long với mực viết mượt mà, không lem, dùng cho học sinh, sinh viên và nhân viên văn phòng.', CAST(7000.00 AS Decimal(10, 2)), 500, N'https://product.hstatic.net/1000362139/product/tl027-1_1c30035a05d74ccbb3fa05713c5a309f.png', 1, 4, N'Viết mượt mà;Không lem;Dễ cầm nắm;Mực đều;Độ bền cao', CAST(N'2025-05-02T20:42:19.513' AS DateTime), CAST(N'2025-05-02T20:42:19.513' AS DateTime))
GO
INSERT [dbo].[SanPham] ([MaSP], [TenSP], [MoTaDai], [GiaBan], [SoLuongTon], [HinhAnhChinhURL], [MaDanhMuc], [LuotXem], [DacDiemNoiBat], [NgayTao], [NgayCapNhat]) VALUES (2, N'Bút chì 2B', N'Bút chì 2B chất lượng cao, dùng cho học sinh, sinh viên và họa sĩ.', CAST(5000.00 AS Decimal(10, 2)), 200, N'https://images.squarespace-cdn.com/content/v1/5349ba13e4b095a3fb0ba65c/26977f2a-dd1f-4724-bb81-88e298750a00/Staedtler-Noris-Orange-Cap', 1, 0, N'Đầu bút bền;Dễ gọt;Nét đều;Lõi không dễ gãy;Chất lượng cao', CAST(N'2025-05-02T20:42:19.513' AS DateTime), CAST(N'2025-05-02T20:42:19.513' AS DateTime))
GO
INSERT [dbo].[SanPham] ([MaSP], [TenSP], [MoTaDai], [GiaBan], [SoLuongTon], [HinhAnhChinhURL], [MaDanhMuc], [LuotXem], [DacDiemNoiBat], [NgayTao], [NgayCapNhat]) VALUES (3, N'Vở ô ly A4', N'Vở ô ly A4 80 trang, bìa cứng, dùng cho học sinh, sinh viên.', CAST(15000.00 AS Decimal(10, 2)), 300, N'https://vanphongphamminaco.com/wp-content/uploads/2023/07/Vo-4-o-ly-Hong-Ha-0509-2.webp', 1, 0, N'Bìa cứng chắc chắn;80 trang giấy dày;Không thấm mực;Ô ly chuẩn 5mm;Khổ A4 tiêu chuẩn', CAST(N'2025-05-02T20:42:19.513' AS DateTime), CAST(N'2025-05-02T20:42:19.513' AS DateTime))
GO
INSERT [dbo].[SanPham] ([MaSP], [TenSP], [MoTaDai], [GiaBan], [SoLuongTon], [HinhAnhChinhURL], [MaDanhMuc], [LuotXem], [DacDiemNoiBat], [NgayTao], [NgayCapNhat]) VALUES (4, N'Thước kẻ 30cm', N'Thước kẻ 30cm bằng nhựa trong, chia vạch rõ ràng, dùng cho học sinh, sinh viên.', CAST(10000.00 AS Decimal(10, 2)), 400, N'https://www.tts-group.co.uk/on/demandware.static/-/Sites-TTSGroupE-commerceMaster/default/dw63030471/images/hi-res/1039276_01_EE10425_001.jpg', 2, 0, N'Nhựa dẻo bền;Vạch chia rõ ràng;Không dễ gãy;Độ chính xác cao;Trong suốt', CAST(N'2025-05-02T20:42:19.513' AS DateTime), CAST(N'2025-05-02T20:42:19.513' AS DateTime))
GO
INSERT [dbo].[SanPham] ([MaSP], [TenSP], [MoTaDai], [GiaBan], [SoLuongTon], [HinhAnhChinhURL], [MaDanhMuc], [LuotXem], [DacDiemNoiBat], [NgayTao], [NgayCapNhat]) VALUES (5, N'Máy tính cầm tay Casio', N'Máy tính Casio fx-570VN Plus, được phép mang vào phòng thi, dùng cho học sinh, sinh viên.', CAST(450000.00 AS Decimal(10, 2)), 100, N'https://cdn1.fahasa.com/media/catalog/product/i/m/image_195509_1_8906.jpg', 2, 0, N'Pin năng lượng mặt trời;401 chức năng;Màn hình LCD rõ nét;Bảo hành 2 năm;Được mang vào phòng thi', CAST(N'2025-05-02T20:42:19.513' AS DateTime), CAST(N'2025-05-02T20:42:19.513' AS DateTime))
GO
INSERT [dbo].[SanPham] ([MaSP], [TenSP], [MoTaDai], [GiaBan], [SoLuongTon], [HinhAnhChinhURL], [MaDanhMuc], [LuotXem], [DacDiemNoiBat], [NgayTao], [NgayCapNhat]) VALUES (6, N'Hộp bút chì màu 24 màu', N'Hộp bút chì màu 24 màu cao cấp, màu sắc tươi sáng, dùng cho học sinh và họa sĩ.', CAST(120000.00 AS Decimal(10, 2)), 150, N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=60', 3, 0, N'24 màu tươi sáng;Màu bền lâu;Dễ pha trộn;Vẽ mịn không vón cục;Hộp đựng chắc chắn', CAST(N'2025-05-02T20:42:19.513' AS DateTime), CAST(N'2025-05-02T20:42:19.513' AS DateTime))
GO
INSERT [dbo].[SanPham] ([MaSP], [TenSP], [MoTaDai], [GiaBan], [SoLuongTon], [HinhAnhChinhURL], [MaDanhMuc], [LuotXem], [DacDiemNoiBat], [NgayTao], [NgayCapNhat]) VALUES (7, N'Cặp học sinh chống gù', N'Cặp học sinh chống gù lưng, nhiều ngăn, chất liệu chống thấm nước, dùng cho học sinh tiểu học.', CAST(250000.00 AS Decimal(10, 2)), 80, N'https://xachtaynhat.net/wp-content/uploads/2014/10/cap-hoc-sinh-chong-gu-lung.jpg', 4, 0, N'Thiết kế chống gù lưng;3 ngăn rộng;Chất liệu chống thấm nước;Trọng lượng nhẹ;Dây đeo êm ái', CAST(N'2025-05-02T20:42:19.513' AS DateTime), CAST(N'2025-05-02T20:42:19.513' AS DateTime))
GO
INSERT [dbo].[SanPham] ([MaSP], [TenSP], [MoTaDai], [GiaBan], [SoLuongTon], [HinhAnhChinhURL], [MaDanhMuc], [LuotXem], [DacDiemNoiBat], [NgayTao], [NgayCapNhat]) VALUES (8, N'Giấy note 5 màu', N'Giấy note 5 màu neon, kích thước 7.5 x 7.5cm, 100 tờ mỗi màu, dùng để ghi chú nhanh.', CAST(30000.00 AS Decimal(10, 2)), 200, N'https://haihaint.com/uploads/products/po-sn205.jpg', 5, 1, N'5 màu neon bắt mắt;Keo dính bền;100 tờ mỗi màu;Kích thước vừa phải;Dễ bóc tách', CAST(N'2025-05-02T20:42:19.513' AS DateTime), CAST(N'2025-05-02T20:42:19.513' AS DateTime))
GO
INSERT [dbo].[SanPham] ([MaSP], [TenSP], [MoTaDai], [GiaBan], [SoLuongTon], [HinhAnhChinhURL], [MaDanhMuc], [LuotXem], [DacDiemNoiBat], [NgayTao], [NgayCapNhat]) VALUES (9, N'Compa kim loại', N'Compa kim loại cao cấp, đầu chì 2B, dùng cho học sinh, sinh viên và họa sĩ.', CAST(60000.00 AS Decimal(10, 2)), 120, N'https://salt.tikicdn.com/cache/550x550/ts/product/c0/2d/52/ab42e55dff0f28e07d38e67eaae51678.jpg', 2, 1, N'Kim loại bền bỉ;Đầu chì 2B;Khóa vị trí chính xác;Vẽ đường tròn mượt mà;Tay cầm êm ái', CAST(N'2025-05-02T20:42:19.513' AS DateTime), CAST(N'2025-05-02T20:42:19.513' AS DateTime))
GO
INSERT [dbo].[SanPham] ([MaSP], [TenSP], [MoTaDai], [GiaBan], [SoLuongTon], [HinhAnhChinhURL], [MaDanhMuc], [LuotXem], [DacDiemNoiBat], [NgayTao], [NgayCapNhat]) VALUES (10, N'Băng keo trong 2 cuộn', N'Băng keo trong 2 cuộn, kích thước 1.2cm x 30m, dùng cho văn phòng và học tập.', CAST(25000.00 AS Decimal(10, 2)), 300, N'https://product.hstatic.net/200000743777/product/bang-keo-trong-4-8cm_0923ad9041484b29a407d770f4a326a4_master.jpg', 5, 16, N'Trong suốt;Độ dính cao;Hai cuộn tiết kiệm;Dễ cắt đứt;Không để lại vết keo', CAST(N'2025-05-02T20:42:19.513' AS DateTime), CAST(N'2025-05-02T20:42:19.513' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[SanPham] OFF
GO
SET IDENTITY_INSERT [dbo].[DanhGia] ON 
GO
INSERT [dbo].[DanhGia] ([MaDanhGia], [MaSP], [MaKH], [DiemSo], [BinhLuan], [NgayDanhGia], [TrangThai]) VALUES (1, 1, N'KH001', 5, N'Bút viết rất tốt, mực đều', CAST(N'2025-05-02T20:42:33.147' AS DateTime), 1)
GO
INSERT [dbo].[DanhGia] ([MaDanhGia], [MaSP], [MaKH], [DiemSo], [BinhLuan], [NgayDanhGia], [TrangThai]) VALUES (2, 4, N'KH002', 4, N'Balo chất lượng tốt, nhiều ngăn tiện dụng', CAST(N'2025-05-02T20:42:33.147' AS DateTime), 1)
GO
INSERT [dbo].[DanhGia] ([MaDanhGia], [MaSP], [MaKH], [DiemSo], [BinhLuan], [NgayDanhGia], [TrangThai]) VALUES (3, 3, N'KH003', 3, N'Thước dùng tạm được', CAST(N'2025-05-02T20:42:33.147' AS DateTime), 1)
GO
SET IDENTITY_INSERT [dbo].[DanhGia] OFF
GO
SET IDENTITY_INSERT [dbo].[ChiTietDonHang] ON 
GO
INSERT [dbo].[ChiTietDonHang] ([MaChiTietDH], [MaDonHang], [MaSP], [SoLuong], [DonGia], [ThanhTien]) VALUES (1, 1, 1, 5, CAST(5000.00 AS Decimal(10, 2)), CAST(25000.00 AS Decimal(10, 2)))
GO
INSERT [dbo].[ChiTietDonHang] ([MaChiTietDH], [MaDonHang], [MaSP], [SoLuong], [DonGia], [ThanhTien]) VALUES (2, 1, 3, 2, CAST(10000.00 AS Decimal(10, 2)), CAST(20000.00 AS Decimal(10, 2)))
GO
INSERT [dbo].[ChiTietDonHang] ([MaChiTietDH], [MaDonHang], [MaSP], [SoLuong], [DonGia], [ThanhTien]) VALUES (3, 1, 5, 1, CAST(5000.00 AS Decimal(10, 2)), CAST(5000.00 AS Decimal(10, 2)))
GO
INSERT [dbo].[ChiTietDonHang] ([MaChiTietDH], [MaDonHang], [MaSP], [SoLuong], [DonGia], [ThanhTien]) VALUES (4, 2, 4, 1, CAST(250000.00 AS Decimal(10, 2)), CAST(250000.00 AS Decimal(10, 2)))
GO
INSERT [dbo].[ChiTietDonHang] ([MaChiTietDH], [MaDonHang], [MaSP], [SoLuong], [DonGia], [ThanhTien]) VALUES (5, 2, 6, 2, CAST(15000.00 AS Decimal(10, 2)), CAST(30000.00 AS Decimal(10, 2)))
GO
SET IDENTITY_INSERT [dbo].[ChiTietDonHang] OFF
GO
