import { create } from 'zustand';
import api from '../lib/axios';
const useCartStore = create((set) => ({
	cart: [],
	loading: false,
	error: null,

	// Fetch Cart
	fetchCart: async () => {
		set({ loading: true });
		try {
			const { data } = await api.get('/api/cart');
			console.log(data.items);
			set({ cart: data.items, loading: false });
		} catch (error) {
			set({
				error: error.response?.data?.message || error.message,
				loading: false,
			});
		}
	},

	// Add Item
	addToCart: async (productId, quantity) => {
		set({ loading: true });
		try {
			await api.post('/api/cart/add', { productId, quantity });
			await useCartStore.getState().fetchCart(); // Refresh cart
		} catch (error) {
			set({
				error: error.response?.data?.message || error.message,
				loading: false,
			});
		}
	},

	// Update Quantity
	updateCartItem: async (productId, quantity) => {
		set({ loading: true });
		try {
			await api.put('/api/cart/update', { productId, quantity });
			await useCartStore.getState().fetchCart();
		} catch (error) {
			set({
				error: error.response?.data?.message || error.message,
				loading: false,
			});
		}
	},

	// Remove Item
	removeCartItem: async (productId) => {
		set({ loading: true });
		try {
			await api.delete('/api/cart/remove', {
				productId,
			});
			await useCartStore.getState().fetchCart();
		} catch (error) {
			set({
				error: error.response?.data?.message || error.message,
				loading: false,
			});
		}
	},

	// Clear Cart
	clearCart: async () => {
		set({ loading: true });
		try {
			await api.delete('/api/cart/clear');
			set({ cart: [], loading: false });
		} catch (error) {
			set({
				error: error.response?.data?.message || error.message,
				loading: false,
			});
		}
	},
}));

export default useCartStore;
