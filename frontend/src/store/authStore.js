import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../lib/axios';
import { toast } from 'react-hot-toast';

// Utility to update axios Authorization header
const setAuthorizationHeader = (token) => {
	if (token) {
		api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete api.defaults.headers.common['Authorization'];
	}
};

const useAuthStore = create(
	persist(
		(set, get) => ({
			user: null,
			token: null,
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

					const { user, token } = res.data;
					set({ user, token, loading: false });

					setAuthorizationHeader(token); // <--- set here

					toast.success('Login successful');
				} catch (err) {
					set({
						error: err.response?.data?.message || 'Login failed',
						loading: false,
					});
					toast.error('Login failed');
				}
			},

			// Logout function
			logout: () => {
				set({ user: null, token: null });
				setAuthorizationHeader(null); // <--- remove token
				toast.success('Logout successful');
			},

			// Fetch user if token exists
			fetchUser: async () => {
				try {
					const { token } = get();
					if (token) {
						setAuthorizationHeader(token); // <--- set if exists
					}
					const res = await api.get('/api/auth/me');
					set({ user: res.data });
				} catch (err) {
					console.error('Failed to fetch user', err);
				}
			},
		}),
		{
			name: 'auth-storage', // Key for localStorage
		}
	)
);

export default useAuthStore;
