use [shopdungcuhoctap]
go

-- cập nhật mật khẩu Admin123!
UPDATE NhanVien SET MatKhau = '$2a$12$1C0/4Iy1BZ3DPZVIvvzGze0jTdVAAqA08j/9Zy3cFVgLVuXr6LZVq' WHERE Email = 'admin@example.com'; 

-- xóa tài khoản chunguyentest01@gmail.com
DELETE FROM KhachHang WHERE Email = 'chunguyentest01@gmail.com';

-- xóa bảng SanPham
DROP TABLE SanPham;

-- cập nhật sản phẩm
UPDATE SanPham SET HinhAnhChinhURL = 'https://product.hstatic.net/1000362139/product/tl027-1_1c30035a05d74ccbb3fa05713c5a309f.png' 
WHERE MaSP = '1'; 