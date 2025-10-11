import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Protect routes
export const protect = async (req, res, next) => {
	let token;

	if (req.cookies.token) {
		try {
			token = req.cookies.token;

			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.id).select('-password'); // Attach user info to request

			next();
		} catch (error) {
			console.error(error);
			res.status(401).json({
				message: 'Not authorized, token failed',
				success: false,
			});
		}
	}

	if (!token) {
		res.status(401).json({
			message: 'Not authorized, no token',
			success: false,
		});
	}
};

// Admin middleware
export const admin = (req, res, next) => {
	if (req.user && req.user.role === 'admin') {
		next();
	} else {
		res.status(403).json({
			message: 'Not authorized as an admin',
			success: false,
		});
	}
};
