# CHANGELOG - Chuyển Mock Data từ Frontend sang Backend

## Nội dung thay đổi

### 1. Di chuyển dữ liệu mẫu
- Đã chuyển tất cả mock data từ `frontend/src/mocks` sang `backend/src/mocks`
- Các file mới được tạo ở backend:
  - `admin-products.ts`: Mock data cho trang quản lý sản phẩm của admin
  - `dashboard.ts`: Mock data cho dashboard tổng quan 
  - `seller-dashboard.ts`: Mock data cho dashboard người bán

### 2. Cập nhật Backend
- Đã thêm route mới `/mock` trong `backend/src/routes/mock.routes.ts` để phục vụ tất cả mock data
- Các endpoint mới:
  - GET `/api/mock/products`: Lấy mock products theo định dạng frontend
  - GET `/api/mock/products-raw`: Lấy mock products theo định dạng backend
  - GET `/api/mock/admin-products`: Lấy mock admin products
  - GET `/api/mock/dashboard`: Lấy mock dashboard data
  - GET `/api/mock/seller-dashboard`: Lấy mock seller dashboard data
  - GET `/api/mock/orders`: Lấy mock orders data

### 3. Cập nhật Frontend
- Đã cập nhật `frontend/src/lib/api.ts` để thêm các API mới lấy mock data từ backend
- Đã cập nhật `frontend/src/lib/data.ts` để sử dụng API thay vì import trực tiếp

## Hướng dẫn chuyển đổi

### Thay đổi cách import trong các component
**Trước đây:**
```javascript
import { products } from '@/mocks/products';
import { adminProducts } from '@/mocks/admin-products';
import { revenueData, topProducts, recentOrders } from '@/mocks/dashboard';
```

**Bây giờ:**
```javascript
import { getProducts, getAdminProducts, getDashboardData } from '@/lib/data';

// Trong component (sử dụng React Query hoặc useState + useEffect)
const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  fetchData();
}, []);
```

### Sử dụng với React Query (khuyến nghị)
```javascript
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/data';

function ProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });
  
  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div>Có lỗi xảy ra</div>;
  
  const products = data?.data || [];
  
  return (
    // Render components sử dụng products
  );
}
```

## Lưu ý
- Tất cả dữ liệu mock hiện nay sẽ được phục vụ thông qua backend API
- Nên sử dụng React Query hoặc tương tự để quản lý cache và tải lại dữ liệu
- Cấu trúc dữ liệu trả về từ backend sẽ có dạng `{ success: true, data: [...] }`
- Hãy xử lý API một cách bất đồng bộ để tránh UI bị treo 