# Mock Data

Thư mục này chứa tất cả dữ liệu giả lập (mock data) được sử dụng trong ứng dụng frontend.

## Cách sử dụng

Import dữ liệu từ thư mục mocks:

```javascript
// Import trực tiếp từ file
import { products } from '@/mocks/products';

// Hoặc import từ index (được khuyến nghị)
import { products, adminProducts, revenueData } from '@/mocks';
```

## Danh sách các file mock data

1. **products.ts** - Dữ liệu sản phẩm chính của cửa hàng
2. **admin-products.ts** - Dữ liệu sản phẩm dùng trong trang quản trị admin
3. **dashboard.ts** - Dữ liệu cho dashboard của admin
4. **seller-dashboard.ts** - Dữ liệu cho dashboard của seller
5. **index.ts** - File export tất cả các mock data

## Lưu ý

- Tất cả mock data đều được export chuẩn dạng TypeScript với định nghĩa kiểu dữ liệu
- Hãy import các data thông qua file index.ts để dễ dàng quản lý dependencies
- Khi cần thay đổi / thêm mới mock data, hãy cập nhật ở đây thay vì trong các file component 