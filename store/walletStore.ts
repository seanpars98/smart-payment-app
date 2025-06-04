import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Balance, Currency, Transaction } from '@/types';
import { balances as mockBalances } from '@/mocks/balances';
import { transactions as mockTransactions } from '@/mocks/transactions';

interface WalletState {
  balances: Balance[];
  transactions: Transaction[];
  selectedCurrency: Currency;
  isLoading: boolean;
  setSelectedCurrency: (currency: Currency) => void;
  getBalance: (currency: Currency) => number;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  fetchTransactions: () => Promise<void>;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      balances: mockBalances,
      transactions: mockTransactions,
      selectedCurrency: 'USD',
      isLoading: false,
      
      setSelectedCurrency: (currency) => {
        set({ selectedCurrency: currency });
      },
      
      getBalance: (currency) => {
        const balance = get().balances.find(b => b.currency === currency);
        return balance ? balance.amount : 0;
      },
      
      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          ...transaction,
          id: `tx-${Date.now()}`,
          timestamp: Date.now(),
        };
        
        set(state => ({
          transactions: [newTransaction, ...state.transactions],
        }));
        
        // Update balances based on transaction type
        set(state => {
          const newBalances = [...state.balances];
          const currencyIndex = newBalances.findIndex(b => b.currency === transaction.currency);
          
          if (currencyIndex >= 0) {
            if (transaction.type === 'send' || transaction.type === 'withdraw') {
              newBalances[currencyIndex].amount -= transaction.amount;
            } else if (transaction.type === 'deposit') {
              newBalances[currencyIndex].amount += transaction.amount;
            }
          }
          
          return { balances: newBalances };
        });
      },
      
      fetchTransactions: async () => {
        set({ isLoading: true });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // In a real app, you would fetch transactions from an API
          set({ transactions: mockTransactions, isLoading: false });
        } catch (error) {
          console.error("Error fetching transactions:", error);
          set({ isLoading: false });
        }
        
        return Promise.resolve();
      },
    }),
    {
      name: 'wallet-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);