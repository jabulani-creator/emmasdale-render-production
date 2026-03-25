import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
import { User as BaseUser } from '../types';

interface User extends BaseUser {
  role?: string;
  position?: string;
}

interface AuthState {
  user: User | null;
  userPosition: string;
  isLoading: boolean;
  userLoading: boolean;

  // Actions
  registerUser: (currentUser: any) => Promise<void>;
  loginUser: (currentUser: any) => Promise<void>;
  logoutUser: () => Promise<void>;
  updateUser: (currentUser: any) => Promise<void>;
  getCurrentUser: () => Promise<void>;
  addLeader: (leaderData: any) => Promise<{success: boolean; error?: string}>;
}

export const authFetch = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const useAuthStore = create<AuthState>((set, get) => {
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Only trigger logout if we get a 401 AND we are in the dashboard
      if (error.response?.status === 401 && typeof window !== 'undefined' && window.location.pathname.startsWith("/dashboard")) {
        get().logoutUser();
      }
      return Promise.reject(error);
    }
  );

  return {
    user: null,
    userPosition: '',
    isLoading: false,
    userLoading: true,

    registerUser: async (currentUser) => {
      set({ isLoading: true });
      try {
        const response = await axios.post("http://localhost:5000/api/v1/auth/register", currentUser);
        const { user, position } = response.data;
        set({ user, userPosition: position, isLoading: false });
        toast.success("Account created successfully!");
      } catch (error: any) {
        set({ isLoading: false });
        toast.error(error?.response?.data?.msg || "Registration failed. Please try again.");
      }
    },

    loginUser: async (currentUser) => {
      set({ isLoading: true });
      try {
        const { data } = await axios.post("http://localhost:5000/api/v1/auth/login", currentUser);
        const { user, position } = data;
        set({ user, userPosition: position, isLoading: false });
        toast.success("Login successful! Redirecting to dashboard...");
      } catch (error: any) {
        set({ isLoading: false });
        toast.error(error?.response?.data?.msg || "Login failed. Please check your credentials.");
      }
    },

    logoutUser: async (silent = false) => {
      try {
        await authFetch.get("/auth/logout");
      } catch (error) {
        console.error(error);
      }
      set({ user: null, userPosition: '' });
      
      if (!silent) {
        toast.success("Logged out successfully.");
      }
      
      // Only hard redirect if we are inside the dashboard
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/dashboard')) {
        window.location.href = "/register"; 
      }
    },

    updateUser: async (currentUser) => {
      set({ isLoading: true });
      try {
        const { data } = await authFetch.patch("/auth/updateUser", currentUser);
        const { user, position } = data;
        set({ user, userPosition: position, isLoading: false });
        toast.success("User updated successfully!");
      } catch (error: any) {
        set({ isLoading: false });
        if (error.response?.status !== 401) {
          toast.error(error?.response?.data?.msg || "Update failed");
        }
      }
    },

    addLeader: async (leaderData) => {
      set({ isLoading: true });
      try {
        await authFetch.post("/auth/add-leader", leaderData);
        set({ isLoading: false });
        toast.success("Leader account created successfully!");
        return { success: true };
      } catch (error: any) {
        set({ isLoading: false });
        const errorMsg = error?.response?.data?.msg || "Failed to create leader account";
        toast.error(errorMsg);
        return { success: false, error: errorMsg };
      }
    },

    getCurrentUser: async () => {
      set({ userLoading: true });
      try {
        const { data } = await authFetch("/auth/getCurrentUser");
        const { user, position } = data;
        set({ user, userPosition: position, userLoading: false });
      } catch (error: any) {
        if (error?.response?.status !== 401 && typeof window !== 'undefined' && window.location.pathname.startsWith("/dashboard")) {
          get().logoutUser();
        } else {
           // If we get a 401 on a public page, just silently clear the user state
           set({ user: null, userPosition: '', userLoading: false });
        }
      }
    },
  };
});
