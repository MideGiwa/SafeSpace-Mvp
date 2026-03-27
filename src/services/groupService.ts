import { api } from './api';

export interface Group {
  id: string;
  title: string;
  description: string;
  tag: string;
  memberCount: number;
  isPublic: boolean;
  category: string;
  leaderId?: string;
  createdAt: string;
  image?: string;
  verified?: boolean;
  entryFee?: number;
}

export interface GroupSession {
  id: string;
  groupId: string;
  title: string;
  startTime: string;
  endTime?: string;
  status: 'OPEN' | 'CLOSED';
  meetingLink?: string;
}

export interface GroupMember {
  id: string;
  pseudonym: string;
  role: string;
  joinedAt: string;
}

export const groupService = {
  getGroups: async (): Promise<Group[]> => {
    const response = await api.get<Group[]>('groups');
    return response.data;
  },

  getJoinedGroups: async (): Promise<Group[]> => {
    const response = await api.get<Group[]>('groups/joined');
    return response.data;
  },

  createGroup: async (data: Partial<Group>): Promise<Group> => {
    const response = await api.post<Group>('groups', data);
    return response.data;
  },

  getGroupDetails: async (id: string): Promise<Group> => {
    const response = await api.get<Group>(`groups/${id}`);
    return response.data;
  },

  updateGroup: async (id: string, data: Partial<Group>): Promise<Group> => {
    const response = await api.patch<Group>(`groups/${id}`, data);
    return response.data;
  },

  deleteGroup: async (id: string): Promise<void> => {
    await api.delete(`groups/${id}`);
  },

  joinGroup: async (id: string): Promise<void> => {
    await api.post(`groups/${id}/join`);
  },

  leaveGroup: async (id: string): Promise<void> => {
    await api.post(`groups/${id}/leave`);
  },

  getMembers: async (id: string): Promise<GroupMember[]> => {
    const response = await api.get<GroupMember[]>(`groups/${id}/members`);
    return response.data;
  },

  removeMember: async (groupId: string, userId: string): Promise<void> => {
    await api.delete(`groups/${groupId}/members/${userId}`);
  },

  // Sessions
  createSession: async (groupId: string, data: Partial<GroupSession>): Promise<GroupSession> => {
    const response = await api.post<GroupSession>(`groups/${groupId}/sessions`, data);
    return response.data;
  },

  getSessions: async (groupId: string): Promise<GroupSession[]> => {
    const response = await api.get<GroupSession[]>(`groups/${groupId}/sessions`);
    return response.data;
  },

  updateSession: async (groupId: string, sessionId: string, data: Partial<GroupSession>): Promise<GroupSession> => {
    const response = await api.patch<GroupSession>(`groups/${groupId}/sessions/${sessionId}`, data);
    return response.data;
  }
};
