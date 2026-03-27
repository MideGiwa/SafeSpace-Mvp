
export interface UpcomingSession {
  id: string;
  clientName?: string;
  professionalName?: string;
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
    // Note: The official API only handles per-group sessions (GET /groups/:id/sessions).
    // This global method is provided as a frontend compatibility layer.
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
  }
};
