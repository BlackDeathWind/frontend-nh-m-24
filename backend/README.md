# E-commerce Backend

Backend API cho ứng dụng E-commerce với Node.js, Express, WebSocket và SQL Server.

## Công nghệ sử dụng

- **Framework**: Node.js với Express.js
- **Cơ sở dữ liệu**: SQL Server (với Sequelize ORM)
- **Xác thực**: JWT và Sessions
- **Real-time Communication**: Socket.IO (WebSocket)
- **Cache & Session Store**: Redis
- **Ngôn ngữ**: TypeScript

## Cấu trúc thư mục chi tiết

```
backend/
├── src/
│   ├── config/                  # Cấu hình ứng dụng
│   │   ├── config.ts            # Cấu hình biến môi trường
│   │   ├── database.ts          # Kết nối SQL Server với Sequelize
│   │   ├── redis.ts             # Cấu hình Redis
│   │   └── websocket.ts         # Cấu hình WebSocket/Socket.IO
│   │
│   ├── controllers/             # Controllers xử lý logic
│   │   ├── auth.controller.ts   # Xử lý xác thực người dùng
│   │   ├── category.controller.ts # Quản lý danh mục
│   │   ├── donhang.controller.ts # Quản lý đơn hàng
│   │   ├── khachhang.controller.ts # Quản lý khách hàng
│   │   ├── nhanvien.controller.ts # Quản lý nhân viên
│   │   ├── product.controller.ts # Quản lý sản phẩm
│   │   └── review.controller.ts  # Quản lý đánh giá
│   │
│   ├── interfaces/              # TypeScript interfaces
│   │   ├── category.interface.ts # Interface cho danh mục
│   │   ├── order.interface.ts   # Interface cho đơn hàng
│   │   ├── product.interface.ts # Interface cho sản phẩm
│   │   ├── review.interface.ts  # Interface cho đánh giá
│   │   └── user.interface.ts    # Interface cho người dùng
│   │
│   ├── middlewares/             # Middleware Express
│   │   ├── auth.ts              # Middleware xác thực
│   │   ├── cache.ts             # Middleware cache
│   │   ├── cors.ts              # Middleware CORS
│   │   ├── errorHandler.ts      # Xử lý lỗi toàn cục
│   │   └── session.ts           # Quản lý phiên
│   │
│   ├── models/                  # Định nghĩa mô hình dữ liệu
│   │   ├── chitietdonhang.model.ts # Mô hình chi tiết đơn hàng
│   │   ├── danhmuc.model.ts     # Mô hình danh mục
│   │   ├── danhgia.model.ts     # Mô hình đánh giá
│   │   ├── donhang.model.ts     # Mô hình đơn hàng
│   │   ├── index.ts             # Cấu hình quan hệ giữa các mô hình
│   │   ├── khachhang.model.ts   # Mô hình khách hàng
│   │   ├── nhanvien.model.ts    # Mô hình nhân viên
│   │   ├── sanpham.model.ts     # Mô hình sản phẩm
│   │   └── vaitro.model.ts      # Mô hình vai trò
│   │
│   ├── routes/                  # Định nghĩa API routes
│   │   ├── auth.routes.ts       # Routes xác thực
│   │   ├── category.routes.ts   # Routes danh mục
│   │   ├── donhang.routes.ts    # Routes đơn hàng
│   │   ├── index.ts             # Cấu hình tất cả routes
│   │   ├── khachhang.routes.ts  # Routes khách hàng
│   │   ├── mock.routes.ts       # Routes dữ liệu mẫu
│   │   ├── nhanvien.routes.ts   # Routes nhân viên
│   │   ├── product.routes.ts    # Routes sản phẩm
│   │   └── review.routes.ts     # Routes đánh giá
│   │
│   ├── services/                # Business logic
│   │   ├── auth.service.ts      # Dịch vụ xác thực
│   │   ├── category.service.ts  # Dịch vụ danh mục
│   │   ├── khachhang.service.ts # Dịch vụ khách hàng
│   │   ├── order.service.ts     # Dịch vụ đơn hàng
│   │   ├── product.service.ts   # Dịch vụ sản phẩm
│   │   └── review.service.ts    # Dịch vụ đánh giá
│   │
│   ├── types/                   # Định nghĩa types
│   │   └── auth.ts              # Types cho xác thực
│   │
│   ├── utils/                   # Tiện ích
│   │   ├── helpers.ts           # Hàm hỗ trợ
│   │   ├── logger.ts            # Ghi log ứng dụng
│   │   ├── responseHandler.ts   # Định dạng phản hồi API
│   │   └── validator.ts         # Xác thực đầu vào
│   │
│   └── index.ts                 # Entry point
│
├── node_modules/                # Thư viện npm
├── logs/                        # Thư mục chứa log
├── package.json                 # Cấu hình npm
├── package-lock.json            # Lock file npm
├── tsconfig.json                # Cấu hình TypeScript
├── .gitignore                   # Cấu hình Git
├── ket_noi_sql_server.txt       # Hướng dẫn kết nối SQL Server
└── README.md                    # Tài liệu
```

## Chi tiết triển khai

### Models (Mô hình dữ liệu)

Backend sử dụng Sequelize ORM để tương tác với SQL Server, với các mô hình dữ liệu chính:

1. **KhachHang**: Quản lý thông tin khách hàng và người dùng hệ thống
   - Tự động hash mật khẩu trước khi lưu vào database với bcrypt
   - Hỗ trợ so sánh mật khẩu để xác thực đăng nhập
   - Quản lý trạng thái kích hoạt của tài khoản

2. **NhanVien**: Quản lý thông tin nhân viên và quản trị viên
   - Phân quyền dựa trên vai trò (MaVaiTro)
   - Theo dõi thời gian đăng nhập cuối

3. **SanPham**: Quản lý thông tin sản phẩm
   - Hỗ trợ lưu trữ thông tin chi tiết, hình ảnh, giá cả
   - Liên kết với danh mục sản phẩm

4. **DonHang & ChiTietDonHang**: Quản lý đơn hàng
   - Đơn hàng chính lưu thông tin chung: khách hàng, địa chỉ, phương thức thanh toán
   - Chi tiết đơn hàng lưu từng sản phẩm, số lượng, giá

5. **DanhGia**: Hệ thống đánh giá sản phẩm
   - Liên kết giữa khách hàng và sản phẩm
   - Hỗ trợ điểm số và nội dung đánh giá

### Services (Logic nghiệp vụ)

Backend được thiết kế theo mô hình 3 lớp với Services đóng vai trò xử lý logic nghiệp vụ:

1. **AuthService**: Xử lý các tác vụ xác thực
   - Đăng ký, đăng nhập, đăng xuất
   - Tạo và xác thực JWT token
   - Quản lý token blacklist với Redis
   - Hỗ trợ hai loại người dùng: khách hàng và quản trị viên

2. **KhachHangService & NhanVienService**: Quản lý người dùng
   - CRUD đầy đủ cho các đối tượng người dùng
   - Tìm kiếm, phân trang, lọc người dùng

3. **ProductService**: Quản lý sản phẩm
   - CRUD đầy đủ cho sản phẩm
   - Tìm kiếm, phân trang, lọc sản phẩm
   - Quản lý hình ảnh sản phẩm

4. **OrderService**: Quản lý đơn hàng
   - Tạo đơn hàng mới với nhiều sản phẩm
   - Cập nhật trạng thái đơn hàng
   - Tính toán tổng tiền, chiết khấu, thuế

### Controllers & Routes

Các controllers được thiết kế để xử lý request từ client và giao tiếp với services:

1. **AuthController**: Xử lý các yêu cầu xác thực
   - Kiểm tra đầu vào, bảo mật
   - Tạo session và cookie JWT
   - Phân quyền truy cập

2. **ProductController**: Xử lý các yêu cầu về sản phẩm
   - Định dạng dữ liệu response
   - Phân trang kết quả
   - Xử lý lỗi

### WebSocket

Hệ thống WebSocket được triển khai để:

1. **Thông báo thời gian thực**:
   - Thông báo trạng thái đơn hàng mới cho admin
   - Cập nhật tình trạng đơn hàng cho khách hàng

2. **Chat Hỗ trợ khách hàng**:
   - Giao tiếp realtime giữa khách hàng và nhân viên hỗ trợ
   - Lưu trữ lịch sử chat

### Bảo mật & Xác thực

Backend áp dụng nhiều lớp bảo mật:

1. **JWT Authentication**:
   - Token được tạo khi đăng nhập và gửi trong cookie hoặc header
   - Middleware kiểm tra và xác thực token cho mỗi request
   - Blacklist token khi đăng xuất

2. **Session Management**:
   - Session được lưu trữ trong Redis
   - Đồng bộ giữa nhiều instance của backend (horizontal scaling)

3. **Password Security**:
   - Mật khẩu được hash với bcrypt
   - Validation độ mạnh của mật khẩu

## Cài đặt

### Yêu cầu

- Node.js (>= 14)
- Redis (tùy chọn, xem phần "Chế độ phát triển" bên dưới)
- SQL Server (tùy chọn, xem phần "Chế độ phát triển" bên dưới)

### Bước 1: Cài đặt dependencies

```bash
npm install
```

### Bước 2: Cấu hình biến môi trường

Tạo file `.env` từ file `.env.example`:

```bash
cp .env.example .env
```

Cập nhật các giá trị trong file `.env` phù hợp với môi trường của bạn.

### Bước 3: Tạo cơ sở dữ liệu

Tạo database trong SQL Server và cập nhật thông tin kết nối trong file `.env`.

### Bước 4: Chạy ứng dụng

Development mode:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Đăng ký tài khoản mới
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/profile` - Lấy thông tin người dùng hiện tại
- `PUT /api/auth/profile` - Cập nhật thông tin người dùng

### Products

- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Lấy thông tin chi tiết sản phẩm
- `POST /api/products` - Tạo sản phẩm mới (yêu cầu quyền admin hoặc seller)
- `PUT /api/products/:id` - Cập nhật sản phẩm (yêu cầu quyền admin hoặc seller)
- `DELETE /api/products/:id` - Xóa sản phẩm (yêu cầu quyền admin hoặc seller)

### Categories

- `GET /api/categories` - Lấy danh sách danh mục
- `GET /api/categories/:id` - Lấy thông tin chi tiết danh mục
- `POST /api/categories` - Tạo danh mục mới (yêu cầu quyền admin)
- `PUT /api/categories/:id` - Cập nhật danh mục (yêu cầu quyền admin)
- `DELETE /api/categories/:id` - Xóa danh mục (yêu cầu quyền admin)

### Orders

- `GET /api/orders` - Lấy danh sách đơn hàng của người dùng hiện tại
- `GET /api/orders/:id` - Lấy thông tin chi tiết đơn hàng
- `POST /api/orders` - Tạo đơn hàng mới
- `PUT /api/orders/:id/status` - Cập nhật trạng thái đơn hàng (yêu cầu quyền admin hoặc seller)

## WebSocket Events

- Connection: Thiết lập kết nối với server
- Authentication: Xác thực WebSocket với JWT
- Notifications: Nhận thông báo real-time

## Tính năng

- RESTful API
- WebSocket cho giao tiếp real-time
- JWT & Session authentication
- Redis caching (tùy chọn)
- Logging với Winston
- SQL Server với ORM Sequelize
- Error handling
- Input validation
- CORS
- Security headers
- Helmet protection

## Quản lý Cache

Backend sử dụng Redis để cache dữ liệu và quản lý session, giúp tăng hiệu suất và tối ưu hóa thời gian phản hồi.

## Bảo mật

- Sử dụng Helmet để thiết lập các header bảo mật
- CORS được cấu hình để chỉ cho phép các origin hợp lệ
- JWT được sử dụng cho xác thực API
- Mật khẩu được hash với bcrypt trước khi lưu vào database
- Token blacklist được lưu trong Redis để ngăn chặn tấn công replay

## Logging

Hệ thống sử dụng Winston để ghi log, với các cấp độ khác nhau:
- ERROR: Lỗi nghiêm trọng cần xử lý ngay
- WARN: Cảnh báo cần chú ý
- INFO: Thông tin chung
- DEBUG: Thông tin chi tiết hơn, hữu ích cho phát triển 