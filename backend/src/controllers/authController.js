import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc    Register new user
export const register = async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res
			.status(400)
			.json({
				message: 'Please provide all required fields',
				success: false,
			});
	}

	const validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	if (!validEmail.test(email)) {
		return res
			.status(400)
			.json({ message: 'Invalid email address', success: false });
	}

	if (password.length < 6) {
		return res
			.status(400)
			.json({
				message: 'Password must be at least 6 characters',
				success: false,
			});
	}
	try {
		const userExists = await User.findOne({ email });
		if (userExists)
			return res
				.status(400)
				.json({ message: 'User already exists', success: false });

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		res.status(201).json({
			message: 'User registered successfully',
			success: true,
		});
	} catch (error) {
		res.status(500).json({ message: error.message, success: false });
	}
};

// @desc    Login user
export const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({
				message: 'Please provide all required fields',
				success: false,
			});
	}

	const validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	if (!validEmail.test(email)) {
		return res
			.status(400)
			.json({ message: 'Invalid email address', success: false });
	}

	if (password.length < 6) {
		return res
			.status(400)
			.json({
				message: 'Password must be at least 6 characters',
				success: false,
			});
	}
	try {
		const user = await User.findOne({ email });
		if (!user)
			return res
				.status(400)
				.json({ message: 'Invalid credentials', success: false });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res
				.status(400)
				.json({ message: 'Invalid credentials', success: false });

		const token = jwt.sign(
			{ id: user._id, role: user.role },
			process.env.JWT_SECRET,
			{
				expiresIn: '1d',
			}
		);

		res
			.cookie('token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 24 * 60 * 60 * 1000, // 1 day
			})
			.json({
				user: {
					id: user._id,
					name: user.name,
					email: user.email,
					role: user.role,
				},
			});
	} catch (error) {
		res.status(500).json({ message: error.message, success: false });
	}
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};