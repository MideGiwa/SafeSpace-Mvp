import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';
import { authService } from './authService';

const getBaseUrl = () => {
  // If we are in dev, use localhost or Vite proxy config.
  // For now, let's assume '/api' works and Vite covers it, or fallback.
  return import.meta.env.VITE_API_BASE_URL || '/api';
};

export const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the access token
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 and refresh tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Avoid infinite loops: if the request itself was a refresh attempt, just logout
    const isRefreshRequest = originalRequest.url?.includes('/auth/refresh');

    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshRequest) {
      originalRequest._retry = true;
      
      try {
        const { refreshToken, logout, setTokens } = useAuthStore.getState();
        
        if (!refreshToken) {
          logout();
          return Promise.reject(error);
        }

        // Refresh the token (this call now bypasses this interceptor)
        const newAccessToken = await authService.refreshToken(refreshToken);
        
        // Update store
        setTokens(newAccessToken, refreshToken);
        
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails (e.g., refresh token expired), force logout
        console.error('Session expired. Logging out.');
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
