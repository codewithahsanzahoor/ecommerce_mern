import { create } from 'zustand';
import api from '../lib/axios';
const useCartStore = create((set, get) => ({
  items: [],
  loading: false,
  error: null,

  // Derived state - Mimicking backend calculation
  itemsPrice: () =>
    get().items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
  taxPrice: () => {
    const itemsPrice = get().itemsPrice();
    return Number((0.15 * itemsPrice).toFixed(2));
  },
  shippingPrice: () => {
    const itemsPrice = get().itemsPrice();
    return itemsPrice > 100 ? 0 : 10;
  },
  totalPrice: () => {
    const itemsPrice = get().itemsPrice();
    const taxPrice = get().taxPrice();
    const shippingPrice = get().shippingPrice();
    return itemsPrice + taxPrice + shippingPrice;
  },

  // Fetch Cart
  fetchCart: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get('/api/cart');
      set({ items: data.items, loading: false });
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
		      set({ items: [], loading: false });
		    } catch (error) {			set({
				error: error.response?.data?.message || error.message,
				loading: false,
			});
		}
	},
}));

export default useCartStore;
