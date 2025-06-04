export type User = {
  id: string;
  username: string;
  name: string;
  avatar?: string;
  email: string;
  walletAddress?: string;
};

export type Currency = 'USD' | 'USDT' | 'USDC';

export type Balance = {
  currency: Currency;
  amount: number;
};

export type TransactionType = 'send' | 'request' | 'deposit' | 'withdraw';

export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export type Transaction = {
  id: string;
  type: TransactionType;
  amount: number;
  currency: Currency;
  sender: User;
  recipient: User;
  status: TransactionStatus;
  note?: string;
  timestamp: number;
};

export type BankAccount = {
  id: string;
  name: string;
  accountNumber: string;
  type: 'checking' | 'savings';
  isDefault: boolean;
};