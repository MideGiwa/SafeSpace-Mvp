import axios from 'axios';

const getBaseUrl = () => {
  return import.meta.env.VITE_API_BASE_URL || '/api';
};

// Separate instance for auth-only calls to avoid interceptor recursion
const authApi = axios.create({
  baseURL: getBaseUrl(),
  headers: { 'Content-Type': 'application/json' }
});

export interface User {
  id?: string;
  email: string;
  pseudonym?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  role: 'REGULAR' | 'VERIFIED_PERSON' | 'PROFESSIONAL' | 'ADMIN' | 'LEADER';
  kycStatus: 'PENDING' | 'VERIFIED' | 'FAILED' | 'MANUAL_REVIEW';
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
    const response = await authApi.post<AuthResponse>('auth/login', credentials);
    return response.data;
  },

  register: async (data: any): Promise<AuthResponse> => {
    const response = await authApi.post<AuthResponse>('auth/register', data);
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<string> => {
    // We use authApi here because we DON'T want the interceptor to add an expired access token
    // or catch 401s from the refresh endpoint itself.
    const response = await authApi.post<{ access_token: string }>('auth/refresh', { refreshToken });
    return response.data.access_token;
  },

  logout: async (refreshToken: string): Promise<void> => {
    await authApi.post('auth/logout', { refreshToken }).catch(() => {});
  },
};
