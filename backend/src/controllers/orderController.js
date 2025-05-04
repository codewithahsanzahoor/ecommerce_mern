import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req, res) => {
	try {
		const {
			orderItems,
			shippingAddress,
			paymentMethod,
			taxPrice,
			shippingPrice,
			totalPrice,
		} = req.body;

		if (orderItems && orderItems.length === 0) {
			res.status(400).json({ message: 'No order items', success: false });
			return;
		}

		const order = new Order({
			user: req.user._id,
			orderItems,
			shippingAddress,
			paymentMethod,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder, { success: true });
	} catch (error) {
		res.status(500).json({
			message: `could not create order ${error.message}`,
			success: false,
		});
	}
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
	try {
		const orders = await Order.find({ user: req.user._id });
		res.json(orders, { success: true });
	} catch (error) {
		res.status(500).json({ message: `${error.message}`, success: false });
	}
};

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
	try {
		const orders = await Order.find({}).populate('user', 'id name email');
		res.json(orders, { success: true });
	} catch (error) {
		res.status(500).json({ message: `${error.message}`, success: false });
	}
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);

		if (order) {
			order.isPaid = true;
			order.paidAt = Date.now();
			order.paymentResult = {
				id: req.body.id,
				status: req.body.status,
				update_time: req.body.update_time,
				email_address: req.body.email_address,
			};

			const updatedOrder = await order.save();
			res.json(updatedOrder, { success: true });
		} else {
			res.status(404).json({
				message: 'Order not found',
				success: false,
			});
		}
	} catch (error) {
		res.status(500).json({ message: `${error.message}`, success: false });
	}
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);

		if (order) {
			order.isDelivered = true;
			order.deliveredAt = Date.now();

			const updatedOrder = await order.save();
			res.json(updatedOrder, { success: true });
		} else {
			res.status(404).json({
				message: 'Order not found',
				success: false,
			});
		}
	} catch (error) {
		res.status(500).json({ message: `${error.message}`, success: false });
	}
};
