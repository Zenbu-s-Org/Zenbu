import { create } from "zustand";
import { authAPI } from "@/services/authService";
import type { User } from "@/types/authTypes";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  checkAuth: async () => {
    try {
      const response = await authAPI.getCurrentUser(); // cookie verifierar
      set({ user: response.user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  login: async (email: string, password: string) => {
    const response = await authAPI.login(email, password);
    set({ user: response.user, isAuthenticated: true });
  },

  register: async (name: string, email: string, password: string) => {
    const response = await authAPI.register(name, email, password);
    set({ user: response.user, isAuthenticated: true });
  },

  logout: async () => {
    try {
      await authAPI.logout();
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
