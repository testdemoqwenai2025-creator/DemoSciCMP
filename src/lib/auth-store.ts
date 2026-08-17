import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  generatePKCE,
  buildAuthUrl,
  storeOAuthData,
  getOAuthData,
  clearOAuthData,
  parseOAuthCallback,
  exchangeCodeForToken,
  fetchGitHubUser,
  fetchGitHubEmails,
  GITHUB_OAUTH_CONFIG
} from './github-oauth';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin' | 'researcher';
  institution?: string;
  plan: 'free' | 'pro' | 'enterprise';
  joinedAt: Date;
  // GitHub-specific fields
  githubId?: number;
  githubLogin?: string;
  accessToken?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isGithubLoading: boolean;
  showLoginModal: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setShowLoginModal: (show: boolean) => void;
  updateProfile: (data: Partial<User>) => void;
  
  // GitHub OAuth Actions
  initiateGithubLogin: () => Promise<void>;
  handleGithubCallback: () => Promise<boolean>;
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
      isGithubLoading: false,
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
        // Clear GitHub OAuth data on logout
        clearOAuthData();
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

      /**
       * Initiate GitHub OAuth Login Flow
       * Uses PKCE for security - no server required
       */
      initiateGithubLogin: async () => {
        set({ isGithubLoading: true });
        
        try {
          // Generate PKCE pair
          const { codeVerifier, codeChallenge } = await generatePKCE();
          
          // Generate state parameter for CSRF protection
          const state = crypto.randomUUID();
          
          // Store in sessionStorage for callback verification
          storeOAuthData(GITHUB_OAUTH_CONFIG.STORAGE_KEYS.CODE_VERIFIER, codeVerifier);
          storeOAuthData(GITHUB_OAUTH_CONFIG.STORAGE_KEYS.STATE, state);
          
          // Build and redirect to GitHub authorization URL
          const authUrl = buildAuthUrl(codeChallenge, state);
          window.location.href = authUrl;
        } catch (error) {
          console.error('GitHub OAuth initiation failed:', error);
          set({ isGithubLoading: false });
          throw error;
        }
      },

      /**
       * Handle GitHub OAuth Callback
       * Called when user returns from GitHub authorization
       */
      handleGithubCallback: async (): Promise<boolean> => {
        const { code, state, error } = parseOAuthCallback(window.location.href);
        
        // Check for errors
        if (error) {
          console.error('OAuth error:', error);
          set({ isGithubLoading: false });
          return false;
        }
        
        if (!code || !state) {
          set({ isGithubLoading: false });
          return false;
        }
        
        // Verify state matches (CSRF protection)
        const storedState = getOAuthData(GITHUB_OAUTH_CONFIG.STORAGE_KEYS.STATE);
        if (state !== storedState) {
          console.error('State mismatch - possible CSRF attack');
          set({ isGithubLoading: false });
          return false;
        }
        
        // Get stored code verifier
        const codeVerifier = getOAuthData(GITHUB_OAUTH_CONFIG.STORAGE_KEYS.CODE_VERIFIER);
        if (!codeVerifier) {
          console.error('Code verifier not found');
          set({ isGithubLoading: false });
          return false;
        }
        
        try {
          // Exchange code for access token
          const accessToken = await exchangeCodeForToken(code, codeVerifier);
          
          // Fetch user profile from GitHub
          const githubUser = await fetchGitHubUser(accessToken);
          const email = await fetchGitHubEmails(accessToken);
          
          // Create user object from GitHub data
          const user: User = {
            id: `github_${githubUser.id}`,
            email: email || `${githubUser.login}@users.noreply.github.com`,
            name: githubUser.name || githubUser.login,
            avatar: githubUser.avatar_url,
            role: 'user', // Default role, can be upgraded
            institution: githubUser.company || undefined,
            plan: 'free', // Free tier by default
            joinedAt: new Date(),
            githubId: githubUser.id,
            githubLogin: githubUser.login,
            accessToken: accessToken, // Store for API calls
          };
          
          // Update state with authenticated user
          set({
            user,
            isAuthenticated: true,
            isGithubLoading: false,
            showLoginModal: false,
          });
          
          // Clean up OAuth data
          clearOAuthData();
          
          // Clean URL (remove code and state params)
          window.history.replaceState({}, document.title, window.location.pathname);
          
          return true;
        } catch (error) {
          console.error('GitHub callback handling failed:', error);
          set({ isGithubLoading: false });
          return false;
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
