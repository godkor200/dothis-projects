import { create } from 'zustand';

interface SelectedWordAction {
  setRelWord: ({
    keyword,
    relword,
  }: {
    keyword: string;
    relword: string;
  }) => void;
}

interface SeletedWordState {
  selectedWord: { keyword: string | null; relword: string | null };
  actions: SelectedWordAction;
}

export const selectedWordStore = create<SeletedWordState>((set) => ({
  selectedWord: { keyword: null, relword: null },
  actions: {
    setRelWord: ({ keyword, relword }: { keyword: string; relword: string }) =>
      set(() => ({ selectedWord: { keyword: keyword, relword: relword } })),
  },
}));

// State
export const useSelectedWord = () =>
  selectedWordStore((state) => state.selectedWord);

// Actions
export const useSelectedWordActions = () =>
  selectedWordStore((state) => state.actions);
