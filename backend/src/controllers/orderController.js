import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import Cart from '../models/cartModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req, res) => {
	try {
		const { shippingAddress, paymentMethod } = req.body;

		// Find the user's cart from the database
		const cart = await Cart.findOne({ user: req.user._id });

		if (!cart || cart.items.length === 0) {
			return res
				.status(400)
				.json({ message: 'No items in cart to order', success: false });
		}

		const orderItems = cart.items;

		// Get the product details for each order item from the database
		const productIds = orderItems.map((item) => item.product);
		const products = await Product.find({ _id: { $in: productIds } });

		const productMap = new Map(products.map((p) => [p._id.toString(), p]));

		// Create the final order items with authoritative data
		const finalOrderItems = orderItems.map((item) => {
			const product = productMap.get(item.product.toString());
			if (!product) {
				throw new Error(`Product not found: ${item.product}`);
			}
			return {
				name: product.name,
				quantity: item.quantity,
				image: product.image,
				price: product.price, // Use the price from the database
				product: product._id,
			};
		});

		// Recalculate prices on the backend
		const itemsPrice = finalOrderItems.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		);
		const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
		const shippingPrice = itemsPrice > 100 ? 0 : 10;
		const totalPrice = itemsPrice + taxPrice + shippingPrice;

		// Create the new order with verified data
		const order = new Order({
			user: req.user._id,
			orderItems: finalOrderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const createdOrder = await order.save();

		// Clear the user's cart
		await Cart.deleteOne({ _id: cart._id });

		res.status(201).json({ data: createdOrder, success: true });
	} catch (error) {
		res.status(500).json({
			message: `Could not create order: ${error.message}`,
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
