'use client';

import './styles.css';

import * as Dialog from '@radix-ui/react-dialog';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';

import SignUpModal from '@/components/common/Modal/ModalContent/SignUpModal';
import AuthProvider from '@/components/common/Provider/AuthProvider';
import { useIsOpenSignUpModal } from '@/store/authStore';
import {
  useIsLoadingModalOpen,
  useIsModalOpen,
  useIsRouterModalOpen,
  useModalActions,
  useModalContent,
} from '@/store/modalStore';

const RootTemplate = ({ children }: StrictPropsWithChildren) => {
  const BasicDialog = Dialog;
  const LoadingDialog = Dialog;
  const RouterDialog = Dialog;

  const isModalOpen = useIsModalOpen();
  const isLoadingModal = useIsLoadingModalOpen();

  const isRouterModalOpen = useIsRouterModalOpen();

  const content = useModalContent();
  const { initializeModal } = useModalActions();

  const router = useRouter();

  return (
    <AuthProvider>
      {children}

      <BasicDialog.Root
        open={React.useMemo(() => isModalOpen, [isModalOpen])}
        onOpenChange={initializeModal}
        key={'BasicDialog'}
      >
        <BasicDialog.Portal>
          <BasicDialog.Overlay className="DialogOverlay outline-0">
            <BasicDialog.Content className="DialogContent outline-0">
              {content}
            </BasicDialog.Content>
          </BasicDialog.Overlay>
        </BasicDialog.Portal>
      </BasicDialog.Root>

      <LoadingDialog.Root
        open={React.useMemo(() => isLoadingModal, [isLoadingModal])}
        key={'LoadingDialog'}
      >
        <LoadingDialog.Portal>
          <LoadingDialog.Overlay className="DialogOverlay outline-0">
            <LoadingDialog.Content className="DialogContent outline-0">
              {content}
            </LoadingDialog.Content>
          </LoadingDialog.Overlay>
        </LoadingDialog.Portal>
      </LoadingDialog.Root>

      <RouterDialog.Root
        open={React.useMemo(() => isRouterModalOpen, [isRouterModalOpen])}
        onOpenChange={() => {
          initializeModal();
          router.back();
        }}
        key={'RouterDialog'}
      >
        <RouterDialog.Portal>
          <RouterDialog.Overlay className="DialogOverlay outline-0">
            <RouterDialog.Content className="DialogContent outline-0">
              {content}
            </RouterDialog.Content>
          </RouterDialog.Overlay>
        </RouterDialog.Portal>
      </RouterDialog.Root>
    </AuthProvider>
  );
};

export default RootTemplate;
