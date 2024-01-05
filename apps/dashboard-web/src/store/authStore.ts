import { create } from 'zustand';

import type { AuthState } from '@/types/auth';

export const authStore = create<AuthState>((set) => ({
  isSignedIn: false,
  isTokenRequired: null,
  isOpenSignUpModal: false,
  actions: {
    setIsSignedIn: (value: boolean) => set(() => ({ isSignedIn: value })),
    setIsTokenRequired: (value: boolean) =>
      set(() => ({ isTokenRequired: value })),
    setIsOpenSignUpModal: (value: boolean) =>
      set(() => ({ isOpenSignUpModal: value })),
  },
}));

// State
export const useIsSignedIn = () => authStore((state) => state.isSignedIn);
export const useIsTokenRequired = () =>
  authStore((state) => state.isTokenRequired);
export const useIsOpenSignUpModal = () =>
  authStore((state) => state.isOpenSignUpModal);

// Actions
export const useAuthActions = () => authStore((state) => state.actions);
