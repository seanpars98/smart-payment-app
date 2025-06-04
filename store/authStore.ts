import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types';
import { currentUser } from '@/mocks/users';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (userData: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // For testing purposes, start with the user already logged in
      user: currentUser,
      isAuthenticated: true,
      isLoading: false,
      login: async (username, password) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, you would validate credentials with an API
        if (username === 'johndoe') {
          set({ user: currentUser, isAuthenticated: true, isLoading: false });
        } else {
          throw new Error('Invalid credentials');
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      signup: async (userData) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, you would send user data to an API
        const newUser = {
          ...currentUser,
          ...userData,
          id: `user-${Date.now()}`,
        };
        
        set({ user: newUser, isAuthenticated: true, isLoading: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);