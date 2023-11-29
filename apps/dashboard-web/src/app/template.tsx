'use client';

import { useSearchParams } from 'next/navigation';

import Modal from '@/components/common/Modal/Modal';
import SignUpModal from '@/components/common/Modal/ModalContent/SignUpModal';
import AuthProvider from '@/components/common/Provider/AuthProvider';
import { useIsOpenSignUpModal } from '@/store/authStore';

const RootTemplate = ({ children }: StrictPropsWithChildren) => {
  const isOpenSignUpModal = useIsOpenSignUpModal();
  const searchParams = useSearchParams();

  return (
    <AuthProvider>
      {children}
      {searchParams?.get('steps') === 'signUp' && isOpenSignUpModal && (
        <Modal>
          <SignUpModal />
        </Modal>
      )}
    </AuthProvider>
  );
};

export default RootTemplate;
