import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../lib/axios';
import { toast } from 'react-hot-toast';

const useAuthStore = create(
	persist(
		(set, get) => ({
			user: null,
			loading: false,
			error: null,
			isAuthenticated: () => get().user !== null,

			// Login function
			login: async (email, password) => {
				try {
					set({ loading: true, error: null });
					const res = await api.post('/api/auth/login', {
						email,
						password,
					});

					// The user object is the response
					set({ user: res.data, loading: false });
					toast.success('Login successful');
				} catch (err) {
					set({
						error: err.response?.data?.message || 'Login failed',
						loading: false,
					});
					toast.error(err.response?.data?.message || 'Login failed');
				}
			},

			// Logout function
			logout: async () => {
				try {
					await api.post('/api/auth/logout'); // Call backend to clear cookie
					set({ user: null });
					toast.success('Logout successful');
				} catch (err) {
					toast.error('Logout failed');
				}
			},

			// Fetch user to verify session
			fetchUser: async () => {
				try {
					const res = await api.get('/api/auth/me');
					set({ user: res.data });
				} catch (err) {
					// This is expected if the user is not logged in
					set({ user: null });
				}
			},
		}),
		{
			name: 'auth-storage', // Key for localStorage
			// Only persist the user object
			partialize: (state) => ({ user: state.user }),
		}
	)
);

// Initialize auth state on app load
useAuthStore.getState().fetchUser();

export default useAuthStore;
