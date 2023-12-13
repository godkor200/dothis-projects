import { create } from 'zustand';

interface DismissActions {
  setRandomIndex: (value: number) => void;
}

interface DismissState {
  dismiss: number;
  actions: DismissActions;
}

export const dismissStore = create<DismissState>((set) => ({
  dismiss: 0,
  actions: {
    setRandomIndex: (value: number) => set(() => ({ dismiss: value })),
  },
}));

// State
export const useDismiss = () => dismissStore((state) => state.dismiss);

// Actions
export const useDismissActions = () => dismissStore((state) => state.actions);
