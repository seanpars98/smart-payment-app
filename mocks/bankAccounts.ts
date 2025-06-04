import { BankAccount } from '@/types';

export const bankAccounts: BankAccount[] = [
  {
    id: 'bank-1',
    name: 'Chase Bank',
    accountNumber: '****4567',
    type: 'checking',
    isDefault: true,
  },
  {
    id: 'bank-2',
    name: 'Bank of America',
    accountNumber: '****8901',
    type: 'savings',
    isDefault: false,
  },
];