import { create } from 'zustand';

interface GuestKeywordAction {
  setAddKeyword: (value: string) => void;
  setRemoveKeyword: (value: string) => void;
}

interface GuestKeywordState {
  keyword: Set<string>;
  actions: GuestKeywordAction;
}

export const guestKeywordStore = create<GuestKeywordState>((set) => ({
  keyword: new Set([]),
  actions: {
    setAddKeyword: (value: string) =>
      set((prev) => ({ keyword: new Set([...prev.keyword.add(value)]) })),
    setRemoveKeyword: (value: string) =>
      set((prev) => ({
        keyword: new Set(
          [...prev.keyword].filter((keyword) => keyword !== value),
        ),
      })),
  },
}));

// State
export const useGuestKeyword = () =>
  guestKeywordStore((state) => state.keyword);

// Actions
export const useGuestKeywordActions = () =>
  guestKeywordStore((state) => state.actions);
