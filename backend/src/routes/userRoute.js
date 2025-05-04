import express from 'express';
import {
	getAllUsers,
	deleteUser,
	updateUserRole,
} from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Only admin can access these routes
router.get('/', protect, admin, getAllUsers);
router.delete('/:id', protect, admin, deleteUser);
router.put('/:id/role', protect, admin, updateUserRole);

export default router;
