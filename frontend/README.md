# Modern Stationery Store - Frontend

Frontend cho ứng dụng E-commerce phân phối văn phòng phẩm hiện đại, được xây dựng với React, TypeScript và Tailwind CSS.

Code bởi Phạm Nguyễn Chu Nguyên - 21050043
## Công nghệ sử dụng

- **Framework**: React với TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form với Zod validation
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Vite

## Cấu trúc thư mục chi tiết

```
frontend/
├── src/
│   ├── components/              # Các thành phần UI có thể tái sử dụng
│   │   ├── ui/                  # Các thành phần UI cơ bản
│   │   │   ├── alert-dialog.tsx # Dialog hiển thị cảnh báo
│   │   │   ├── breadcrumb.tsx   # Điều hướng breadcrumb
│   │   │   ├── button.tsx       # Component nút
│   │   │   ├── input.tsx        # Form input
│   │   │   ├── toast.tsx        # Thông báo nổi
│   │   │   └── toast-container.tsx # Container cho toast
│   │   │
│   │   ├── layout/              # Các thành phần bố cục
│   │   │   └── navbar.tsx       # Thanh điều hướng chính
│   │   │
│   │   └── dashboard/           # Các thành phần cho dashboard
│   │       ├── DashboardLayout.tsx # Layout tổng thể cho dashboard
│   │       ├── Header.tsx       # Phần header của dashboard
│   │       └── Sidebar.tsx      # Thanh bên cho dashboard
│   │
│   ├── lib/                     # Tiện ích, context và các service
│   │   ├── api.ts               # Tương tác với API backend
│   │   ├── auth-context.tsx     # Context quản lý xác thực
│   │   ├── cart-context.tsx     # Context quản lý giỏ hàng
│   │   ├── data.ts              # Dữ liệu tĩnh và mẫu
│   │   ├── lazy-components.tsx  # Tải lazy các component
│   │   ├── notification-context.tsx # Context quản lý thông báo
│   │   ├── preload-routes.tsx   # Preload các routes
│   │   ├── toast.ts             # Tiện ích cho toast
│   │   ├── types.ts             # Định nghĩa TypeScript
│   │   └── utils.ts             # Các hàm tiện ích
│   │
│   ├── pages/                   # Các trang của ứng dụng
│   │   ├── auth/                # Trang xác thực
│   │   │   ├── login.tsx        # Trang đăng nhập
│   │   │   ├── profile.tsx      # Trang hồ sơ người dùng
│   │   │   └── register.tsx     # Trang đăng ký
│   │   │
│   │   ├── admin/               # Trang quản trị
│   │   │   ├── dashboard.tsx    # Dashboard quản trị
│   │   │   ├── products/        # Quản lý sản phẩm
│   │   │   ├── orders/          # Quản lý đơn hàng
│   │   │   ├── users/           # Quản lý người dùng
│   │   │   ├── analytics/       # Phân tích dữ liệu
│   │   │   ├── support/         # Hỗ trợ khách hàng
│   │   │   ├── settings/        # Cài đặt hệ thống
│   │   │   └── dashboard/       # Chi tiết dashboard
│   │   │
│   │   ├── seller/              # Trang dành cho người bán
│   │   │   ├── dashboard.tsx    # Dashboard người bán
│   │   │   ├── products/        # Quản lý sản phẩm của người bán
│   │   │   ├── orders/          # Đơn hàng liên quan
│   │   │   ├── analytics/       # Phân tích dữ liệu bán hàng
│   │   │   ├── support/         # Hỗ trợ người mua
│   │   │   └── dashboard/       # Chi tiết dashboard
│   │   │
│   │   ├── home.tsx             # Trang chủ
│   │   ├── products.tsx         # Trang danh sách sản phẩm
│   │   ├── product-detail.tsx   # Trang chi tiết sản phẩm
│   │   ├── cart.tsx             # Trang giỏ hàng
│   │   └── checkout.tsx         # Trang thanh toán
│   │
│   ├── styles/                  # CSS và style
│   ├── animations/              # Hiệu ứng chuyển động
│   ├── App.tsx                  # Component chính
│   ├── main.tsx                 # Entry point
│   └── index.css                # CSS toàn cục
│
├── public/                     # Tài nguyên tĩnh
├── node_modules/               # Thư viện npm
├── package.json                # Cấu hình npm
├── package-lock.json           # Lock file npm
├── vite.config.ts              # Cấu hình Vite
├── tailwind.config.js          # Cấu hình Tailwind CSS
├── postcss.config.js           # Cấu hình PostCSS
├── eslint.config.js            # Cấu hình ESLint
├── tsconfig.json               # Cấu hình TypeScript chính
├── tsconfig.app.json           # Cấu hình TypeScript cho ứng dụng
├── tsconfig.node.json          # Cấu hình TypeScript cho Node
├── .gitignore                  # Cấu hình Git
└── README.md                   # Tài liệu
```

## Chi tiết triển khai

### Context API và Quản lý State

Frontend sử dụng React Context API để quản lý state toàn cục, giúp chia sẻ dữ liệu giữa các components mà không cần prop drilling:

1. **AuthContext**: Quản lý xác thực người dùng
   - Lưu trữ thông tin đăng nhập và token JWT
   - Xử lý đăng nhập, đăng ký, đăng xuất
   - Tự động khôi phục phiên đăng nhập từ localStorage
   - Cung cấp thông tin người dùng hiện tại cho toàn bộ ứng dụng

2. **CartContext**: Quản lý giỏ hàng
   - Thêm, xóa, cập nhật sản phẩm trong giỏ hàng
   - Tính toán số lượng và tổng giá trị giỏ hàng
   - Lưu trữ giỏ hàng khi người dùng rời trang

3. **NotificationContext**: Quản lý thông báo
   - Hiển thị toast messages sau các thao tác
   - Cung cấp API đơn giản để hiển thị thông báo thành công, lỗi, cảnh báo

### API Communication

Tương tác với backend được xử lý thông qua lớp API service tập trung:

1. **Axios Instance**: Cấu hình chung cho tất cả API requests
   - Tự động gắn token JWT vào header
   - Xử lý lỗi chung
   - Định dạng response

2. **API Services**:
   - **authAPI**: Xử lý các yêu cầu xác thực
   - **productAPI**: Tương tác với các endpoint sản phẩm
   - **orderAPI**: Quản lý đơn hàng
   - **cartAPI**: Đồng bộ giỏ hàng với backend
   - **dashboardAPI**: Lấy dữ liệu cho dashboard

### Routing và Navigation

Điều hướng được xử lý bởi React Router v6 với các tính năng nâng cao:

1. **Route Protection**: Bảo vệ các route yêu cầu đăng nhập hoặc quyền cụ thể
   - Chuyển hướng người dùng chưa đăng nhập đến trang login
   - Kiểm tra quyền truy cập dựa trên vai trò người dùng

2. **Lazy Loading**: Cải thiện hiệu suất tải trang
   - Tải không đồng bộ các components khi cần thiết
   - Hiển thị loading state trong quá trình tải

3. **Breadcrumb Navigation**: Giúp người dùng định vị vị trí hiện tại
   - Tự động cập nhật dựa trên route hiện tại
   - Hỗ trợ điều hướng ngược lại

### UI Components và Styling

Frontend sử dụng Tailwind CSS kết hợp với các components tùy chỉnh:

1. **Component Libraries**:
   - Các components UI cơ bản được xây dựng từ đầu
   - Tùy chỉnh hoàn toàn theo thiết kế và brand identity
   - Responsive trên mọi kích thước màn hình

2. **Layout Components**:
   - Navbar: Điều hướng chính và hiển thị thông tin người dùng
   - DashboardLayout: Giao diện quản trị với sidebar và header

3. **Advanced UI Elements**:
   - Dialog: Hiển thị thông báo xác nhận
   - Toast: Thông báo tạm thời
   - Forms: Các input fields với validation

### Trang người dùng

Các trang chính cho người mua hàng:

1. **Home**: Trang chủ với banner, sản phẩm nổi bật, danh mục
   - Hiển thị sản phẩm mới và bán chạy
   - Tính năng tìm kiếm nhanh
   - Responsive slider với Framer Motion

2. **Product Listing**: Hiển thị danh sách sản phẩm với bộ lọc
   - Lọc theo danh mục, giá, đánh giá
   - Tìm kiếm với debounce
   - Phân trang kết quả

3. **Product Detail**: Chi tiết sản phẩm với hình ảnh, mô tả
   - Gallery hình ảnh sản phẩm
   - Thêm vào giỏ hàng với số lượng
   - Hiển thị đánh giá và đánh giá trung bình

4. **Cart**: Trang giỏ hàng
   - Cập nhật số lượng sản phẩm
   - Xóa sản phẩm khỏi giỏ hàng
   - Tính toán tổng tiền và chiết khấu

5. **Checkout**: Quy trình thanh toán
   - Form địa chỉ giao hàng
   - Chọn phương thức thanh toán
   - Xác nhận đơn hàng

### Admin Dashboard

Giao diện quản trị cho người quản lý:

1. **Admin Dashboard**: Tổng quan về hệ thống
   - Biểu đồ doanh thu và đơn hàng
   - Thống kê sản phẩm bán chạy
   - Đơn hàng mới nhất

2. **Product Management**: Quản lý sản phẩm
   - Thêm, sửa, xóa sản phẩm
   - Upload hình ảnh sản phẩm
   - Quản lý danh mục

3. **Order Management**: Quản lý đơn hàng
   - Xem chi tiết đơn hàng
   - Cập nhật trạng thái đơn hàng
   - Tìm kiếm và lọc đơn hàng

4. **User Management**: Quản lý người dùng
   - Danh sách khách hàng và admin
   - Kích hoạt/vô hiệu hóa tài khoản
   - Phân quyền người dùng

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