# E-commerce Backend

Backend API cho ứng dụng E-commerce với Node.js, Express, WebSocket và SQL Server.

## Công nghệ sử dụng

- **Framework**: Node.js với Express.js
- **Cơ sở dữ liệu**: SQL Server (với Sequelize ORM)
- **Xác thực**: JWT và Sessions
- **Real-time Communication**: Socket.IO (WebSocket)
- **Cache & Session Store**: Redis
- **Ngôn ngữ**: TypeScript

## Cấu trúc thư mục

```
src/
├── config/         # Cấu hình ứng dụng
├── controllers/    # Controllers xử lý logic
├── middlewares/    # Middleware Express
├── models/         # Định nghĩa mô hình dữ liệu
├── routes/         # Định nghĩa API routes
├── services/       # Business logic
├── utils/          # Tiện ích
├── interfaces/     # TypeScript interfaces
└── index.ts        # Entry point
```

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

## Chế độ phát triển

Ứng dụng này có hỗ trợ chế độ phát triển mà không cần cài đặt Redis hoặc SQL Server. Để kích hoạt chế độ này, hãy đảm bảo các biến môi trường sau được thiết lập trong file `.env`:

```
NODE_ENV=development
SKIP_DB=true
SKIP_REDIS=true
```

Trong chế độ này, hệ thống sẽ sử dụng dữ liệu mẫu và không thực hiện kết nối đến cơ sở dữ liệu hoặc Redis.

## Tài khoản mẫu

Trong chế độ phát triển, ứng dụng đã được cấu hình với các tài khoản mẫu sau:

### Admin
- **Email**: admin@example.com
- **Password**: Admin123!
- **Role**: admin

### Seller
- **Email**: seller@example.com
- **Password**: Seller123!
- **Role**: seller

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
- Chế độ phát triển không yêu cầu DB hoặc Redis

## Quản lý Cache

Backend sử dụng Redis để cache dữ liệu và quản lý session, giúp tăng hiệu suất và tối ưu hóa thời gian phản hồi.

## Phát triển

### Tạo controller mới

```typescript
import { Request, Response, NextFunction } from 'express';

const ExampleController = {
  async getItems(req: Request, res: Response, next: NextFunction) {
    // Xử lý logic
  }
};

export default ExampleController;
```

### Tạo route mới

```typescript
import { Router } from 'express';
import ExampleController from '../controllers/example.controller';

const router = Router();

router.get('/items', ExampleController.getItems);

export default router;
```

Sau đó đăng ký route trong `src/routes/index.ts`.

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