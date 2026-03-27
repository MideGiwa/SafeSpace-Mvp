import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../services/authService';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAnonymousMode: boolean;
  
  // Actions
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  toggleAnonymousMode: (status: boolean) => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      isAnonymousMode: false,

      login: (user, accessToken, refreshToken) => 
        set({ isAuthenticated: true, user, accessToken, refreshToken }),
        
      logout: () => 
        set({ isAuthenticated: false, user: null, accessToken: null, refreshToken: null, isAnonymousMode: false }),
        
      setTokens: (accessToken, refreshToken) => 
        set({ accessToken, refreshToken }),
        
      toggleAnonymousMode: (status) => 
        set({ isAnonymousMode: status }),
        
      updateUser: (updates) => 
        set((state) => ({ user: state.user ? { ...state.user, ...updates } : null })),
    }),
    {
      name: 'safespace-auth-storage',
    }
  )
);
