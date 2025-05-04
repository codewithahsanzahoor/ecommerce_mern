import Product from '../models/productModel.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public / Admin
export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.json({ products, success: true });
	} catch (error) {
		res.status(500).json({ message: `${error.message}`, success: false });
	}
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public / Admin
export const getProductById = async (req, res) => {
	if (!req.params.id) {
		return res
			.status(400)
			.json({ message: 'Product ID is required', success: false });
	}

	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			res.json({ product, success: true });
		} else {
			res.status(404).json({
				message: 'Product not found',
				success: false,
			});
		}
	} catch (error) {
		res.status(500).json({ message: `${error.message}`, success: false });
	}
};

// @desc    Create new product
// @route   POST /api/products
// @access  Admin only
export const createProduct = async (req, res) => {
	try {
		const { name, description, price, stock } = req.body;

		if (!name || !description || !price || !stock) {
			return res
				.status(400)
				.json({ message: 'Please fill in all fields', success: false });
		}

		const product = new Product({
			name,
			description,
			price,
			stock,
		});

		const createdProduct = await product.save();
		res.status(201).json(createdProduct, { success: true });
	} catch (error) {
		res.status(500).json({ message: `${error.message}`, success: false });
	}
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Admin only
export const updateProduct = async (req, res) => {
	try {
		const { name, description, price, stock } = req.body;
		const product = await Product.findById(req.params.id);

		if (product) {
			product.name = name || product.name;
			product.description = description || product.description;
			product.price = price || product.price;
			product.stock = stock || product.stock;

			const updatedProduct = await product.save();
			res.json(updatedProduct);
		} else {
			res.status(404).json({
				message: 'Product not found',
				success: false,
			});
		}
	} catch (error) {
		res.status(500).json({ message: `${error.message}`, success: false });
	}
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Admin only
export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (product) {
			await product.remove();
			res.json({ message: 'Product removed', success: true });
		} else {
			res.status(404).json({
				message: 'Product not found',
				success: false,
			});
		}
	} catch (error) {
		res.status(500).json({ message: `${error.message}`, success: false });
	}
};

// @desc    Create a new product review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = async (req, res) => {
	try {
		const { rating, comment } = req.body;

		if (!rating || !comment) {
			return res
				.status(400)
				.json({
					message: 'Rating and comment are required',
					success: false,
				});
		}

		if (rating < 1 || rating > 5) {
			return res
				.status(400)
				.json({
					message: 'Rating must be between 1 and 5',
					success: false,
				});
		}
		const product = await Product.findById(req.params.id);

		if (product) {
			const alreadyReviewed = product.reviews.find(
				(r) => r.user.toString() === req.user._id.toString()
			);

			if (alreadyReviewed) {
				return res
					.status(400)
					.json({
						message: 'Product already reviewed',
						success: false,
					});
			}

			const review = {
				name: req.user.name,
				rating: Number(rating),
				comment,
				user: req.user._id,
			};

			product.reviews.push(review);

			product.numReviews = product.reviews.length;
			product.rating =
				product.reviews.reduce((acc, item) => item.rating + acc, 0) /
				product.reviews.length;

			await product.save();
			res.status(201).json({ message: 'Review added', success: true });
		} else {
			res.status(404).json({
				message: 'Product not found',
				success: false,
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: `create product review ${error.message}`,
			success: false,
		});
	}
};
