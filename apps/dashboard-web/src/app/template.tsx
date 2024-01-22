'use client';

import './styles.css';

import * as Dialog from '@radix-ui/react-dialog';
import { useSearchParams } from 'next/navigation';

import Modal from '@/components/common/Modal/Modal';
import SignUpModal from '@/components/common/Modal/ModalContent/SignUpModal';
import AuthProvider from '@/components/common/Provider/AuthProvider';
import { useIsOpenSignUpModal } from '@/store/authStore';
import {
  useModalActions,
  useModalContent,
  useModalOpen,
} from '@/store/modalStore';

const RootTemplate = ({ children }: StrictPropsWithChildren) => {
  const isOpenSignUpModal = useIsOpenSignUpModal();
  const searchParams = useSearchParams();

  const modal = useModalOpen();
  const content = useModalContent();
  const { setModalOpen } = useModalActions();

  return (
    <AuthProvider>
      <Dialog.Root open={modal} onOpenChange={setModalOpen}>
        {children}
        {searchParams?.get('steps') === 'sign_up' && isOpenSignUpModal && (
          <Modal>
            <SignUpModal />
          </Modal>
        )}
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay">
            <Dialog.Content className="DialogContent">{content}</Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </AuthProvider>
  );
};

export default RootTemplate;
