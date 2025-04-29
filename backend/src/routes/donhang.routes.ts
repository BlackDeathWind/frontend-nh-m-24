import express from 'express';
import donhangController from '../controllers/donhang.controller';
import { protect } from '../middlewares/auth';

const router = express.Router();

// GET /api/donhangs - Lấy danh sách đơn hàng
router.get('/', protect, donhangController.getDonHangs);

// GET /api/donhangs/:id - Lấy thông tin chi tiết đơn hàng
router.get('/:id', protect, donhangController.getDonHangById);

// POST /api/donhangs - Tạo đơn hàng mới
router.post('/', protect, donhangController.createDonHang);

// PUT /api/donhangs/:id - Cập nhật trạng thái đơn hàng
router.put('/:id', protect, donhangController.updateDonHang);

// POST /api/donhangs/:id/cancel - Hủy đơn hàng
router.post('/:id/cancel', protect, donhangController.cancelDonHang);

export default router; 