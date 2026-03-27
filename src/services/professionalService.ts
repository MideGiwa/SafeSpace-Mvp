import { api } from './api';

export interface ProfessionalProfile {
  id: string;
  userId: string;
  bio: string;
  specialty: string;
  availabilityNote?: string;
  isVerified: boolean;
  contactPreference: string;
  createdAt: string;
  user?: {
    pseudonym: string;
    firstName?: string;
    lastName?: string;
  };
}

export const professionalService = {
  /** GET /professionals – list verified pros */
  getProfessionals: async (specialty?: string): Promise<ProfessionalProfile[]> => {
    const url = specialty ? `professionals?specialty=${specialty}` : 'professionals';
    const response = await api.get<ProfessionalProfile[]>(url);
    return response.data;
  },

  /** GET /professionals/:id – get by userId */
  getProfessionalById: async (id: string): Promise<ProfessionalProfile> => {
    const response = await api.get<ProfessionalProfile>(`professionals/${id}`);
    return response.data;
  },

  /** POST /professionals/profile – submit for verification */
  submitProfile: async (data: Partial<ProfessionalProfile>): Promise<ProfessionalProfile> => {
    const response = await api.post<ProfessionalProfile>('professionals/profile', data);
    return response.data;
  },

  /** PATCH /professionals/profile – update own */
  updateProfile: async (data: Partial<ProfessionalProfile>): Promise<ProfessionalProfile> => {
    const response = await api.patch<ProfessionalProfile>('professionals/profile', data);
    return response.data;
  },

  /** POST /professionals/:id/connect – express interest */
  connect: async (id: string): Promise<void> => {
    await api.post(`professionals/${id}/connect`);
  }
};
