import { create } from 'zustand';

interface RandomIndexAction {
  setRandomIndex: (value: number) => void;
}

interface RandomIndexState {
  randomIndex: number;
  actions: RandomIndexAction;
}

export const randomIndexStore = create<RandomIndexState>((set) => ({
  randomIndex: 0,
  actions: {
    setRandomIndex: (value: number) => set(() => ({ randomIndex: value })),
  },
}));

// State
export const useRandomIndex = () =>
  randomIndexStore((state) => state.randomIndex);

// Actions
export const useRandomIndexActions = () =>
  randomIndexStore((state) => state.actions);
