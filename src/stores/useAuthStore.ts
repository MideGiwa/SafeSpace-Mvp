import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../services/authService';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAnonymousMode: boolean;
  dmOptIn: boolean;
  
  // Actions
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  toggleAnonymousMode: (status: boolean) => void;
  toggleDmOptIn: (status: boolean) => void;
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
      dmOptIn: true,

      login: (user, accessToken, refreshToken) => 
        set({ isAuthenticated: true, user, accessToken, refreshToken, dmOptIn: user.dmOptIn ?? true }),
        
      logout: () => 
        set({ isAuthenticated: false, user: null, accessToken: null, refreshToken: null, isAnonymousMode: false, dmOptIn: true }),
        
      setTokens: (accessToken, refreshToken) => 
        set({ accessToken, refreshToken }),
        
      toggleAnonymousMode: (status) => 
        set({ isAnonymousMode: status }),
        
      toggleDmOptIn: (status) => 
        set({ dmOptIn: status }),
        
      updateUser: (updates) => 
        set((state) => ({ 
          user: state.user ? { ...state.user, ...updates } : null,
          dmOptIn: updates.dmOptIn !== undefined ? updates.dmOptIn : state.dmOptIn
        })),
    }),
    {
      name: 'safespace-auth-storage',
    }
  )
);
