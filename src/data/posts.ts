export interface Post {
  id: string;
  author: string;
  pseudonym?: string;
  avatar?: string;
  groupName: string;
  groupId: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
}

export const posts: Post[] = [
  {
    id: 'post-1',
    author: 'Anonymous',
    pseudonym: 'Quiet Storm',
    groupName: 'Anxiety Support Circle',
    groupId: 'g-2',
    content: 'Today was rough, but I got through it. Anyone else finding that journaling helps? Even just 10 minutes in the morning changed things for me.',
    timestamp: '2h ago',
    likes: 14,
    replies: 5,
  },
  {
    id: 'post-2',
    author: 'Anonymous',
    pseudonym: 'Healing Waters',
    groupName: 'Mindfulness & Meditation',
    groupId: 'g-3',
    content: 'Happy to share the breathing technique I learned last week — box breathing. In 4, hold 4, out 4, hold 4. It genuinely calmed my panic attacks.',
    timestamp: '5h ago',
    likes: 31,
    replies: 12,
  },
  {
    id: 'post-3',
    author: 'Anonymous',
    pseudonym: 'Morning Light',
    groupName: 'Grief & Loss',
    groupId: 'g-4',
    content: 'One year today. It gets different, not necessarily easier, but different. Grateful for this space.',
    timestamp: '1d ago',
    likes: 48,
    replies: 19,
  },
];
