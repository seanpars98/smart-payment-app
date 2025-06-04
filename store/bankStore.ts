import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { BankAccount } from '@/types';
import { bankAccounts as mockBankAccounts } from '@/mocks/bankAccounts';

interface BankState {
  bankAccounts: BankAccount[];
  isLoading: boolean;
  fetchBankAccounts: () => Promise<void>;
  addBankAccount: (account: Omit<BankAccount, 'id' | 'isDefault'>) => Promise<void>;
  removeBankAccount: (id: string) => Promise<void>;
  setDefaultBankAccount: (id: string) => void;
}

export const useBankStore = create<BankState>()(
  persist(
    (set) => ({
      bankAccounts: mockBankAccounts,
      isLoading: false,
      
      fetchBankAccounts: async () => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, you would fetch bank accounts from an API
        set({ bankAccounts: mockBankAccounts, isLoading: false });
      },
      
      addBankAccount: async (account) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newAccount: BankAccount = {
          ...account,
          id: `bank-${Date.now()}`,
          isDefault: false,
        };
        
        set(state => ({
          bankAccounts: [...state.bankAccounts, newAccount],
          isLoading: false,
        }));
      },
      
      removeBankAccount: async (id) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        set(state => ({
          bankAccounts: state.bankAccounts.filter(account => account.id !== id),
          isLoading: false,
        }));
      },
      
      setDefaultBankAccount: (id) => {
        set(state => ({
          bankAccounts: state.bankAccounts.map(account => ({
            ...account,
            isDefault: account.id === id,
          })),
        }));
      },
    }),
    {
      name: 'bank-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);