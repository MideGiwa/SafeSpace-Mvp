import { create } from 'zustand';

type UserRole = 'seeker' | 'leader' | 'professional' | null;

interface AuthState {
  isAuthenticated: boolean;
  userRole: UserRole;
  isAnonymousMode: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  toggleAnonymousMode: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userRole: null,
  isAnonymousMode: false,
  login: (role) => set({ isAuthenticated: true, userRole: role }),
  logout: () => set({ isAuthenticated: false, userRole: null, isAnonymousMode: false }),
  toggleAnonymousMode: (status) => set({ isAnonymousMode: status }),
}));
