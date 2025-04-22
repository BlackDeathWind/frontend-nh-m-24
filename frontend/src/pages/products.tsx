import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Star, Search, Filter, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/lib/data';
import { Product, FilterOptions } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';

// Import animations
import { fadeInUpVariants, buttonVariants, cardHoverVariants } from '@/animations/variants';

// Import styles
import styles from '@/styles/products.module.css';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    category: searchParams.get('category') || undefined
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { addItem } = useCart();
  const isInitialMount = useRef(true);

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

  // Chỉ xử lý tham số URL khi component được mount lần đầu
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const decodedCategory = decodeURIComponent(categoryParam);
      
      // Kiểm tra xem danh mục có tồn tại trong dữ liệu không
      if (categories.includes(decodedCategory)) {
        setFilters(prev => ({ ...prev, category: decodedCategory }));
      } else {
        console.warn(`Danh mục "${decodedCategory}" không tồn tại trong dữ liệu`);
      }
    }
  }, []); // Chỉ chạy một lần khi component được mount

  // Cập nhật URL khi filters thay đổi (sau lần mount đầu tiên)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const newSearchParams = new URLSearchParams();
      
    if (filters.category) {
      newSearchParams.set('category', filters.category);
    }
      
    setSearchParams(newSearchParams, { replace: true });
  }, [filters.category, setSearchParams]);

  // Lọc và hiển thị sản phẩm
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

  // Animation variants for staggered products
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className={styles.header}
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className={styles.title}>
            {filters.category ? `Sản phẩm: ${filters.category}` : 'Tất cả sản phẩm'}
          </h1>
          <p className={styles.subtitle}>
            Khám phá bộ sưu tập văn phòng phẩm đa dạng và hiện đại. Từ bút viết cao cấp đến các dụng cụ học tập sáng tạo.
          </p>
        </motion.div>

        {/* Search and filter bar */}
        <motion.div 
          className={styles.searchFilterBar}
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <div className={styles.searchInputWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className={styles.filterButtonsWrapper}>
            <motion.button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={styles.filterButton}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Filter className={styles.filterIcon} />
              Bộ lọc
            </motion.button>

            <motion.select
              value={filters.sortBy || ''}
              onChange={(e) => handleFilterChange('sortBy', e.target.value || undefined)}
              className={styles.selectInput}
              whileHover={{ scale: 1.03 }}
            >
              <option value="">Sắp xếp</option>
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </motion.select>
          </div>
        </motion.div>

        {/* Filter panel */}
        <AnimatePresence>
        {isFilterOpen && (
            <motion.div 
              className={styles.filterPanel}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.filterGrid}>
              <div>
                  <h3 className={styles.filterSectionTitle}>Danh mục</h3>
                  <div className={styles.filterOptionsList}>
                    <div className={styles.filterOption}>
                    <input
                      id="category-all"
                      name="category"
                      type="radio"
                      checked={!filters.category}
                      onChange={() => handleFilterChange('category', undefined)}
                        className={styles.filterRadio}
                    />
                      <label htmlFor="category-all" className={styles.filterLabel}>
                      Tất cả ({products.length})
                    </label>
                  </div>
                  
                  {categories.map(category => (
                      <div key={category} className={styles.filterOption}>
                      <input
                        id={`category-${category}`}
                        name="category"
                        type="radio"
                        checked={filters.category === category}
                        onChange={() => handleFilterChange('category', category)}
                          className={styles.filterRadio}
                      />
                        <label htmlFor={`category-${category}`} className={styles.filterLabel}>
                        {category} ({categoryCount[category]})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                  <h3 className={styles.filterSectionTitle}>Giá</h3>
                  <div className={styles.filterOptionsList}>
                  {priceRanges.map((range, index) => (
                      <div key={index} className={styles.filterOption}>
                      <input
                        id={`price-${index}`}
                        name="price"
                        type="radio"
                        checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                        onChange={() => {
                          handleFilterChange('minPrice', range.min);
                          handleFilterChange('maxPrice', range.max);
                        }}
                          className={styles.filterRadio}
                      />
                        <label htmlFor={`price-${index}`} className={styles.filterLabel}>
                        {range.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </motion.div>
        )}
        </AnimatePresence>

        {/* Product grid */}
        <AnimatePresence>
        {filteredProducts.length > 0 ? (
            <motion.div 
              className={styles.productGrid}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={fadeInUpVariants}
                  transition={{ 
                    delay: index * 0.05,
                    y: { 
                      duration: 0.15,
                      ease: "easeOut"
                    }
                  }}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  className={styles.productCard}
                >
              <Link
                to={`/products/${product.id}`}
                    className="block h-full"
              >
                    <div className={styles.productImageWrapper}>
                      <motion.img
                    src={product.imageUrl}
                    alt={product.name}
                        className={styles.productImage}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.15 }}
                  />
                </div>
                    <div className={styles.productContent}>
                      <h3 className={styles.productTitle}>
                    {product.name}
                  </h3>
                      <p className={styles.productDescription}>
                    {product.description}
                  </p>
                      <div className={styles.ratingWrapper}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                            className={cn(
                              styles.star,
                          i < Math.floor(product.rating) 
                                ? styles.starFilled
                                : styles.starEmpty
                        )}
                      />
                    ))}
                        <span className={styles.reviewCount}>
                      ({product.reviews})
                    </span>
                  </div>
                      <div className={styles.productFooter}>
                        <span className={styles.productPrice}>
                      {formatPrice(product.price)}
                    </span>
                        <motion.button
                      onClick={(e) => handleAddToCart(product, e)}
                          className={styles.addToCartButton}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                    >
                      <ShoppingCart className="h-5 w-5" />
                        </motion.button>
                  </div>
                </div>
              </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className={styles.emptyState}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className={styles.emptyStateText}>
              Không tìm thấy sản phẩm phù hợp. Vui lòng thử lại với các bộ lọc khác.
            </p>
              <motion.button
              onClick={() => {
                setSearchQuery('');
                setFilters({});
              }}
                className={styles.resetFiltersButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
              Xóa bộ lọc
              </motion.button>
            </motion.div>
        )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
} 