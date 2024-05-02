'use client';

import './styles.css';

import * as Dialog from '@radix-ui/react-dialog';
import { useSearchParams } from 'next/navigation';

import SignUpModal from '@/components/common/Modal/ModalContent/SignUpModal';
import AuthProvider from '@/components/common/Provider/AuthProvider';
import { useIsOpenSignUpModal } from '@/store/authStore';
import {
  useIsLoadingModalOpen,
  useIsModalOpen,
  useModalActions,
  useModalContent,
} from '@/store/modalStore';

const RootTemplate = ({ children }: StrictPropsWithChildren) => {
  const isOpenSignUpModal = useIsOpenSignUpModal();
  const searchParams = useSearchParams();

  const ModalDialog = Dialog;
  const LoadingDialog = Dialog;

  const isModal = useIsModalOpen();
  const isLoadingModal = useIsLoadingModalOpen();

  const content = useModalContent();
  const { setIsModalOpen } = useModalActions();

  return (
    <AuthProvider>
      <LoadingDialog.Root open={isLoadingModal}>
        <ModalDialog.Root open={isModal} onOpenChange={setIsModalOpen}>
          {children}

          <ModalDialog.Portal>
            <ModalDialog.Overlay className="DialogOverlay outline-0">
              <ModalDialog.Content className="DialogContent outline-0">
                {content}
              </ModalDialog.Content>
            </ModalDialog.Overlay>
          </ModalDialog.Portal>

          <LoadingDialog.Portal>
            <LoadingDialog.Overlay className="DialogOverlay outline-0">
              <LoadingDialog.Content className="DialogContent outline-0">
                {content}
              </LoadingDialog.Content>
            </LoadingDialog.Overlay>
          </LoadingDialog.Portal>
        </ModalDialog.Root>
      </LoadingDialog.Root>
    </AuthProvider>
  );
};

export default RootTemplate;
