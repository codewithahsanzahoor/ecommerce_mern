import { create } from "zustand";
import api from "../lib/axios";

const useOrderStore = create((set) => ({
    orders: [],
    loading: false,
    error: null,

    // Action to create an order
    createOrder: async (orderData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post("/api/orders", orderData);
            set((state) => ({ orders: [...state.orders, response.data] }));
            return response.data; // Return the new order
        } catch (error) {
            set({
                error:
                    error.response?.data?.message || "Failed to create order",
            });
        } finally {
            set({ loading: false });
        }
    },

    // Action to fetch orders for the logged-in user
    fetchMyOrders: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get("/api/orders/myorders");
            set({ orders: response.data });
        } catch (error) {
            set({
                error:
                    error.response?.data?.message || "Failed to fetch orders",
            });
        } finally {
            set({ loading: false });
        }
    },

    // Action for admins to fetch all orders
    fetchAllOrders: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get("/api/orders/all");
            set({ orders: response.data });
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to fetch all orders",
            });
        } finally {
            set({ loading: false });
        }
    },

    // Action to mark an order as paid
    markAsPaid: async (orderId, paymentResult) => {
        set({ loading: true, error: null });
        try {
            const response = await api.put(
                `/api/orders/${orderId}/pay`,
                paymentResult
            );
            set((state) => ({
                orders: state.orders.map((order) =>
                    order._id === orderId
                        ? {
                              ...order,
                              isPaid: true,
                              paidAt: response.data.paidAt,
                          }
                        : order
                ),
            }));
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to update payment status",
            });
        } finally {
            set({ loading: false });
        }
    },

    // Action for admins to mark an order as delivered
    markAsDelivered: async (orderId) => {
        set({ loading: true, error: null });
        try {
            await api.put(`/api/orders/${orderId}/deliver`);
            set((state) => ({
                orders: state.orders.map((order) =>
                    order._id === orderId
                        ? { ...order, isDelivered: true }
                        : order
                ),
            }));
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to update delivery status",
            });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useOrderStore;
