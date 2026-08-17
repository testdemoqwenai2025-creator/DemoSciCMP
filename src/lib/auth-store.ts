import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin' | 'researcher';
  institution?: string;
  plan: 'free' | 'pro' | 'enterprise';
  joinedAt: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  showLoginModal: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setShowLoginModal: (show: boolean) => void;
  updateProfile: (data: Partial<User>) => void;
}

// Demo users for testing
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'demo@scicmp.com': {
    password: 'demo123',
    user: {
      id: '1',
      email: 'demo@scicmp.com',
      name: 'Dr. Sarah Chen',
      avatar: undefined,
      role: 'researcher',
      institution: 'MIT Bioinformatics',
      plan: 'pro',
      joinedAt: new Date('2024-01-15'),
    },
  },
  'admin@scicmp.com': {
    password: 'admin123',
    user: {
      id: '2',
      email: 'admin@scicmp.com',
      name: 'Admin User',
      avatar: undefined,
      role: 'admin',
      institution: 'SciCMP Team',
      plan: 'enterprise',
      joinedAt: new Date('2023-06-01'),
    },
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      showLoginModal: false,

      login: async (email: string, password: string): Promise<boolean> => {
        set({ isLoading: true });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const demoUser = DEMO_USERS[email];
        
        if (demoUser && demoUser.password === password) {
          set({
            user: demoUser.user,
            isAuthenticated: true,
            isLoading: false,
            showLoginModal: false,
          });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      setShowLoginModal: (show: boolean) => {
        set({ showLoginModal: show });
      },

      updateProfile: (data: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...data } });
        }
      },
    }),
    {
      name: 'scicmp-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
