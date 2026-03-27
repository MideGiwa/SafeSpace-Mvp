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
    // Note: The backend currently lacks a global "Upcoming Sessions" aggregator.
    // For now, we return mock data to keep the UI functional while cross-group 
    // aggregation logic is implemented in the API layer.
    return [
      {
        id: 'mock-1',
        clientName: 'Sarah Jenkins',
        sessionType: 'CBT Therapy',
        time: '14:30',
        durationMins: 45,
        mode: 'video',
        isNext: true,
      },
      {
        id: 'mock-2',
        clientName: 'Support Group: Anxiety',
        sessionType: 'Peer Support',
        time: '16:00',
        durationMins: 60,
        mode: 'voice',
      }
    ];
  },

  getStats: async () => {
    const response = await api.get('/users/me/sessions/stats');
    return response.data;
  }
};
