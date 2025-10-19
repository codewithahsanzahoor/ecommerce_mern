import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

// @desc    Get dashboard stats
// @route   GET /api/stats
// @access  Private/Admin
export const getStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({});
    const products = await Product.find({});
    const productsInStock = products.reduce(
      (acc, product) => acc + product.stock,
      0
    );
    const usersSignedUp = await User.countDocuments({});

    res.json({
      totalOrders,
      productsInStock,
      usersSignedUp,
    });
  } catch (error) {
    res.status(500).json({ message: `${error.message}`, success: false });
  }
};
