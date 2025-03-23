import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Star, Search, Filter, ShoppingCart } from 'lucide-react';
import { products } from '@/lib/data';
import { Product, FilterOptions } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    category: searchParams.get('category') || undefined
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { addItem } = useCart();

  const categories = [...new Set(products.map(product => product.category))];
  const priceRanges = [
    { label: 'Tất cả', min: undefined, max: undefined },
    { label: 'Dưới 100,000đ', min: undefined, max: 100000 },
    { label: '100,000đ - 200,000đ', min: 100000, max: 200000 },
    { label: '200,000đ - 300,000đ', min: 200000, max: 300000 },
    { label: 'Trên 300,000đ', min: 300000, max: undefined },
  ];

  const sortOptions = [
    { value: 'price-asc', label: 'Giá thấp đến cao' },
    { value: 'price-desc', label: 'Giá cao đến thấp' },
    { value: 'name-asc', label: 'Tên A-Z' },
    { value: 'name-desc', label: 'Tên Z-A' },
    { value: 'rating-desc', label: 'Đánh giá cao nhất' },
  ];

  // Xử lý tham số truy vấn từ URL khi trang được tải
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const decodedCategory = decodeURIComponent(categoryParam);
      
      // Kiểm tra xem danh mục có tồn tại trong dữ liệu không
      if (categories.includes(decodedCategory)) {
        setFilters(prev => ({ ...prev, category: decodedCategory }));
      } else {
        console.warn(`Danh mục "${decodedCategory}" không tồn tại trong dữ liệu`);
        // Nếu danh mục không tồn tại, hiển thị tất cả sản phẩm
        setFilters(prev => ({ ...prev, category: undefined }));
      }
    }
  }, [searchParams, categories]);

  // Cập nhật searchParams khi filters thay đổi
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (filters.category) {
      newSearchParams.set('category', filters.category);
    } else {
      newSearchParams.delete('category');
    }
    
    setSearchParams(newSearchParams, { replace: true });
  }, [filters.category, setSearchParams, searchParams]);

  useEffect(() => {
    let result = [...products];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }
    
    // Apply price filter
    if (filters.minPrice !== undefined) {
      result = result.filter(product => product.price >= (filters.minPrice || 0));
    }
    
    if (filters.maxPrice !== undefined) {
      result = result.filter(product => product.price <= filters.maxPrice!);
    }
    
    // Apply sorting
    if (filters.sortBy) {
      result = [...result].sort((a, b) => {
        switch(filters.sortBy) {
          case 'price-asc': 
            return a.price - b.price;
          case 'price-desc': 
            return b.price - a.price;
          case 'name-asc': 
            return a.name.localeCompare(b.name);
          case 'name-desc': 
            return b.name.localeCompare(a.name);
          case 'rating-desc': 
            return b.rating - a.rating;
          default: 
            return 0;
        }
      });
    }
    
    setFilteredProducts(result);
  }, [searchQuery, filters]);

  const handleFilterChange = (filterKey: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [filterKey]: value }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  // Đếm số lượng sản phẩm theo danh mục để hiển thị
  const categoryCount = categories.reduce((acc, category) => {
    acc[category] = products.filter(p => p.category === category).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-10 pb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {filters.category ? `Sản phẩm: ${filters.category}` : 'Tất cả sản phẩm'}
          </h1>
          <p className="mt-2 text-gray-600 max-w-4xl">
            Khám phá bộ sưu tập văn phòng phẩm đa dạng và hiện đại. Từ bút viết cao cấp đến các dụng cụ học tập sáng tạo.
          </p>
        </div>

        {/* Search and filter bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Filter className="h-4 w-4 mr-2" />
              Bộ lọc
            </button>

            <select
              value={filters.sortBy || ''}
              onChange={(e) => handleFilterChange('sortBy', e.target.value || undefined)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Sắp xếp</option>
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter panel */}
        {isFilterOpen && (
          <div className="bg-white p-4 rounded-md shadow-md mb-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Danh mục</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="category-all"
                      name="category"
                      type="radio"
                      checked={!filters.category}
                      onChange={() => handleFilterChange('category', undefined)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="category-all" className="ml-2 text-sm text-gray-700">
                      Tất cả ({products.length})
                    </label>
                  </div>
                  
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`category-${category}`}
                        name="category"
                        type="radio"
                        checked={filters.category === category}
                        onChange={() => handleFilterChange('category', category)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                        {category} ({categoryCount[category]})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Giá</h3>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        id={`price-${index}`}
                        name="price"
                        type="radio"
                        checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                        onChange={() => {
                          handleFilterChange('minPrice', range.min);
                          handleFilterChange('maxPrice', range.max);
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor={`price-${index}`} className="ml-2 text-sm text-gray-700">
                        {range.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                className="group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="aspect-w-3 aspect-h-2 w-full overflow-hidden bg-gray-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover object-center transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 truncate group-hover:text-blue-600">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-2 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn("h-4 w-4", 
                          i < Math.floor(product.rating) 
                            ? "text-yellow-400 fill-current" 
                            : "text-gray-300"
                        )}
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="inline-flex items-center p-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-600">
              Không tìm thấy sản phẩm phù hợp. Vui lòng thử lại với các bộ lọc khác.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilters({});
              }}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 