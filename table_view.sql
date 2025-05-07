USE shopdungcuhoctap;
GO

-- Xem dữ liệu từ view VaiTro
SELECT * FROM vw_VaiTro;
SELECT * FROM VaiTro;

-- Xem dữ liệu từ view KhachHang
SELECT * FROM vw_KhachHang;
SELECT * FROM KhachHang;

-- Xem dữ liệu từ view NhanVien
SELECT * FROM vw_NhanVien;
SELECT * FROM NhanVien;

-- Xem dữ liệu từ view DanhMuc
SELECT * FROM vw_DanhMuc;
SELECT * FROM DanhMuc;

-- Xem dữ liệu từ view SanPham
SELECT * FROM vw_SanPham;
SELECT * FROM SanPham;

-- Xem dữ liệu từ view SanPham với thông tin đánh giá
SELECT * FROM vw_SanPham_DanhGia;

-- Xem dữ liệu từ view DonHang
SELECT * FROM vw_DonHang;

-- Xem dữ liệu từ view ChiTietDonHang
SELECT * FROM vw_ChiTietDonHang;

-- Xem dữ liệu từ view DonHang đầy đủ
SELECT * FROM vw_DonHang_ChiTiet;

-- Xem dữ liệu từ view DanhGia
SELECT * FROM vw_DanhGia;

-- Xem thống kê tổng quan
SELECT * FROM vw_ThongKeTongQuan;

-- Xem thống kê đơn hàng theo tháng
SELECT * FROM vw_ThongKeDonHangTheoThang;

-- Xem sản phẩm bán chạy
SELECT * FROM vw_SanPhamBanChay;