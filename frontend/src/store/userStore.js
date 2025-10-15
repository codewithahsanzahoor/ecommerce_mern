import { create } from 'zustand';
import api from '../lib/axios';

const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  // Action for admins to fetch all users
  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/users');
      set({ users: response.data });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch users' });
    } finally {
      set({ loading: false });
    }
  },

  // Action for admins to delete a user
  deleteUser: async (userId) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/users/${userId}`);
      set((state) => ({ users: state.users.filter((user) => user._id !== userId) }));
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to delete user' });
    } finally {
      set({ loading: false });
    }
  },

  // Action for admins to update a user's role
  updateUserRole: async (userId, role) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put(`/users/${userId}/role`, { role });
      set((state) => ({
        users: state.users.map((user) => (user._id === userId ? response.data : user)),
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to update user role' });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useUserStore;
