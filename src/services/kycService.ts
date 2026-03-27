import { api } from './api';

export interface KycStatusResponse {
  kycStatus: 'PENDING' | 'VERIFIED' | 'FAILED' | 'MANUAL_REVIEW';
}

export const kycService = {
  verifyBvn: async (bvn: string): Promise<void> => {
    await api.post('kyc/verify/bvn', { bvn });
  },

  verifyNin: async (nin: string): Promise<void> => {
    await api.post('kyc/verify/nin', { nin });
  },

  getStatus: async (): Promise<KycStatusResponse> => {
    const response = await api.get<KycStatusResponse>('kyc/status');
    return response.data;
  },

  approveKyc: async (userId: string): Promise<void> => {
    await api.patch(`kyc/${userId}/approve`);
  },

  rejectKyc: async (userId: string, reason: string): Promise<void> => {
    await api.patch(`kyc/${userId}/reject`, { reason });
  }
};
