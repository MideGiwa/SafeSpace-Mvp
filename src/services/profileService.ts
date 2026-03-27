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
  /** GET /users/me – fetch the current user's full profile */
  getProfile: async (): Promise<User> => {
    const response = await api.get<User>('/users/me');
    return response.data;
  },

  /** PATCH /users/me – update editable profile fields */
  updateProfile: async (data: UpdateProfileDto): Promise<User> => {
    const response = await api.patch<User>('/users/me', data);
    return response.data;
  },
};
