export interface Group {
  id: string;
  title: string;
  tag: string;
  description: string;
  image: string;
  verified: boolean;
  entryFee: number; // in tokens
}

export const groups: Group[] = [
  {
    id: 'g1',
    title: 'Valor & Voice: Veteran Support',
    tag: 'HEALING',
    description: 'A safe harbor for those who served. Shared experiences, professional guidance, and peer-to-peer strength.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPfeNlgAm8gf2Mej07_lXj-CwnVCANQcJgGrghX-eVQxFInQ188Y7whWjSm5R8WLBZaX6Db7-YSTgJxIgCzjENN0B_p38taOQZ1y_CBjLvUUH5yLS1kZgVCdDN1S_15i0eED6KMJc-ATT8pyCdCN2VPE30fNw5US2Igl0exfyO8vhLd2TZ_n-uuIx51iRbVTTpkDDQBbBd4CEEftTlZyMDrCgvtXpFCMNINEz6Rp-8EwrFKufTz5ZvCvwIgj1uYAzppZJcBRNNFCrb',
    verified: true,
    entryFee: 0,
  },
  {
    id: 'g2',
    title: 'The Open Pews: Interfaith',
    tag: 'INCLUSIVE',
    description: 'Bridging faith and modern identity. A space for spiritual growth without judgment or dogma.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcfUc3Yynqpk55dKQyCoMGtfo-GD_Uj9u2Nwq57l9LuVl-52QWt-IdVjbvDQO07_UUrr0EaKXUDtYOCPzi83T-zirC_pLcS2l20tPE0miRv_kqm3GFuBz5aVL59dNZurDjdfqOZcsyBHlXaiLEttGplg4q7LZSWq_mtCX5bCo4o5Ca3sRaKjnDcRE4bh5zuUILpS-k2lMIyswbxSrSOU3uCrBfnAce7w8F08jHNuzJWGJ66bFxiBHbAHNmrHBgFuoTZSfUF3CawbTd',
    verified: true,
    entryFee: 2,
  },
  {
    id: 'g3',
    title: 'Chronic Warriors Collective',
    tag: 'RESILIENCE',
    description: 'Navigating long-term health journeys together. Real talk about pain, fatigue, and the victories in between.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAE2V6qepRw2arH3IQwSlCRgT5KtLqBuDIRcX8OuHzFVOaXBVeE9N1VkSdNXqcsjdOJUiTV9Y1tL5z_zfyF-qqRvxTjuy2ipeOb5bVeUIUCH8UleHvlo1PW6JdWqqI7SZO-SMzY5dqY327aw6-RFqSvm9T8DvjmKOX6BLJB3XYui7o5AyR0qH85f1CFUZmuTDdiUSmDZaVRInxHMuqHr0dER66HxssWOdCHAy_67gT_785MT4EvnKf06XDEO8RBtxWHc0WQpDpnl05n',
    verified: true,
    entryFee: 5,
  },
  {
    id: 'g4',
    title: 'Sober Horizons Hub',
    tag: 'RECOVERY',
    description: 'Celebrating clarity. A fun, active, and strictly sober community focused on building a vibrant new life.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGY-7y1cbaM8iqMXu7ky8CuoXDnu83C0nxBmZ_QSrRP3RFp74vwg-qSMaGhPSte7c2I5QvgidZfMPivsrKhAoxMiNMVHE4X3IoaE0mgof-l6pg9P_w_HOH0p3K6DgAia3mdgOQ2WIeetR3MuP9k1Fkdv15xmx1meHfO7BePndO5NfWhVsfMpknLQMDNry_rNL_d6pWkjG3cD686_wYIVcpV4Di4BiS3yqoKtA6KWStOxf_E8TK-eXLN4moiohYS6gttQ5oJ9Jto90D',
    verified: true,
    entryFee: 0,
  },
];
