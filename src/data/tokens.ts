export interface TokenTransaction {
  id: number;
  type: 'credit' | 'debit';
  label: string;
  date: string;
  amount: number; // positive = credit, negative = debit
}

export const tokenTransactions: TokenTransaction[] = [
  { id: 1, type: 'debit',  label: 'Session with Dr. Elena Rossi',      date: 'Today, 10:00 AM',      amount: -5 },
  { id: 2, type: 'credit', label: 'Token top-up',                       date: 'Yesterday, 6:30 PM',   amount: 20 },
  { id: 3, type: 'debit',  label: 'Session with Marcus Chen',           date: 'Mar 24, 2:00 PM',      amount: -5 },
  { id: 4, type: 'debit',  label: 'Group: Tech Burnout Collective',     date: 'Mar 22, 8:00 PM',      amount: -2 },
  { id: 5, type: 'credit', label: 'Referral bonus',                     date: 'Mar 20, 9:00 AM',      amount: 5  },
  { id: 6, type: 'debit',  label: 'Session with Sarah Jenkins',         date: 'Mar 18, 3:00 PM',      amount: -5 },
];
