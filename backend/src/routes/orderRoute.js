import express from 'express';
import {
	addOrderItems,
	getMyOrders,
	getOrders,
	updateOrderToDelivered,
	updateOrderToPaid,
} from '../controllers/orderController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST /api/orders
router.post('/', protect, addOrderItems);
// GET /api/orders/myorders
router.get('/myorders', protect, getMyOrders);

// ! Admin routes
// GET /api/orders
router.get('/', protect, admin, getOrders);
// PUT /api/orders/:id/pay
router.put('/:id/pay', protect, updateOrderToPaid);
// PUT /api/orders/:id/deliver
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

export default router;
