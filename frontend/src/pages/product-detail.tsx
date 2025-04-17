import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Minus, Plus, ShoppingCart, Heart, Share2, Check } from 'lucide-react';
import { products } from '@/lib/data';
import { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications'>('description');
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { addItem } = useCart();

  // Lấy sản phẩm theo id
  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 pt-24">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Không tìm thấy sản phẩm</h2>
          <p className="mt-2 text-gray-600">
            Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Quay lại danh sách sản phẩm
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, Math.min(product.stock, quantity + value));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
    }
  };
  
  // Sản phẩm liên quan
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-gray-50 min-h-screen pb-16 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Link
            to="/products"
            className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Quay lại danh sách sản phẩm
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Ảnh sản phẩm */}
            <div className="p-6 md:p-8 flex items-center justify-center bg-gray-50">
              <div className="w-full max-w-md">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto rounded-md shadow-sm object-cover object-center"
                />
              </div>
            </div>

            {/* Thông tin sản phẩm */}
            <div className="p-6 md:p-8 flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
              
              <div className="mt-3 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn("h-5 w-5", 
                        i < Math.floor(product.rating) 
                          ? "text-yellow-400 fill-current" 
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-600">{product.reviews} đánh giá</p>
              </div>

              <div className="mt-5">
                <p className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</p>
                <p className="mt-1 text-sm text-gray-500">Đã bao gồm thuế & phí</p>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900">Mô tả ngắn</h3>
                <p className="mt-2 text-base text-gray-600">{product.description}</p>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Số lượng</h3>
                  <p className="text-sm text-gray-500">{product.stock} sản phẩm có sẵn</p>
                </div>
                <div className="mt-2 flex items-center">
                  <button
                    type="button"
                    className="p-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    className="mx-2 w-16 text-center border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                    min="1"
                    max={product.stock}
                  />
                  <button
                    type="button"
                    className="p-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={cn(
                    "flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all",
                    isAddedToCart ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                  )}
                >
                  {isAddedToCart ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Đã thêm vào giỏ
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Thêm vào giỏ
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Yêu thích
                </button>
                <button
                  type="button"
                  className="sm:flex-none inline-flex items-center justify-center p-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
              <button
                className={cn(
                  "py-4 px-6 text-sm font-medium focus:outline-none",
                  activeTab === 'description'
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
                onClick={() => setActiveTab('description')}
              >
                Mô tả chi tiết
              </button>
              <button
                className={cn(
                  "py-4 px-6 text-sm font-medium focus:outline-none",
                  activeTab === 'specifications'
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
                onClick={() => setActiveTab('specifications')}
              >
                Thông số kỹ thuật
              </button>
            </div>

            <div className="p-6 md:p-8">
              {activeTab === 'description' ? (
                <div className="prose max-w-none">
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-gray-600 mt-4">
                    Sản phẩm {product.name} thuộc danh mục {product.category}, là một sự lựa chọn tuyệt vời cho những ai đang tìm kiếm sản phẩm chất lượng cao với giá cả hợp lý. Sản phẩm được sản xuất với chất lượng cao nhất, đảm bảo độ bền và hiệu suất sử dụng lâu dài.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Đặc điểm nổi bật</h3>
                    <ul className="mt-4 space-y-3">
                      {product.features?.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Thông tin sản phẩm</h3>
                    <div className="bg-gray-50 rounded-md p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex justify-between border-b border-gray-200 py-2">
                          <span className="text-gray-500">Danh mục</span>
                          <span className="text-gray-900 font-medium">{product.category}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 py-2">
                          <span className="text-gray-500">Trạng thái</span>
                          <span className="text-green-600 font-medium">Còn hàng</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 py-2">
                          <span className="text-gray-500">Đánh giá</span>
                          <span className="text-gray-900 font-medium">{product.rating}/5 ({product.reviews} đánh giá)</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 py-2">
                          <span className="text-gray-500">Số lượng còn</span>
                          <span className="text-gray-900 font-medium">{product.stock}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sản phẩm liên quan */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sản phẩm liên quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link
                  to={`/products/${relatedProduct.id}`}
                  key={relatedProduct.id}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="aspect-w-3 aspect-h-2 w-full overflow-hidden bg-gray-100">
                    <img
                      src={relatedProduct.imageUrl}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover object-center transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 truncate group-hover:text-blue-600">
                      {relatedProduct.name}
                    </h3>
                    <div className="mt-2 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn("h-4 w-4", 
                            i < Math.floor(relatedProduct.rating) 
                              ? "text-yellow-400 fill-current" 
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-lg font-bold text-gray-900">
                      {formatPrice(relatedProduct.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 