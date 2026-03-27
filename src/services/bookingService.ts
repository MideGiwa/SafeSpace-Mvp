import { api } from './api';

export interface Booking {
  id: string;
  userId: string;
  professionalId: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'RESCHEDULED' | 'COMPLETED' | 'CANCELLED';
  proposedAt: string;
  confirmedAt?: string;
  notes?: string;
  clientName?: string;
  clientAvatar?: string;
  professionalName?: string;
  professionalAvatar?: string;
  durationMins?: number;
}

export interface AvailabilitySlot {
  date: string;
  times: string[];
}

export const bookingService = {
  getProfessionalAvailability: async (proId: string): Promise<AvailabilitySlot[]> => {
    const response = await api.get<AvailabilitySlot[]>(`professionals/${proId}/availability`);
    return response.data;
  },

  createBooking: async (data: { professionalId: string; proposedAt: string; notes?: string }) => {
    const response = await api.post<Booking>('bookings', data);
    return response.data;
  },

  /** GET /bookings – list own bookings */
  getBookings: async (): Promise<Booking[]> => {
    const response = await api.get<Booking[]>('bookings');
    return response.data;
  },

  getBookingDetails: async (id: string): Promise<Booking> => {
    const response = await api.get<Booking>(`bookings/${id}`);
    return response.data;
  },

  acceptBooking: async (id: string): Promise<void> => {
    await api.patch(`bookings/${id}/accept`);
  },

  declineBooking: async (id: string): Promise<void> => {
    await api.patch(`bookings/${id}/decline`);
  },

  rescheduleBooking: async (id: string, proposedAt: string): Promise<void> => {
    await api.patch(`bookings/${id}/reschedule`, { proposedAt });
  },

  completeBooking: async (id: string): Promise<void> => {
    await api.patch(`bookings/${id}/complete`);
  },

  cancelBooking: async (id: string): Promise<void> => {
    await api.delete(`bookings/${id}`);
  }
};
