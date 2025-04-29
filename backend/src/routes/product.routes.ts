import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import { protect, requireAdmin } from '../middlewares/auth';

const router = Router();

/**
 * @route GET /api/products
 * @desc Lấy danh sách sản phẩm
 * @access Public
 */
router.get('/', ProductController.getProducts);

/**
 * @route GET /api/products/:id
 * @desc Lấy thông tin chi tiết sản phẩm
 * @access Public
 */
router.get('/:id', ProductController.getProductById);

/**
 * @route POST /api/products
 * @desc Tạo sản phẩm mới
 * @access Private (Admin only)
 */
router.post('/', protect, requireAdmin, ProductController.createProduct);

/**
 * @route PUT /api/products/:id
 * @desc Cập nhật sản phẩm
 * @access Private (Admin only)
 */
router.put('/:id', protect, requireAdmin, ProductController.updateProduct);

/**
 * @route DELETE /api/products/:id
 * @desc Xóa sản phẩm
 * @access Private (Admin only)
 */
router.delete('/:id', protect, requireAdmin, ProductController.deleteProduct);

export default router; 