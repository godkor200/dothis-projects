import { create } from 'zustand';

interface modalState {
  open: boolean;
  content: React.ReactNode | null;
  actions: modalAction;
}

interface modalAction {
  setOpen: (value: boolean) => void;
  setContent: (value: React.ReactNode) => void;
}

export const modalStore = create<modalState>((set) => ({
  open: false,
  content: null,
  actions: {
    setOpen: (value: boolean) => set(() => ({ open: value })),
    setContent: (value: React.ReactNode) => set(() => ({ content: value })),
  },
}));

// State
export const useModalOpen = () => modalStore((state) => state.open);
export const useModalContent = () => modalStore((state) => state.content);

// Actions
export const useModalActions = () => modalStore((state) => state.actions);
