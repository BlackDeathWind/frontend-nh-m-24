-- Sử dụng cơ sở dữ liệu
USE shopdungcuhoctap;
GO

-- View cho bảng VaiTro
CREATE OR ALTER VIEW vw_VaiTro AS
SELECT MaVaiTro, TenVaiTro, MoTa
FROM VaiTro;
GO

-- View cho bảng KhachHang (hiển thị tất cả thông tin kể cả mật khẩu)
CREATE OR ALTER VIEW vw_KhachHang AS
SELECT 
    KH.MaKH, 
    KH.HoTen, 
    KH.Email, 
    KH.MatKhau,
    KH.SoDienThoai, 
    KH.NgayDangKy, 
    KH.LanDangNhapCuoi, 
    KH.TrangThai, 
    KH.MaVaiTro,
    VT.TenVaiTro
FROM KhachHang KH
JOIN VaiTro VT ON KH.MaVaiTro = VT.MaVaiTro;
GO

-- View cho bảng NhanVien (hiển thị tất cả thông tin kể cả mật khẩu)
CREATE OR ALTER VIEW vw_NhanVien AS
SELECT 
    NV.MaNV, 
    NV.HoTen, 
    NV.Email, 
    NV.MatKhau,
    NV.SoDienThoai, 
    NV.MaVaiTro, 
    VT.TenVaiTro,
    NV.TrangThai, 
    NV.NgayTao, 
    NV.NgayCapNhat, 
    NV.LanDangNhapCuoi
FROM NhanVien NV
JOIN VaiTro VT ON NV.MaVaiTro = VT.MaVaiTro;
GO

-- View cho bảng DanhMuc
CREATE OR ALTER VIEW vw_DanhMuc AS
SELECT 
    DM.MaDanhMuc, 
    DM.TenDanhMuc, 
    DM.MoTa, 
    DM.HinhAnh, 
    DM.NgayTao, 
    DM.NgayCapNhat,
    (SELECT COUNT(*) FROM SanPham SP WHERE SP.MaDanhMuc = DM.MaDanhMuc) AS SoLuongSanPham
FROM DanhMuc DM;
GO

-- View cho bảng SanPham
CREATE OR ALTER VIEW vw_SanPham AS
SELECT 
    SP.MaSP, 
    SP.TenSP, 
    SP.MoTaDai, 
    SP.GiaBan, 
    SP.SoLuongTon, 
    SP.HinhAnhChinhURL, 
    SP.MaDanhMuc, 
    DM.TenDanhMuc,
    SP.LuotXem, 
    SP.NgayTao, 
    SP.NgayCapNhat
FROM SanPham SP
JOIN DanhMuc DM ON SP.MaDanhMuc = DM.MaDanhMuc;
GO

-- View cho bảng SanPham với thông tin đánh giá trung bình
CREATE OR ALTER VIEW vw_SanPham_DanhGia AS
SELECT 
    SP.MaSP, 
    SP.TenSP, 
    SP.GiaBan, 
    SP.SoLuongTon, 
    SP.HinhAnhChinhURL, 
    SP.MaDanhMuc, 
    DM.TenDanhMuc,
    SP.LuotXem,
    AVG(CAST(DG.DiemSo AS FLOAT)) AS DiemDanhGiaTrungBinh,
    COUNT(DG.MaDanhGia) AS SoLuongDanhGia
FROM SanPham SP
JOIN DanhMuc DM ON SP.MaDanhMuc = DM.MaDanhMuc
LEFT JOIN DanhGia DG ON SP.MaSP = DG.MaSP
GROUP BY SP.MaSP, SP.TenSP, SP.GiaBan, SP.SoLuongTon, SP.HinhAnhChinhURL, SP.MaDanhMuc, DM.TenDanhMuc, SP.LuotXem;
GO

-- View cho bảng DonHang
CREATE OR ALTER VIEW vw_DonHang AS
SELECT 
    DH.MaDonHang, 
    DH.MaKH, 
    KH.HoTen AS TenKhachHang,
    DH.TenNguoiNhan, 
    DH.SoDienThoaiNhan, 
    DH.DiaChiGiaoHang, 
    DH.EmailNguoiNhan, 
    DH.NgayDatHang, 
    DH.TongTienSanPham, 
    DH.PhiVanChuyen, 
    DH.GiamGia, 
    DH.TongThanhToan, 
    DH.PhuongThucThanhToan, 
    DH.TrangThaiThanhToan, 
    DH.TrangThaiDonHang, 
    DH.GhiChuKhachHang, 
    DH.GhiChuQuanTri, 
    DH.NgayCapNhat
FROM DonHang DH
JOIN KhachHang KH ON DH.MaKH = KH.MaKH;
GO

-- View chi tiết đơn hàng
CREATE OR ALTER VIEW vw_ChiTietDonHang AS
SELECT 
    CTDH.MaChiTietDH, 
    CTDH.MaDonHang, 
    CTDH.MaSP, 
    SP.TenSP,
    SP.HinhAnhChinhURL,
    CTDH.SoLuong, 
    CTDH.DonGia, 
    CTDH.ThanhTien
FROM ChiTietDonHang CTDH
JOIN SanPham SP ON CTDH.MaSP = SP.MaSP;
GO

-- View đơn hàng đầy đủ
CREATE OR ALTER VIEW vw_DonHang_ChiTiet AS
SELECT 
    DH.MaDonHang, 
    DH.MaKH, 
    KH.HoTen AS TenKhachHang,
    DH.TenNguoiNhan, 
    DH.SoDienThoaiNhan, 
    DH.DiaChiGiaoHang, 
    DH.EmailNguoiNhan, 
    DH.NgayDatHang, 
    DH.TongTienSanPham, 
    DH.PhiVanChuyen, 
    DH.GiamGia, 
    DH.TongThanhToan, 
    DH.PhuongThucThanhToan, 
    DH.TrangThaiThanhToan, 
    DH.TrangThaiDonHang,
    CTDH.MaChiTietDH,
    CTDH.MaSP,
    SP.TenSP,
    CTDH.SoLuong,
    CTDH.DonGia,
    CTDH.ThanhTien
FROM DonHang DH
JOIN KhachHang KH ON DH.MaKH = KH.MaKH
JOIN ChiTietDonHang CTDH ON DH.MaDonHang = CTDH.MaDonHang
JOIN SanPham SP ON CTDH.MaSP = SP.MaSP;
GO

-- View cho bảng DanhGia
CREATE OR ALTER VIEW vw_DanhGia AS
SELECT 
    DG.MaDanhGia, 
    DG.MaSP, 
    SP.TenSP,
    DG.MaKH, 
    KH.HoTen AS TenKhachHang,
    DG.DiemSo, 
    DG.BinhLuan, 
    DG.NgayDanhGia, 
    DG.TrangThai
FROM DanhGia DG
JOIN SanPham SP ON DG.MaSP = SP.MaSP
JOIN KhachHang KH ON DG.MaKH = KH.MaKH;
GO

-- View thống kê tổng quan
CREATE OR ALTER VIEW vw_ThongKeTongQuan AS
SELECT
    (SELECT COUNT(*) FROM KhachHang) AS TongSoKhachHang,
    (SELECT COUNT(*) FROM NhanVien) AS TongSoNhanVien,
    (SELECT COUNT(*) FROM SanPham) AS TongSoSanPham,
    (SELECT COUNT(*) FROM DanhMuc) AS TongSoDanhMuc,
    (SELECT COUNT(*) FROM DonHang) AS TongSoDonHang,
    (SELECT SUM(TongThanhToan) FROM DonHang) AS TongDoanhThu,
    (SELECT COUNT(*) FROM DanhGia) AS TongSoDanhGia,
    (SELECT AVG(CAST(DiemSo AS FLOAT)) FROM DanhGia) AS DiemDanhGiaTrungBinh;
GO

-- View thống kê đơn hàng theo tháng
CREATE OR ALTER VIEW vw_ThongKeDonHangTheoThang AS
SELECT 
    YEAR(NgayDatHang) AS Nam,
    MONTH(NgayDatHang) AS Thang,
    COUNT(*) AS SoLuongDonHang,
    SUM(TongThanhToan) AS TongDoanhThu
FROM DonHang
GROUP BY YEAR(NgayDatHang), MONTH(NgayDatHang);
GO

-- View thống kê sản phẩm bán chạy
CREATE OR ALTER VIEW vw_SanPhamBanChay AS
SELECT TOP 100 PERCENT
    SP.MaSP,
    SP.TenSP,
    SP.GiaBan,
    SP.HinhAnhChinhURL,
    SUM(CTDH.SoLuong) AS TongSoLuongBan,
    SUM(CTDH.ThanhTien) AS TongThanhTien
FROM SanPham SP
JOIN ChiTietDonHang CTDH ON SP.MaSP = CTDH.MaSP
GROUP BY SP.MaSP, SP.TenSP, SP.GiaBan, SP.HinhAnhChinhURL
ORDER BY TongSoLuongBan DESC;
GO 