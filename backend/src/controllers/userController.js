import User from '../models/userModel.js';

// @desc    Get all users
// @route   GET /api/users
// @access  Admin only
export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({}).select('-password'); // Don't send password
		res.json(users);
	} catch (error) {
		res.status(500).json({
			message: `getAllUsers error ${error.message} `,
			success: 'false',
		});
	}
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Admin only
export const deleteUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (user) {
			await User.findByIdAndDelete(req.params.id);
			res.json({ message: 'User removed', success: true });
		} else {
			res.status(404).json({ message: 'User not found', success: false });
		}
	} catch (error) {
		res.status(500).json({ message: `${error.message}`, success: false });
	}
};

// @desc    Update user role
// @route   PUT /api/users/:id/role
// @access  Admin only
export const updateUserRole = async (req, res) => {
	if (!req.body.role || !['user', 'admin'].includes(req.body.role)) {
		return res
			.status(400)
			.json({ message: 'Invalid role', success: false });
	}
	try {
		const user = await User.findById(req.params.id);

		if (user) {
			user.role = req.body.role || user.role;
			const updatedUser = await user.save();
			res.json({
				id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				role: updatedUser.role,
			});
		} else {
			res.status(404).json({ message: 'User not found', success: false });
		}
	} catch (error) {
		res.status(500).json({ message: `${error.message}`, success: false });
	}
};
