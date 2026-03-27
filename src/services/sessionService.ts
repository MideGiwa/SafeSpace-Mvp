import { api } from './api';

export interface UpcomingSession {
  id: string;
  clientName: string;
  clientInitials?: string;
  clientImage?: string;
  sessionType: string;
  time: string;
  durationMins: number;
  mode: 'video' | 'voice' | 'in-person';
  isRecurring?: boolean;
  supportLevel?: 'high' | 'normal';
  attachments?: number;
  isNext?: boolean;
}

export const sessionService = {
  getUpcomingSessions: async (): Promise<UpcomingSession[]> => {
    // In a real app, this would be a GET /bookings/upcoming or similar
    // For now, we'll try to fetch from /users/me/bookings if it exists, 
    // but the backend integration is still in progress so we'll handle errors gracefully
    try {
      const response = await api.get('/users/me/bookings');
      console.log('Fetched sessions:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching sessions:', error);
      // Fallback to empty array or throw error for Query to handle
      throw error;
    }
  },

  getStats: async () => {
    const response = await api.get('/users/me/sessions/stats');
    return response.data;
  }
};
