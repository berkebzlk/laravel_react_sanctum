import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get('/api/user');
      set({ user: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  clearUser: () => set({ user: null }),
}));

export default useUserStore;
