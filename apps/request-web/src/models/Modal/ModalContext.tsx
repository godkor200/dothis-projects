import type { ReactNode } from 'react';
import type { StoreApi } from 'zustand';
import create from 'zustand';
import createContext from 'zustand/context';

interface ModalConfigStore {
  isInnerModal: boolean;
}

const { Provider, useStore } = createContext<StoreApi<ModalConfigStore>>();

const createStore = () =>
  create<ModalConfigStore>()((set) => ({ isInnerModal: true }));

export const ModalOptProvider = ({ children }: { children: ReactNode }) => (
  <Provider createStore={createStore}>{children}</Provider>
);

export const useModalOptStore = () => {
  try {
    const store = useStore();
    return store;
  } catch (e) {
    return { isInnerModal: false };
  }
};
