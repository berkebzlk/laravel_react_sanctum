import { create } from 'zustand';
import Cookies from 'js-cookie';

export const useAuthStore = create((set) => ({
  token: Cookies.get('token') || null, 
  user: null,

  login: (token, user) => {
    Cookies.set('token', token, { expires: 7 });

    set({ token, user })
  },

  logout: () => {
    Cookies.remove('token');

    set({ token: null, user: null })},
}));