import { create } from 'zustand';

interface SelectedRelWordAction {
  setRelWord: ({
    keyword,
    relword,
  }: {
    keyword: string;
    relword: string;
  }) => void;
}

interface SelectedRelWordState {
  selectedWord: { keyword: string | null; relword: string | null };
  actions: SelectedRelWordAction;
}

export const selectedRelWordStore = create<SelectedRelWordState>((set) => ({
  selectedWord: { keyword: null, relword: null },
  actions: {
    setRelWord: ({ keyword, relword }: { keyword: string; relword: string }) =>
      set(() => ({ selectedWord: { keyword: keyword, relword: relword } })),
  },
}));

// State
export const useSelectedRelWord = () =>
  selectedRelWordStore((state) => state.selectedWord);

// Actions
export const useSelectedRelWordActions = () =>
  selectedRelWordStore((state) => state.actions);
