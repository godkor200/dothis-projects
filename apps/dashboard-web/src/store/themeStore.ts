import { create } from 'zustand';

interface ThemeAction {
  setTheme: (value: boolean) => void;
}

interface ThemeState {
  theme: boolean;
  actions: ThemeAction;
}

export const authStore = create<ThemeState>((set) => ({
  theme: false,
  actions: {
    setTheme: (value: boolean) => set(() => ({ theme: value })),
  },
}));

// State
export const useTheme = () => authStore((state) => state.theme);

// Actions
export const useThemeActions = () => authStore((state) => state.actions);
