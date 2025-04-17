import { Link } from 'react-router-dom';
import { PenLine, BookOpen, Palette, ShoppingBag } from 'lucide-react';

export default function HomePage() {
  const categories = [
    { name: 'Bút viết', icon: PenLine, description: 'Bút bi, bút mực, bút chì và các loại bút khác' },
    { name: 'Sổ & Vở', icon: BookOpen, description: 'Sổ tay, vở ghi chép các loại' },
    { name: 'Dụng cụ vẽ', icon: Palette, description: 'Màu vẽ, cọ, giấy vẽ và phụ kiện' },
    { name: 'Văn phòng phẩm', icon: ShoppingBag, description: 'Kẹp giấy, ghim, kéo, băng keo và các dụng cụ văn phòng' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Modern Stationery Store</span>
              <span className="block text-blue-600">Văn phòng phẩm hiện đại</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Khám phá bộ sưu tập văn phòng phẩm đa dạng và hiện đại. Từ bút viết cao cấp đến các dụng cụ học tập sáng tạo.
            </p>
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  to="/products"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 md:py-4 md:px-10 md:text-lg"
                >
                  Xem sản phẩm
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  to="/register"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-blue-600 hover:bg-gray-50 md:py-4 md:px-10 md:text-lg"
                >
                  Đăng ký ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Danh mục sản phẩm</h2>
            <p className="mt-3 text-xl text-gray-500">Khám phá các danh mục sản phẩm đa dạng của chúng tôi</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.name}
                  className="relative rounded-lg border border-gray-300 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                    <p className="mt-2 text-sm text-gray-500">{category.description}</p>
                  </div>
                  <div className="absolute bottom-6 right-6">
                    <Link
                      to={`/products?category=${encodeURIComponent(category.name)}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      Xem thêm →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}