import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
		comment: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a product name'],
		},
		description: {
			type: String,
			required: [true, 'Please add a description'],
		},
		price: {
			type: Number,
			required: [true, 'Please add a price'],
			default: 0,
		},
		stock: {
			type: Number,
			required: [true, 'Please add stock quantity'],
			default: 0,
		},
		image: {
			type: String,
			default: '',
		},
		reviews: [reviewSchema], // 📢 Add reviews array
		rating: {
			type: Number,
			default: 0, // ⭐ Average rating
		},
		numReviews: {
			type: Number,
			default: 0, // 👥 Total reviews
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model('Product', productSchema);

export default Product;
