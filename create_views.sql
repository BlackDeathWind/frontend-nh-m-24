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
    sp.MaSP,
    sp.TenSP,
    sp.MoTaDai,
    sp.GiaBan,
    sp.SoLuongTon,
    sp.HinhAnhChinhURL,
    sp.MaDanhMuc,
    sp.DacDiemNoiBat,
    sp.LuotXem,
    sp.NgayTao,
    sp.NgayCapNhat,
    AVG(CAST(dg.DiemSo AS FLOAT)) AS DiemDanhGiaTrungBinh,
    COUNT(dg.MaDanhGia) AS SoLuongDanhGia
FROM 
    SanPham sp
LEFT JOIN 
    DanhGia dg ON sp.MaSP = dg.MaSP AND dg.TrangThai = 1
GROUP BY 
    sp.MaSP, sp.TenSP, sp.MoTaDai, sp.GiaBan, sp.SoLuongTon, sp.HinhAnhChinhURL, 
    sp.MaDanhMuc, sp.DacDiemNoiBat, sp.LuotXem, sp.NgayTao, sp.NgayCapNhat;
GO

-- View cho bảng DonHang
CREATE OR ALTER VIEW vw_DonHang AS
SELECT 
    dh.MaDonHang,
    dh.MaKH,
    kh.HoTen AS TenKhachHang,
    dh.TenNguoiNhan,
    dh.SoDienThoaiNhan,
    dh.DiaChiGiaoHang,
    dh.EmailNguoiNhan,
    dh.NgayDatHang,
    dh.TongTienSanPham,
    dh.PhiVanChuyen,
    dh.GiamGia,
    dh.TongThanhToan,
    dh.PhuongThucThanhToan,
    dh.TrangThaiThanhToan,
    dh.TrangThaiDonHang,
    dh.GhiChuKhachHang,
    dh.GhiChuQuanTri,
    dh.NgayCapNhat
FROM 
    DonHang dh
JOIN 
    KhachHang kh ON dh.MaKH = kh.MaKH;
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
    dh.MaDonHang,
    dh.MaKH,
    kh.HoTen AS TenKhachHang,
    dh.TenNguoiNhan,
    dh.SoDienThoaiNhan,
    dh.DiaChiGiaoHang,
    dh.EmailNguoiNhan,
    dh.NgayDatHang,
    dh.TongTienSanPham,
    dh.PhiVanChuyen,
    dh.GiamGia,
    dh.TongThanhToan,
    dh.PhuongThucThanhToan,
    dh.TrangThaiThanhToan,
    dh.TrangThaiDonHang,
    dh.GhiChuKhachHang,
    dh.GhiChuQuanTri,
    dh.NgayCapNhat,
    ctdh.MaChiTietDH,
    ctdh.MaSP,
    sp.TenSP,
    sp.HinhAnhChinhURL,
    ctdh.SoLuong,
    ctdh.DonGia,
    ctdh.ThanhTien
FROM 
    DonHang dh
JOIN 
    KhachHang kh ON dh.MaKH = kh.MaKH
JOIN 
    ChiTietDonHang ctdh ON dh.MaDonHang = ctdh.MaDonHang
JOIN 
    SanPham sp ON ctdh.MaSP = sp.MaSP;
GO

-- View cho bảng DanhGia
CREATE OR ALTER VIEW vw_DanhGia AS
SELECT 
    dg.MaDanhGia,
    dg.MaSP,
    sp.TenSP,
    dg.MaKH,
    kh.HoTen AS TenKhachHang,
    dg.DiemSo,
    dg.BinhLuan,
    dg.NgayDanhGia,
    dg.TrangThai
FROM 
    DanhGia dg
JOIN 
    SanPham sp ON dg.MaSP = sp.MaSP
JOIN 
    KhachHang kh ON dg.MaKH = kh.MaKH;
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
SELECT 
    sp.MaSP,
    sp.TenSP,
    sp.GiaBan,
    sp.HinhAnhChinhURL,
    sp.MaDanhMuc,
    SUM(ctdh.SoLuong) AS TongSoLuongBan
FROM 
    SanPham sp
JOIN 
    ChiTietDonHang ctdh ON sp.MaSP = ctdh.MaSP
JOIN 
    DonHang dh ON ctdh.MaDonHang = dh.MaDonHang
WHERE 
    dh.TrangThaiDonHang NOT IN ('Đã hủy', 'Trả hàng')
GROUP BY 
    sp.MaSP, sp.TenSP, sp.GiaBan, sp.HinhAnhChinhURL, sp.MaDanhMuc;
GO 