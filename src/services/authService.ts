import { api } from './api';

export interface User {
  id?: string;
  email: string;
  pseudonym?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  role: 'REGULAR' | 'VERIFIED_PERSON' | 'PROFESSIONAL' | 'ADMIN';
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  isBanned: boolean;
  dmOptIn: boolean;
  [key: string]: any;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export const authService = {
  login: async (credentials: any): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  register: async (data: any): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<string> => {
    const response = await api.post<{ access_token: string }>('/auth/refresh', { refreshToken });
    return response.data.access_token;
  },

  logout: async (refreshToken: string): Promise<void> => {
    await api.post('/auth/logout', { refreshToken }).catch(() => {});
  },
};
