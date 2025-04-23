# Mock Data (Backend)

Thư mục này chứa tất cả dữ liệu giả lập (mock data) được sử dụng trong ứng dụng backend.

## Cách sử dụng

Import dữ liệu từ thư mục mocks:

```typescript
// Import trực tiếp từ file
import { mockAdminUser } from '../mocks/users';

// Hoặc import từ index (được khuyến nghị)
import { mockAdminUser, mockSellerUser, mockProducts } from '../mocks';
```

## Danh sách các file mock data

1. **users.ts** - Dữ liệu người dùng giả lập cho các vai trò khác nhau
2. **products.ts** - Dữ liệu sản phẩm giả lập 
3. **orders.ts** - Dữ liệu đơn hàng giả lập
4. **index.ts** - File export tất cả các mock data

## Ứng dụng

Mock data được sử dụng trong các trường hợp:

1. Phát triển khi chưa có database thực
2. Kiểm thử (testing) mà không cần database
3. Chế độ demo

## Lưu ý

- Tất cả mock data được định nghĩa với TypeScript interface
- Đảm bảo cấu trúc mock data giống cấu trúc dữ liệu thực
- Đặt `createdAt` và `updatedAt` là `new Date()` để luôn có timestamp mới 