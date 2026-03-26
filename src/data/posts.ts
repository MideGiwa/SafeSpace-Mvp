export interface Post {
  id: string;
  authorName: string;
  authorImage?: string;
  isAnonymous?: boolean;
  timeAgo: string;
  category: string;
  tag?: string;
  content: string;
  initialHugs: number;
  commentsCount: number;
}

export const posts: Post[] = [
  {
    id: 'p1',
    authorName: 'Sarah Miller',
    authorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQAU8ENWJYZ7OdM97KGCo-qkmaJTXWLh-0XO-WSaqIci42gWzIOeoplMlaaCYTTiU6pecU-zpgdincDg7mTunN9a2a_NkeKFIRlaNuK_dhGxFAcj6y75Eu1Zp4ZDfwn0zOASpMLq6oDErsQ969Vx1tXNslXmIHK_IusZm2nPVFDWl05Sn5rE0h9Z8j5iCtF10ccrpg6QKvfUvPRRsDEYGcwg1wp7xSxfN0evek58RlKH3HpWFyVRibOBASFPvGZXgPHsaT1BP0c_eu',
    timeAgo: '2 hours ago',
    category: 'Community',
    tag: 'Feeling Heard',
    content: "Finally took that first step and reached out to a professional today. It wasn't as scary as I thought. To anyone waiting for a sign—this is it. 🌿",
    initialHugs: 24,
    commentsCount: 6,
  },
  {
    id: 'p2',
    isAnonymous: true,
    authorName: 'Anonymous Member',
    timeAgo: '5 hours ago',
    category: 'Private Reflection',
    content: '"Sometimes the bravest thing you can do is just existing through the heavy days. Today was one of those, but I\'m still here."',
    initialHugs: 12,
    commentsCount: 0,
  },
  {
    id: 'p3',
    authorName: 'Marcus Chen',
    authorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZr5O1my1SMeI42GHROxGngVcjsDQEkkXBtG0o7QOvoDOqV6n1TRFLFdPWouvEdXEMbBoFxdeYfDJq0JUpFTSDzaG07MSCzo4c00GuHee1FDSRp-J-k1P6obOKFH0BmAZ2dpCjyNM8r9zT_KRbsBaZx3dl5VppPv1Fxu6SMcO58wsUvkvaEhkkRmblK_6FOYjiQLxzCzi3kpRlf5N_HafuxWOgLG4UPMLoUpoxk5DEJU4DC6Lpr7580XrewaVGUL485cVK1sk4D0ej',
    timeAgo: '8 hours ago',
    category: 'Morning Peace',
    content: 'The view from my morning walk. Finding clarity in the quiet.',
    initialHugs: 142,
    commentsCount: 18,
  },
];
