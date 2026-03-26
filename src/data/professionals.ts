export interface Professional {
  id: string;
  name: string;
  specialty: string;
  tags: string[];
  hourlyRate: number; // in tokens
  imageUrl: string;
}

export const professionals: Professional[] = [
  {
    id: 'dr-elena-carter',
    name: 'Dr. Elena Carter',
    specialty: 'Clinical Psychologist',
    tags: ['Anxiety', 'CBT'],
    hourlyRate: 8,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW-RYo3e7VxMihwGJ9dYe5uYZSrWpwhTrP6oCB-8M3YgFCEa72-_18MvFMuJJvMVsbAsj8OowOW8394ieiHOVGjoRMXV6DG7mfJ-vlSNZ1lhm0yVQc44Gs9ra4Mye8G3oojhx1m95045CPhARxiTkdIRiQwEfxRCo_MvnuWyrYuN2niqMMnf6e43cVpyuerrovUJ6L0GLhsHPf0wexfZnn2iQYloC33GYGKOpwJyia0PJcx6g27TknYdK9_lQHcOCjgto-VajzRGc6',
  },
  {
    id: 'dr-james-wilson',
    name: 'Dr. James Wilson',
    specialty: 'Cognitive Behavioral Therapist',
    tags: ['Depression', 'Trauma'],
    hourlyRate: 5,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXSqRRIKyjn2xTq7fY8LmwvB3za0z0wIkcxnG6hloSrcL3cnFqa4n8Uggy3lWTrwvYLAuAsnJ3MS-CUzT1Gw2B_GuJccyHu5Kego27u7fz3tBW8MBerqAiPwWwF24ylL7dKBiFbqGNtWZxOkmYdPfDejxt3kH7_WJzIGuSCy2SZJGD4KntE26ZdZnv04amewxwmWp0squLvmc-0d8wNwsZdfnciIWDB3Z1EmY-NAPncJc-XheyaHhieI7sMHZFrKs0qS6SHZE8RcXG',
  },
  {
    id: 'sarah-jenkins-lcsw',
    name: 'Sarah Jenkins, LCSW',
    specialty: 'Licensed Clinical Social Worker',
    tags: ['Relationships', 'LGBTQ+'],
    hourlyRate: 0,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAJJE-X4Vme_x0FvBXNfwKnOLD6zj67MZ4QwVdjZblBFA0JNi8dlmTq3K1U20l0ZSohXFwBPMElFYFsia_AwrX9HTy-t55h2_ys_5IcD_3AHNiFFXJ8l8TL3E_EXyZFGjBtCXwuu0Prx97FHmPZYUnQ-9itMFNnGtMvXIkH-JNpLK6lHDGZJnUdsTYvQvZrVaQiPXPO7yJV_u6zjGXWLw0CKb9RdiQj4OvdTfFJkx67Kua2VbUZafqSNxm-qwKh-r7mLRas5u3_ndf',
  },
];
