import { create } from "zustand";
import { authAPI } from "@/services/authService";
import type { User } from "@/types/authTypes";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  checkAuth: async () => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const response = await authAPI.getCurrentUser();
        set({ user: response.user, isAuthenticated: true, isLoading: false });
      } catch (error) {
        localStorage.removeItem("token");
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      set({ isLoading: false });
    }
  },

  login: async (email: string, password: string) => {
    const response = await authAPI.login(email, password);
    localStorage.setItem("token", response.token);
    set({ user: response.user, isAuthenticated: true });
    return response.user;
  },

  register: async (name: string, email: string, password: string) => {
    const response = await authAPI.register(name, email, password);
    localStorage.setItem("token", response.token);
    set({ user: response.user, isAuthenticated: true });
  },

  logout: async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      set({ user: null, isAuthenticated: false });
    }
  },
}));
