import { create } from 'zustand';

interface SelectedRelWordAction {
  setRelWord: (value: string) => void;
}

interface SelectedRelWordState {
  relWord: string | null;
  actions: SelectedRelWordAction;
}

export const selectedRelWordStore = create<SelectedRelWordState>((set) => ({
  relWord: null,
  actions: {
    setRelWord: (value: string) => set(() => ({ relWord: value })),
  },
}));

// State
export const useSelectedRelWord = () =>
  selectedRelWordStore((state) => state.relWord);

// Actions
export const useSelectedRelWordActions = () =>
  selectedRelWordStore((state) => state.actions);
