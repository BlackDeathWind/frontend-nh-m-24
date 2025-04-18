import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Search, Edit, Trash2, Plus, ExternalLink, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'draft' | 'outOfStock';
  createdAt: string;
}

// Dữ liệu mẫu cho danh sách sản phẩm
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Bút bi cao cấp',
    category: 'Bút viết',
    price: 30000,
    stock: 50,
    status: 'active',
    createdAt: '2023-09-15',
  },
  {
    id: '2',
    name: 'Sổ tay ghi chép',
    category: 'Sổ & Vở',
    price: 20000,
    stock: 100,
    status: 'active',
    createdAt: '2023-09-12',
  },
  {
    id: '3',
    name: 'Bút chì 2B',
    category: 'Bút viết',
    price: 5000,
    stock: 200,
    status: 'active',
    createdAt: '2023-09-10',
  },
  {
    id: '4',
    name: 'Kẹp giấy (hộp 100 cái)',
    category: 'Văn phòng phẩm',
    price: 10000,
    stock: 30,
    status: 'active',
    createdAt: '2023-09-05',
  },
  {
    id: '5',
    name: 'Bộ màu vẽ 24 màu',
    category: 'Dụng cụ vẽ',
    price: 45000,
    stock: 0,
    status: 'outOfStock',
    createdAt: '2023-08-28',
  },
  {
    id: '6',
    name: 'Giấy note (5 màu)',
    category: 'Văn phòng phẩm',
    price: 15000,
    stock: 80,
    status: 'active',
    createdAt: '2023-08-20',
  },
  {
    id: '7',
    name: 'Bút highlight (bộ 5 cái)',
    category: 'Bút viết',
    price: 40000,
    stock: 25,
    status: 'active',
    createdAt: '2023-08-15',
  },
  {
    id: '8',
    name: 'Thước kẻ 30cm',
    category: 'Văn phòng phẩm',
    price: 7000,
    stock: 120,
    status: 'active',
    createdAt: '2023-08-10',
  },
  {
    id: '9',
    name: 'Máy tính cầm tay',
    category: 'Văn phòng phẩm',
    price: 120000,
    stock: 15,
    status: 'active',
    createdAt: '2023-08-05',
  },
  {
    id: '10',
    name: 'Băng keo trong suốt',
    category: 'Văn phòng phẩm',
    price: 12000,
    stock: 60,
    status: 'active',
    createdAt: '2023-07-30',
  },
];

export default function ProductsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Lọc sản phẩm dựa trên các bộ lọc
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === '' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sắp xếp sản phẩm
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'stock-asc') return a.stock - b.stock;
    if (sortBy === 'stock-desc') return b.stock - a.stock;
    if (sortBy === 'date-asc') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === 'date-desc') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return 0;
  });

  // Phân trang
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Danh sách các danh mục độc đáo từ sản phẩm
  const categories = [...new Set(mockProducts.map(product => product.category))];

  const formatCurrency = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Xử lý xóa sản phẩm (giả lập)
  const handleDeleteProduct = (productId: string) => {
    // Thực tế sẽ gọi API để xóa sản phẩm
    console.log(`Xóa sản phẩm có ID: ${productId}`);
    // Sau đó cập nhật lại danh sách sản phẩm
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h1>
        <Link 
          to="/admin/products/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Thêm sản phẩm mới
        </Link>
      </div>

      {/* Search and filter bar */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 flex-wrap md:flex-nowrap">
            <select
              className="block border border-gray-300 rounded-md px-3 py-2 text-sm w-full md:w-auto"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              className="block border border-gray-300 rounded-md px-3 py-2 text-sm w-full md:w-auto"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="active">Đang bán</option>
              <option value="draft">Nháp</option>
              <option value="outOfStock">Hết hàng</option>
            </select>
            
            <select
              className="block border border-gray-300 rounded-md px-3 py-2 text-sm w-full md:w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sắp xếp</option>
              <option value="name-asc">Tên (A-Z)</option>
              <option value="name-desc">Tên (Z-A)</option>
              <option value="price-asc">Giá (Thấp-Cao)</option>
              <option value="price-desc">Giá (Cao-Thấp)</option>
              <option value="stock-asc">Tồn kho (Thấp-Cao)</option>
              <option value="stock-desc">Tồn kho (Cao-Thấp)</option>
              <option value="date-desc">Ngày tạo (Mới nhất)</option>
              <option value="date-asc">Ngày tạo (Cũ nhất)</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Danh mục
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tồn kho
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatCurrency(product.price)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={cn(
                      "text-sm",
                      product.stock === 0 ? "text-red-600" : 
                      product.stock < 10 ? "text-yellow-600" : "text-gray-900"
                    )}>
                      {product.stock === 0 ? (
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Hết hàng
                        </div>
                      ) : product.stock < 10 ? (
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {product.stock} cái
                        </div>
                      ) : (
                        `${product.stock} cái`
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      product.status === 'active' && "bg-green-100 text-green-800",
                      product.status === 'draft' && "bg-gray-100 text-gray-800",
                      product.status === 'outOfStock' && "bg-red-100 text-red-800",
                    )}>
                      {product.status === 'active' && 'Đang bán'}
                      {product.status === 'draft' && 'Nháp'}
                      {product.status === 'outOfStock' && 'Hết hàng'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        to={`/admin/products/${product.id}`}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </Link>
                      <Link
                        to={`/admin/products/${product.id}/edit`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">
              Hiển thị {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedProducts.length)} trong số {sortedProducts.length} sản phẩm
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={cn(
                  "px-3 py-1 rounded-md text-sm",
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                )}
              >
                Trước
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "px-3 py-1 rounded-md text-sm",
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                  )}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={cn(
                  "px-3 py-1 rounded-md text-sm",
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                )}
              >
                Tiếp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 