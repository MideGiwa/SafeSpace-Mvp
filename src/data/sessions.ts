export interface SessionRecord {
  id: string;
  date: string;       // display date string
  time: string;       // display time string
  clientName: string;
  clientInitials?: string;
  clientImage?: string;
  sessionType: 'Individual Therapy' | 'Initial Intake' | 'Group Session' | 'Crisis Intervention';
  durationMins: number;
  status: 'Completed' | 'Draft Notes' | 'Cancelled';
}

export const sessionHistory: SessionRecord[] = [
  {
    id: 'sh-1',
    date: 'Oct 24, 2023',
    time: '02:30 PM',
    clientName: 'Eleanor Murphy',
    clientInitials: 'EM',
    sessionType: 'Individual Therapy',
    durationMins: 50,
    status: 'Completed',
  },
  {
    id: 'sh-2',
    date: 'Oct 22, 2023',
    time: '10:00 AM',
    clientName: 'Jameson Reed',
    clientImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvkVQFFhSLtmgekYbJoNByAJqJFkP1yHVTqAEkb6FnPjpoBzO3B21LePJc8udHM4HczUNvgsc3Ad_E-BJuf3WbXglq06bu9j4v-_qIZs9Cs82o7Z8mFkOaWanjaUHCy6mCVuBqsWoTHJmkfeGPOHM7t7hpdZSBEwG6SE1aKEa5Yj9yCu1ZWLmz_aRZ5Opg6cA9D8BTWRTkpHBC9bW56tWCOSHXoa4PtpKYwE1b7lrqdcRKi3iRrx9ctwsWzB8_bU57QjJQmigVBbBU',
    sessionType: 'Initial Intake',
    durationMins: 90,
    status: 'Completed',
  },
  {
    id: 'sh-3',
    date: 'Oct 21, 2023',
    time: '04:15 PM',
    clientName: 'Sarah Lopez',
    clientInitials: 'SL',
    sessionType: 'Group Session',
    durationMins: 60,
    status: 'Draft Notes',
  },
  {
    id: 'sh-4',
    date: 'Oct 19, 2023',
    time: '11:00 AM',
    clientName: 'Maya Henderson',
    clientImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbC_9wA3S2B6S9oJ7I2IdElRT5mZu56AiOZazKGXsSdPh5Q0Ux8rTA8VJ1-PIUKfUBsGJ8DFYsordxfC3x6oFQc9OLDxupTogJ-3QTpaneooFsVa_pIxgvOK8UVt5pfGOlQLY5Tzlj1hWjgHMPTA4_vR1B2Iqv_aeOg5vOjbXaiUUkZ7K-HAH7Qe0GEQiQhfdK6b7bGr_iLJBpIWhICIk_g7UY6SvJJrRfvci1JYFnXc5gmvN81WMUuf-hkjvl_YjdXBNtw0gtdJli',
    sessionType: 'Individual Therapy',
    durationMins: 50,
    status: 'Completed',
  },
];

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
  isNext?: boolean; // the immediate/hero session
}

export const upcomingSessions: UpcomingSession[] = [
  {
    id: 'us-1',
    clientName: 'Elena Rodriguez',
    clientImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChV0TFsmk4Uvc092GejsM8rYo299Yvh9tjhCubomZXN6o9czdYnyxaEBOLmPWuXp_2d-oXqYxPV2k8XJr-AzEN_kGXhlm-XENLYLrecl6lPYPrVMmDwRC_xatDlLA97Npk9rwYMZj5dZbWb5yem-gxo9oF3HCuN-MZlawvw2nuhCcztTRZHacBNx2dZLDR8Oe0amzX5RI95PovlMimYN05GTMgfx2aX2awCnC7edt82UWRQUoKcqMmiGyRzmT9z8afuuDkaUuGGRWT',
    sessionType: 'Anxiety Support',
    time: '10:00 AM — 11:00 AM',
    durationMins: 60,
    mode: 'video',
    isRecurring: true,
    isNext: true,
  },
  {
    id: 'us-2',
    clientName: 'Jameson Dunst',
    clientInitials: 'JD',
    sessionType: 'Cognitive Behavioral Therapy',
    time: '1:30 PM',
    durationMins: 60,
    mode: 'video',
    attachments: 2,
  },
  {
    id: 'us-3',
    clientName: 'Marcus Chen',
    clientImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCawEb6HiQOoQhwFyyXcH6g8K57h8Y5R0LgdfunLGaD2lgokPgWTMs20pcdROy6nt1abWA0vyMqqs3ZfVQRGFnM9a9Csng9qOPrpv9k_jWleI9_QRLnEeygVuQifjwOxpdiUqdKPHIBxOaglb-R28MZHJVUwY8byd27A9dOv4_J_vQ4cOiQu0tMMsZu4r8EDozCIUUv2yZs4MGmdpcTxkwSS2jwNBN-wzHnaoZBXFxcgV_MHXWtjm_Rf-0okI1CMyC_a1EhZ_CevZTK',
    sessionType: 'Relationship Counseling',
    time: '3:00 PM',
    durationMins: 60,
    mode: 'video',
    supportLevel: 'high',
  },
];
