import type React from 'react';
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { ModalProps } from '@/components/ui/Modal';

export interface ModalItem {
  Component: React.ComponentType;
  modalOpt?: Omit<ModalProps, 'children' | 'isOpen' | 'onClose' | 'title'>;
  title?: ModalProps['title'];
}

type ModalKey = string;
export type ModalMap = Map<ModalKey, ModalItem>;

export type ModalState = {
  modals: ModalMap;
  get(key: ModalKey): ModalItem | undefined;
  open(key: ModalKey, data: ModalItem): void;
  close(key: ModalKey): void;
  closeLast(): void;
  closeAll(): void;
};

export const useModalStore = create<ModalState>()(
  immer((set, get) => ({
    modals: new Map(),
    get(key) {
      return get().modals.get(key);
    },
    open(key: ModalKey, data: ModalItem) {
      set((state) => {
        state.modals.set(key, data);
      });
    },

    close(key) {
      set((state) => {
        state.modals.delete(key);
      });
    },
    closeLast() {
      set((state) => {
        const lastKey = [...state.modals.keys()].pop();
        if (lastKey) {
          state.modals.delete(lastKey);
        }
      });
    },

    closeAll() {
      set((state) => {
        state.modals.clear();
      });
    },
  })),
);
