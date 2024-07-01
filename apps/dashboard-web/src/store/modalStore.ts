import { create } from 'zustand';

interface modalState {
  isModalOpen: boolean;
  isLoadingModalOpen: boolean;
  isRouterModalOpen: boolean;
  modalContent: React.ReactNode | null;
  actions: modalAction;
}

interface modalAction {
  setIsModalOpen: (value: boolean) => void;
  setIsLoadingModalOpen: (value: boolean) => void;
  setIsRouterModalOpen: (value: boolean) => void;
  setModalContent: (value: React.ReactNode) => void;
  initializeModal: () => void; // 추가: 초기화 함수
}

export const modalStore = create<modalState>((set) => ({
  isModalOpen: false,
  isLoadingModalOpen: false,
  isRouterModalOpen: false,
  modalContent: null,
  actions: {
    setIsModalOpen: (value: boolean) => set(() => ({ isModalOpen: value })),
    setIsLoadingModalOpen: (value: boolean) =>
      set(() => ({ isLoadingModalOpen: value })),
    setIsRouterModalOpen: (value: boolean) =>
      set(() => ({ isRouterModalOpen: value })),
    setModalContent: (value: React.ReactNode) =>
      set(() => ({ modalContent: value })),
    initializeModal: () =>
      set(() => ({
        isModalOpen: false,
        modalContent: null,
        isLoadingModalOpen: false,
        isRouterModalOpen: false,
      })),
  },
}));

// State
export const useIsModalOpen = () => modalStore((state) => state.isModalOpen);
export const useIsLoadingModalOpen = () =>
  modalStore((state) => state.isLoadingModalOpen);
export const useIsRouterModalOpen = () =>
  modalStore((state) => state.isRouterModalOpen);

export const useModalContent = () => modalStore((state) => state.modalContent);

// Actions
export const useModalActions = () => modalStore((state) => state.actions);
