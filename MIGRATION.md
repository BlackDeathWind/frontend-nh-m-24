# Hướng dẫn Di chuyển Mock Data

## Vấn đề hiện tại
Dự án đã chuyển toàn bộ mock data từ frontend sang backend. Tuy nhiên, một số component vẫn đang sử dụng cách import trực tiếp như:

```javascript
import { products } from '@/lib/data';
```

Điều này dẫn đến lỗi:
```
SyntaxError: The requested module '/src/lib/data.ts' does not provide an export named 'products'
```

## Giải pháp tạm thời
Đã thêm export tương thích ngược trong file `frontend/src/lib/data.ts` để không gây lỗi runtime. Tuy nhiên, giải pháp này không phải là tối ưu vì:
- Dữ liệu được tải bất đồng bộ nhưng sử dụng như đồng bộ
- Component sẽ render với mảng rỗng trước khi dữ liệu được tải
- Tất cả dữ liệu sẽ được tải ngay khi import, kể cả khi không cần thiết

## Hướng dẫn di chuyển cho component

### 1. Cập nhật Product List
Từ:
```javascript
// Trước đây
import { products } from '@/lib/data';

function ProductList() {
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

Sang:
```javascript
// Cách tốt nhất - Sử dụng React Query
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/data';

function ProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });
  
  if (isLoading) return <div>Đang tải sản phẩm...</div>;
  if (error) return <div>Có lỗi xảy ra khi tải sản phẩm</div>;
  
  const products = data?.data || [];
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

Hoặc sử dụng useState và useEffect:
```javascript
// Cách thông thường - Sử dụng useState + useEffect
import { useState, useEffect } from 'react';
import { getProducts } from '@/lib/data';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getProducts();
        setProducts(response.data || []);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err);
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  if (isLoading) return <div>Đang tải sản phẩm...</div>;
  if (error) return <div>Có lỗi xảy ra khi tải sản phẩm</div>;
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### 2. Cập nhật Product Detail
Từ:
```javascript
// Trước đây
import { products } from '@/lib/data';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  
  if (!product) return <div>Không tìm thấy sản phẩm</div>;
  
  return (
    <div>
      <h1>{product.name}</h1>
      {/* Hiển thị chi tiết sản phẩm */}
    </div>
  );
}
```

Sang:
```javascript
// Sử dụng React Query
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/data';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });
  
  if (isLoading) return <div>Đang tải sản phẩm...</div>;
  if (error) return <div>Có lỗi xảy ra khi tải sản phẩm</div>;
  
  const products = data?.data || [];
  const product = products.find(p => p.id === id);
  
  if (!product) return <div>Không tìm thấy sản phẩm</div>;
  
  return (
    <div>
      <h1>{product.name}</h1>
      {/* Hiển thị chi tiết sản phẩm */}
    </div>
  );
}
```

## Xác định component cần cập nhật
Các component cần cập nhật:
- products.tsx
- product-detail.tsx 
- Và bất kỳ component nào khác đang import trực tiếp từ `@/lib/data` (không sử dụng hàm getter)

## Deadline
Giải pháp tạm thời (tương thích ngược) sẽ bị loại bỏ sau 2 tuần kể từ ngày thông báo này, vui lòng cập nhật tất cả component càng sớm càng tốt. 