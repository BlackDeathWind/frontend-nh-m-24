USE [shopdungcuhoctap]
GO
/****** Object:  Table [dbo].[ChiTietDonHang]    Script Date: 07/05/2025 10:08:32 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTietDonHang](
	[MaChiTietDH] [int] IDENTITY(1,1) NOT NULL,
	[MaDonHang] [int] NOT NULL,
	[MaSP] [int] NOT NULL,
	[SoLuong] [int] NOT NULL,
	[DonGia] [decimal](10, 2) NOT NULL,
	[ThanhTien] [decimal](10, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaChiTietDH] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DanhGia]    Script Date: 07/05/2025 10:08:32 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DanhGia](
	[MaDanhGia] [int] IDENTITY(1,1) NOT NULL,
	[MaSP] [int] NOT NULL,
	[MaKH] [varchar](50) NOT NULL,
	[DiemSo] [int] NOT NULL,
	[BinhLuan] [nvarchar](max) NULL,
	[NgayDanhGia] [datetime] NOT NULL,
	[TrangThai] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaDanhGia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DanhMuc]    Script Date: 07/05/2025 10:08:32 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DanhMuc](
	[MaDanhMuc] [int] IDENTITY(1,1) NOT NULL,
	[TenDanhMuc] [nvarchar](100) NOT NULL,
	[MoTa] [nvarchar](max) NULL,
	[HinhAnh] [varchar](255) NULL,
	[NgayTao] [datetime] NOT NULL,
	[NgayCapNhat] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaDanhMuc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DonHang]    Script Date: 07/05/2025 10:08:32 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DonHang](
	[MaDonHang] [int] IDENTITY(1,1) NOT NULL,
	[MaKH] [varchar](50) NOT NULL,
	[TenNguoiNhan] [nvarchar](100) NOT NULL,
	[SoDienThoaiNhan] [varchar](20) NOT NULL,
	[DiaChiGiaoHang] [nvarchar](255) NOT NULL,
	[EmailNguoiNhan] [varchar](100) NOT NULL,
	[NgayDatHang] [datetime] NOT NULL,
	[TongTienSanPham] [decimal](10, 2) NOT NULL,
	[PhiVanChuyen] [decimal](10, 2) NOT NULL,
	[GiamGia] [decimal](10, 2) NOT NULL,
	[TongThanhToan] [decimal](10, 2) NOT NULL,
	[PhuongThucThanhToan] [nvarchar](50) NOT NULL,
	[TrangThaiThanhToan] [nvarchar](50) NOT NULL,
	[TrangThaiDonHang] [nvarchar](50) NOT NULL,
	[GhiChuKhachHang] [nvarchar](max) NULL,
	[GhiChuQuanTri] [nvarchar](max) NULL,
	[NgayCapNhat] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaDonHang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KhachHang]    Script Date: 07/05/2025 10:08:32 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KhachHang](
	[MaKH] [varchar](50) NOT NULL,
	[HoTen] [nvarchar](100) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[MatKhau] [varchar](255) NOT NULL,
	[SoDienThoai] [varchar](20) NULL,
	[NgayDangKy] [datetime] NOT NULL,
	[LanDangNhapCuoi] [datetime] NULL,
	[TrangThai] [bit] NOT NULL,
	[MaVaiTro] [int] NOT NULL,
	[DiaChi] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaKH] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NhanVien]    Script Date: 07/05/2025 10:08:32 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NhanVien](
	[MaNV] [varchar](50) NOT NULL,
	[HoTen] [nvarchar](100) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[MatKhau] [varchar](255) NOT NULL,
	[SoDienThoai] [varchar](20) NULL,
	[MaVaiTro] [int] NOT NULL,
	[TrangThai] [bit] NOT NULL,
	[NgayTao] [datetime] NOT NULL,
	[NgayCapNhat] [datetime] NOT NULL,
	[LanDangNhapCuoi] [datetime] NULL,
	[DiaChi] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaNV] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SanPham]    Script Date: 07/05/2025 10:08:32 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SanPham](
	[MaSP] [int] IDENTITY(1,1) NOT NULL,
	[TenSP] [nvarchar](100) NOT NULL,
	[MoTaDai] [nvarchar](1000) NULL,
	[GiaBan] [decimal](10, 2) NOT NULL,
	[SoLuongTon] [int] NOT NULL,
	[HinhAnhChinhURL] [nvarchar](255) NULL,
	[MaDanhMuc] [int] NOT NULL,
	[LuotXem] [int] NULL,
	[DacDiemNoiBat] [nvarchar](max) NULL,
	[NgayTao] [datetime] NULL,
	[NgayCapNhat] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaSP] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VaiTro]    Script Date: 07/05/2025 10:08:32 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VaiTro](
	[MaVaiTro] [int] NOT NULL,
	[TenVaiTro] [nvarchar](50) NOT NULL,
	[MoTa] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaVaiTro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[DanhGia] ADD  DEFAULT (getdate()) FOR [NgayDanhGia]
GO
ALTER TABLE [dbo].[DanhGia] ADD  DEFAULT ((1)) FOR [TrangThai]
GO
ALTER TABLE [dbo].[DanhMuc] ADD  DEFAULT (getdate()) FOR [NgayTao]
GO
ALTER TABLE [dbo].[DanhMuc] ADD  DEFAULT (getdate()) FOR [NgayCapNhat]
GO
ALTER TABLE [dbo].[DonHang] ADD  DEFAULT (getdate()) FOR [NgayDatHang]
GO
ALTER TABLE [dbo].[DonHang] ADD  DEFAULT (getdate()) FOR [NgayCapNhat]
GO
ALTER TABLE [dbo].[KhachHang] ADD  DEFAULT (getdate()) FOR [NgayDangKy]
GO
ALTER TABLE [dbo].[KhachHang] ADD  DEFAULT ((1)) FOR [TrangThai]
GO
ALTER TABLE [dbo].[NhanVien] ADD  DEFAULT ((1)) FOR [TrangThai]
GO
ALTER TABLE [dbo].[NhanVien] ADD  DEFAULT (getdate()) FOR [NgayTao]
GO
ALTER TABLE [dbo].[NhanVien] ADD  DEFAULT (getdate()) FOR [NgayCapNhat]
GO
ALTER TABLE [dbo].[SanPham] ADD  DEFAULT ((0)) FOR [SoLuongTon]
GO
ALTER TABLE [dbo].[SanPham] ADD  DEFAULT ((0)) FOR [LuotXem]
GO
ALTER TABLE [dbo].[SanPham] ADD  DEFAULT (getdate()) FOR [NgayTao]
GO
ALTER TABLE [dbo].[SanPham] ADD  DEFAULT (getdate()) FOR [NgayCapNhat]
GO
ALTER TABLE [dbo].[ChiTietDonHang]  WITH CHECK ADD FOREIGN KEY([MaDonHang])
REFERENCES [dbo].[DonHang] ([MaDonHang])
GO
ALTER TABLE [dbo].[ChiTietDonHang]  WITH CHECK ADD FOREIGN KEY([MaSP])
REFERENCES [dbo].[SanPham] ([MaSP])
GO
ALTER TABLE [dbo].[DanhGia]  WITH CHECK ADD FOREIGN KEY([MaKH])
REFERENCES [dbo].[KhachHang] ([MaKH])
GO
ALTER TABLE [dbo].[DanhGia]  WITH CHECK ADD FOREIGN KEY([MaSP])
REFERENCES [dbo].[SanPham] ([MaSP])
GO
ALTER TABLE [dbo].[DonHang]  WITH CHECK ADD FOREIGN KEY([MaKH])
REFERENCES [dbo].[KhachHang] ([MaKH])
GO
ALTER TABLE [dbo].[KhachHang]  WITH CHECK ADD FOREIGN KEY([MaVaiTro])
REFERENCES [dbo].[VaiTro] ([MaVaiTro])
GO
ALTER TABLE [dbo].[NhanVien]  WITH CHECK ADD FOREIGN KEY([MaVaiTro])
REFERENCES [dbo].[VaiTro] ([MaVaiTro])
GO
ALTER TABLE [dbo].[SanPham]  WITH CHECK ADD FOREIGN KEY([MaDanhMuc])
REFERENCES [dbo].[DanhMuc] ([MaDanhMuc])
GO
ALTER TABLE [dbo].[DanhGia]  WITH CHECK ADD CHECK  (([DiemSo]>=(1) AND [DiemSo]<=(5)))
GO
