import express from 'express';
import {
	getAllProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	createProductReview,
	getProductById,
} from '../controllers/productController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);
// review
router.post('/:id/reviews', protect, createProductReview);

export default router;
