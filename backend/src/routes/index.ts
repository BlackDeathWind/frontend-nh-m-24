import { Router } from 'express';
import authRoutes from './auth.routes';
// Import các routes khác ở đây

const router = Router();

// Các route chính
router.use('/auth', authRoutes);
// Thêm các route khác ở đây
// router.use('/products', productRoutes);
// router.use('/orders', orderRoutes);

export default router; 