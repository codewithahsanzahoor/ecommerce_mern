import { create } from 'zustand';
import api from '../lib/axios';

const useStatsStore = create((set) => ({
    stats: null,
    loading: false,
    error: null,

    fetchStats: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/api/stats');
            set({ stats: response.data, loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to fetch stats',
                loading: false,
            });
        }
    },
}));

export default useStatsStore;
