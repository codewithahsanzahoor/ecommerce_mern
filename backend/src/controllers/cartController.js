import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

// Add item to cart
export const addToCart = async (req, res) => {
	const { productId, quantity } = req.body;
	const userId = req.user._id;

	try {
		let cart = await Cart.findOne({ user: userId });

		if (!cart) {
			cart = new Cart({ user: userId, items: [] });
		}

		const product = await Product.findById(productId);
		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}

		const itemIndex = cart.items.findIndex((item) =>
			item.product.equals(productId)
		);

		if (itemIndex > -1) {
			// Update quantity
			cart.items[itemIndex].quantity += quantity;
		} else {
			// Add new item
			cart.items.push({ product: productId, quantity });
		}

		await cart.save();
		res.status(200).json(cart);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to add to cart' });
	}
};

// Get cart items
export const getCart = async (req, res) => {
	const userId = req.user._id;

	try {
		const cart = await Cart.findOne({ user: userId }).populate(
			'items.product'
		);
		if (!cart) {
			return res.status(404).json({ message: 'Cart not found' });
		}
		res.status(200).json(cart);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to fetch cart' });
	}
};

// Update quantity
export const updateCartItem = async (req, res) => {
	const { productId, quantity } = req.body;
	const userId = req.user._id;

	try {
		const cart = await Cart.findOne({ user: userId });

		if (!cart) {
			return res.status(404).json({ message: 'Cart not found' });
		}

		const itemIndex = cart.items.findIndex((item) =>
			item.product.equals(productId)
		);

		if (itemIndex === -1) {
			return res.status(404).json({ message: 'Product not in cart' });
		}

		if (quantity <= 0) {
			cart.items.splice(itemIndex, 1); // remove item
		} else {
			cart.items[itemIndex].quantity = quantity;
		}

		await cart.save();
		res.status(200).json(cart);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to update cart item' });
	}
};

// Remove item
export const removeCartItem = async (req, res) => {
	const { productId } = req.body;
	const userId = req.user._id;

	try {
		const cart = await Cart.findOne({ user: userId });

		if (!cart) {
			return res.status(404).json({ message: 'Cart not found' });
		}

		cart.items = cart.items.filter(
			(item) => !item.product.equals(productId)
		);

		await cart.save();
		res.status(200).json(cart);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to remove item from cart' });
	}
};

// Clear cart
export const clearCart = async (req, res) => {
	const userId = req.user._id;

	try {
		const cart = await Cart.findOne({ user: userId });

		if (!cart) {
			return res.status(404).json({ message: 'Cart not found' });
		}

		cart.items = [];
		await cart.save();
		res.status(200).json({ message: 'Cart cleared' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to clear cart' });
	}
};
