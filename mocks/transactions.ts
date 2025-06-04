import { Transaction } from '@/types';
import { users } from './users';

export const transactions: Transaction[] = [
  {
    id: 'tx-1',
    type: 'send',
    amount: 50,
    currency: 'USD',
    sender: users[0],
    recipient: users[1],
    status: 'completed',
    note: 'Dinner last night',
    timestamp: Date.now() - 3600000, // 1 hour ago
  },
  {
    id: 'tx-2',
    type: 'request',
    amount: 25.5,
    currency: 'USDT',
    sender: users[2],
    recipient: users[0],
    status: 'pending',
    note: 'Movie tickets',
    timestamp: Date.now() - 86400000, // 1 day ago
  },
  {
    id: 'tx-3',
    type: 'deposit',
    amount: 200,
    currency: 'USD',
    sender: users[0],
    recipient: users[0],
    status: 'completed',
    timestamp: Date.now() - 172800000, // 2 days ago
  },
  {
    id: 'tx-4',
    type: 'send',
    amount: 75,
    currency: 'USDC',
    sender: users[0],
    recipient: users[3],
    status: 'completed',
    note: 'Concert tickets',
    timestamp: Date.now() - 259200000, // 3 days ago
  },
  {
    id: 'tx-5',
    type: 'withdraw',
    amount: 100,
    currency: 'USD',
    sender: users[0],
    recipient: users[0],
    status: 'completed',
    timestamp: Date.now() - 345600000, // 4 days ago
  },
  {
    id: 'tx-6',
    type: 'request',
    amount: 30,
    currency: 'USD',
    sender: users[0],
    recipient: users[4],
    status: 'completed',
    note: 'Lunch',
    timestamp: Date.now() - 432000000, // 5 days ago
  },
];