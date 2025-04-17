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
- Redis
- SQL Server

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

### Các API khác
- *Sẽ được phát triển tiếp*

## WebSocket Events

- Connection: Thiết lập kết nối với server
- Authentication: Xác thực WebSocket với JWT
- Notifications: Nhận thông báo real-time

## Tính năng

- RESTful API
- WebSocket cho giao tiếp real-time
- JWT & Session authentication
- Redis caching
- Logging với Winston
- SQL Server với ORM
- Error handling
- Input validation
- CORS
- Security headers
- Helmet protection

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