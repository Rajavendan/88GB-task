import { create } from 'zustand';
import api from '../api/axiosConfig';

interface User {
  email: string;
  name: string;
  picture: string;
  age?: number;
  monthlyIncome?: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (googleToken: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: true,

  login: async (googleToken: string) => {
    try {
      const response = await api.post('/auth/google', { token: googleToken });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ user, token, isAuthenticated: true });
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  fetchUser: async () => {
    try {
      set({ isLoading: true });
      const response = await api.get('/users/me');
      set({ user: response.data, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (data: Partial<User>) => {
    try {
      const response = await api.put('/users/profile', data);
      set({ user: response.data });
    } catch (error) {
      console.error('Failed to update profile', error);
      throw error;
    }
  },
}));
