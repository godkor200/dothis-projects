import { create } from 'zustand';

interface modalState {
  isModalOpen: boolean;
  isLoadingModalOpen: boolean;
  modalContent: React.ReactNode | null;
  actions: modalAction;
}

interface modalAction {
  setIsModalOpen: (value: boolean) => void;
  setIsLoadingModalOpen: (value: boolean) => void;
  setModalContent: (value: React.ReactNode) => void;
  initializeModal: () => void; // 추가: 초기화 함수
}

export const modalStore = create<modalState>((set) => ({
  isModalOpen: false,
  isLoadingModalOpen: false,
  modalContent: null,
  actions: {
    setIsModalOpen: (value: boolean) => set(() => ({ isModalOpen: value })),
    setIsLoadingModalOpen: (value: boolean) =>
      set(() => ({ isLoadingModalOpen: value })),
    setModalContent: (value: React.ReactNode) =>
      set(() => ({ modalContent: value })),
    initializeModal: () =>
      set(() => ({
        isModalOpen: false,
        modalContent: null,
        isLoadingModalOpen: false,
      })),
  },
}));

// State
export const useIsModalOpen = () => modalStore((state) => state.isModalOpen);
export const useIsLoadingModalOpen = () =>
  modalStore((state) => state.isLoadingModalOpen);

export const useModalContent = () => modalStore((state) => state.modalContent);

// Actions
export const useModalActions = () => modalStore((state) => state.actions);
