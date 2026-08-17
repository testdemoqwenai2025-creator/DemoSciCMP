import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeState {
  themeMode: ThemeMode;
  resolvedTheme: boolean; // true = dark, false = light (the actual applied theme)
  
  // Actions
  setThemeMode: (mode: ThemeMode) => void;
  cycleTheme: () => void;
}

/**
 * Get the system's preferred color scheme
 */
function getSystemPrefersDark(): boolean {
  if (typeof window === 'undefined') return true; // Default to dark for SSR
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Resolve the actual theme based on mode and system preference
 */
function resolveTheme(mode: ThemeMode): boolean {
  if (mode === 'auto') {
    return getSystemPrefersDark();
  }
  return mode === 'dark';
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      // Initialize with 'auto' as default (follows OS preference)
      themeMode: 'auto',
      resolvedTheme: true, // Will be updated on mount

      setThemeMode: (mode: ThemeMode) => {
        const resolved = resolveTheme(mode);
        set({ 
          themeMode: mode, 
          resolvedTheme: resolved 
        });
        
        // Apply to DOM immediately
        if (typeof window !== 'undefined') {
          document.documentElement.classList.toggle('dark', resolved);
        }
      },

      cycleTheme: () => {
        const currentMode = get().themeMode;
        const modes: ThemeMode[] = ['light', 'dark', 'auto'];
        const currentIndex = modes.indexOf(currentMode);
        const nextMode = modes[(currentIndex + 1) % modes.length];
        
        get().setThemeMode(nextMode);
      },
    }),
    {
      name: 'scicmp-theme-v2',
      partialize: (state) => ({
        themeMode: state.themeMode,
      }),
      // Rehydrate and resolve theme on load
      onRehydrateStorage: () => (state) => {
        if (state && typeof window !== 'undefined') {
          // Resolve the actual theme after rehydration
          const resolved = resolveTheme(state.themeMode);
          state.resolvedTheme = resolved;
          
          // Apply to DOM
          document.documentElement.classList.toggle('dark', resolved);
        }
      },
    }
  )
);

/**
 * Hook to listen for system theme changes when in 'auto' mode
 * Returns cleanup function
 */
export function useSystemThemeListener(callback: (isDark: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleChange = (e: MediaQueryListEvent) => {
    callback(e.matches);
  };
  
  // Modern browsers
  mediaQuery.addEventListener('change', handleChange);
  
  // Return cleanup function
  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
}
