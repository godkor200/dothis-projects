import dayjs from 'dayjs';
import { create } from 'zustand';

interface DateAction {
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
}

interface DateState {
  startDate: string;
  endDate: string;
  actions: DateAction;
}

export const dateStore = create<DateState>((set) => ({
  startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
  endDate: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
  actions: {
    setStartDate: (value: string) => set(() => ({ startDate: value })),
    setEndDate: (value: string) => set(() => ({ endDate: value })),
  },
}));

// State
export const useStartDate = () => dateStore((state) => state.startDate);
export const useEndDate = () => dateStore((state) => state.endDate);

// Actions
export const useDateActions = () => dateStore((state) => state.actions);
