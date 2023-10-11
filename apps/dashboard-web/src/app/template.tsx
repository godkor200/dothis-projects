'use client';

import { useSearchParams } from 'next/navigation';

import Modal from '@/components/common/Modal/AuthModal/Modal';
import SignUpContents from '@/components/common/Modal/AuthModal/SignUpContents';
import AuthProvider from '@/components/feature/AuthProvider';
import { useIsOpenSignUpModal } from '@/store/authStore';

const RootTemplate = ({ children }: StrictPropsWithChildren) => {
  const isOpenSignUpModal = useIsOpenSignUpModal();

  const searchParams = useSearchParams();

  return (
    <AuthProvider>
      {children}
      {searchParams?.get('steps') === 'signUp' && isOpenSignUpModal && (
        <Modal>
          <SignUpContents />
        </Modal>
      )}
    </AuthProvider>
  );
};

export default RootTemplate;
