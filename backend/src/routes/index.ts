import { Router } from 'express';
import authRoutes from './auth.routes';
import mockRoutes from './mock.routes';
import productRoutes from './product.routes';
import categoryRoutes from './category.routes';
import reviewRoutes from './review.routes';
import donhangRoutes from './donhang.routes';
import nhanvienRoutes from './nhanvien.routes';
import khachhangRoutes from './khachhang.routes';
// Import các routes khác ở đây

const router = Router();

// Các route chính
router.use('/auth', authRoutes);
router.use('/mock', mockRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/reviews', reviewRoutes);
router.use('/donhangs', donhangRoutes);
router.use('/nhanviens', nhanvienRoutes);
router.use('/khachhangs', khachhangRoutes);
// Thêm các route khác ở đây
// router.use('/orders', orderRoutes);

export default router; 