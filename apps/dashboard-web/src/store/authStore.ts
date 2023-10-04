import { create } from 'zustand';

import type { AuthState } from '@/types/auth';

export const authStore = create<AuthState>((set) => ({
  isSignedIn: false,
  isTokenRequired: false,
  isRequesting: true,
  isOpenSignUpModal: false,
  actions: {
    setIsSignedIn: (value: boolean) => set(() => ({ isSignedIn: value })),
    setIsTokenRequired: (value: boolean) =>
      set(() => ({ isTokenRequired: value })),
    setIsRequesting: (value: boolean) => set(() => ({ isRequesting: value })),
    setIsOpenSignUpModal: (value: boolean) =>
      set(() => ({ isOpenSignUpModal: value })),
  },
}));

// State
export const useIsSignedIn = () => authStore((state) => state.isSignedIn);
export const useIsTokenRequired = () =>
  authStore((state) => state.isTokenRequired);
export const useIsRequesting = () => authStore((state) => state.isRequesting);
export const useIsOpenSignUpModal = () =>
  authStore((state) => state.isOpenSignUpModal);

// Actions
export const useAuthActions = () => authStore((state) => state.actions);
