import { api } from './api';
import type { User } from './authService';

export interface UpdateProfileDto {
  pseudonym?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  dmOptIn?: boolean;
}

export const profileService = {
  /** GET /users/{id} – fetch a user's full profile */
  getProfile: async (id: string): Promise<User> => {
    const response = await api.get<User>(`users/${id}`);
    return response.data;
  },

  /** PATCH /users/{id} – update editable profile fields */
  updateProfile: async (id: string, data: UpdateProfileDto): Promise<User> => {
    const response = await api.patch<User>(`users/${id}`, data);
    return response.data;
  },
};
