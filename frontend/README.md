# Modern Stationery Store - Frontend

Frontend cho ứng dụng E-commerce phân phối văn phòng phẩm hiện đại, được xây dựng với React, TypeScript và Tailwind CSS.

## Công nghệ sử dụng

- **Framework**: React với TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form với Zod validation
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Vite

## Cấu trúc thư mục

```
src/
├── components/     # Các thành phần UI có thể tái sử dụng
│   ├── ui/         # Các thành phần UI cơ bản
│   ├── layout/     # Các thành phần bố cục
│   └── dashboard/  # Các thành phần cho dashboard
├── pages/          # Các trang của ứng dụng
│   ├── admin/      # Trang quản trị
│   ├── seller/     # Trang dành cho người bán
│   └── auth/       # Trang xác thực
├── lib/            # Tiện ích, context và các service
├── App.tsx         # Component chính
└── main.tsx        # Entry point
```

## Cài đặt

### Yêu cầu

- Node.js (>= 14)
- NPM hoặc Yarn

### Bước 1: Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### Bước 2: Cấu hình biến môi trường

Tạo file `.env` trong thư mục gốc với nội dung:

```
VITE_API_URL=http://localhost:5000/api
```

### Bước 3: Chạy ứng dụng

Development mode:

```bash
npm run dev
# hoặc
yarn dev
```

Production build:

```bash
npm run build
npm run preview
# hoặc
yarn build
yarn preview
```

## Tính năng chính

- **Responsive Design**: Giao diện thích ứng với tất cả các kích thước màn hình
- **Theme**: Thiết kế hiện đại và đồng nhất
- **Routing**: Điều hướng liền mạch giữa các trang
- **Authentication**: Đăng nhập, đăng ký và quản lý phiên
- **Role-based Access**: Phân quyền dựa trên vai trò (user, seller, admin)
- **Cart Management**: Quản lý giỏ hàng trực quan
- **Checkout Process**: Quy trình thanh toán đơn giản
- **Admin Dashboard**: Bảng điều khiển quản trị toàn diện
- **Seller Dashboard**: Giao diện quản lý sản phẩm cho người bán

## Vai trò người dùng

Ứng dụng hỗ trợ 3 vai trò người dùng với các quyền khác nhau:

### User
- Xem sản phẩm
- Thêm sản phẩm vào giỏ hàng
- Đặt hàng
- Xem lịch sử đơn hàng

### Seller
- Tất cả quyền của User
- Truy cập vào Seller Dashboard
- Quản lý sản phẩm (thêm, sửa, xóa)
- Xem đơn hàng liên quan đến sản phẩm của mình

### Admin
- Tất cả quyền của Seller
- Truy cập vào Admin Dashboard
- Quản lý danh mục sản phẩm
- Quản lý tất cả sản phẩm
- Quản lý người dùng
- Quản lý tất cả đơn hàng

## Context API

Ứng dụng sử dụng React Context API để quản lý state toàn cục:

- **AuthContext**: Quản lý xác thực và thông tin người dùng
- **CartContext**: Quản lý giỏ hàng
- **NotificationContext**: Quản lý thông báo và toast messages

## Kết nối với Backend

Frontend kết nối với Backend thông qua RESTful API sử dụng Axios. Các API endpoint được cấu hình trong `src/lib/api.ts`.

### Xác thực

- Sử dụng JWT token được lưu trữ trong localStorage
- Token được gửi kèm với mỗi request trong header Authorization

## Tài khoản mẫu

Bạn có thể sử dụng các tài khoản mẫu sau để đăng nhập và trải nghiệm các tính năng khác nhau:

### Admin
- **Email**: admin@example.com
- **Password**: Admin123!

### Seller
- **Email**: seller@example.com
- **Password**: Seller123!

## Phát triển

### Component mới

```tsx
import React from 'react';

interface ExampleProps {
  title: string;
}

const Example: React.FC<ExampleProps> = ({ title }) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-medium">{title}</h2>
    </div>
  );
};

export default Example;
```

### Context mới

```tsx
import React, { createContext, useContext, useState } from 'react';

interface ExampleContextProps {
  value: string;
  setValue: (value: string) => void;
}

const ExampleContext = createContext<ExampleContextProps | undefined>(undefined);

export const ExampleProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [value, setValue] = useState('');

  return (
    <ExampleContext.Provider value={{ value, setValue }}>
      {children}
    </ExampleContext.Provider>
  );
};

export const useExample = () => {
  const context = useContext(ExampleContext);
  if (context === undefined) {
    throw new Error('useExample must be used within an ExampleProvider');
  }
  return context;
};
``` 