import { create } from 'zustand';
import api from '../lib/axios'; // your axios with baseURL
import { toast } from 'react-hot-toast';

const useProductStore = create((set) => ({
	products: [],
	product: {},
	loading: false,
	error: null,

	// Fetch all products
	fetchProducts: async () => {
		try {
			set({ loading: true });
			const res = await api.get('/api/products');
			set({ products: res.data.products, loading: false });
		} catch (err) {
			set({
				error: err.response?.data?.message || 'Failed to load products',
				loading: false,
			});
			console.error(err);
			toast.error('Failed to fetch products');
		}
	},

	// Fetch a single product
	fetchProduct: async (productId) => {
		try {
			set({ loading: true });
			const res = await api.get(`/api/products/${productId}`);
			set({ product: res.data.product, loading: false });
		} catch (err) {
			set({
				error:
					err.response?.data?.message ||
					'Failed to load product details',
				loading: false,
			});
			toast.error(
				err.response?.data?.message || 'Failed to fetch product'
			);
			console.error(err);
		}
	},

	// Create a new product
	createProduct: async (productData) => {
		try {
			const res = await api.post('/api/products', productData);
			set((state) => ({ products: [res.data, ...state.products] }));
			toast.success('Product created successfully');
		} catch (err) {
			toast.error(
				err.response?.data?.message || 'Failed to create product'
			);
		}
	},

	// Update a product
	updateProduct: async (productId, updatedData) => {
		try {
			const res = await api.put(
				`/api/products/${productId}`,
				updatedData
			);
			set((state) => ({
				products: state.products.map((product) =>
					product._id === productId ? res.data : product
				),
			}));
			toast.success('Product updated successfully');
		} catch (err) {
			toast.error(
				err.response?.data?.message || 'Failed to update product'
			);
		}
	},

	// Delete a product
	deleteProduct: async (productId) => {
		try {
			await api.delete(`/api/products/${productId}`);
			set((state) => ({
				products: state.products.filter(
					(product) => product._id !== productId
				),
			}));
			toast.success('Product deleted successfully');
		} catch (err) {
			toast.error(
				err.response?.data?.message || 'Failed to delete product'
			);
		}
	},

	// Create a product review
	createReview: async (productId, reviewData) => {
		try {
			const res = await api.post(`/api/products/${productId}/reviews`, reviewData);
			set((state) => ({
				product: res.data, // The backend should return the updated product with the new review
				products: state.products.map((p) => p._id === productId ? res.data : p)
			}));
			toast.success('Review submitted successfully');
		} catch (err) {
			toast.error(
				err.response?.data?.message || 'Failed to submit review'
			);
		}
	},
}));

export default useProductStore;
