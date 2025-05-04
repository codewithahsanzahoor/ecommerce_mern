import express from 'express';
import { register, login } from '../controllers/authController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);

// for testing purpose
router.get('/profile', protect, admin, (req, res) => {
	res.json({ user: req.user });
});

export default router;
