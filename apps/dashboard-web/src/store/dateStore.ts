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

/**
 * query hook에서 사용하는 날짜로 보내주는 query를 전역상태로 관리하기위해 생성하였습니다.
 * 추 후 캘린더 형식으로 날짜를 커스텀할 수도 있기때문에 이렇게 setter가 가능한 전역상태로 작성하였습니다
 */
export const dateStore = create<DateState>((set) => ({
  startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
  // startDate: '2024-01-17',
  endDate: dayjs().subtract(0, 'day').format('YYYY-MM-DD'),
  // endDate: '2024-01-23',

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
