import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

type UrlHistoryState = {
  history: string[];
  push(h: UrlHistoryState['history'][number]): void;
  shift(): void;
  clear(): void;
  getLastUrl(): UrlHistoryState['history'][number] | undefined;
  getPrevUrl(): UrlHistoryState['history'][number] | undefined;
};

export const useUrlHistoryStore = create<UrlHistoryState>()(
  immer((set, get) => ({
    history: [],
    getLastUrl() {
      const history = get().history;
      return history[history.length - 1];
    },
    getPrevUrl() {
      const history = get().history;
      return history[history.length - 2];
    },
    push(h) {
      set((state) => {
        state.history.push(h);
      });
    },
    shift() {
      set((state) => {
        state.history.shift();
      });
    },
    clear() {
      set((state) => {
        state.history = [];
      });
    },
  })),
);

export default useUrlHistoryStore;
