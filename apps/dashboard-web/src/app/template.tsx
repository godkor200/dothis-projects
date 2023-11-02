'use client';

import { useSearchParams } from 'next/navigation';

import Modal from '@/components/common/Modal/AuthModal/AuthModal';
import SignUp from '@/components/Auth/SignUp';
import { useIsOpenSignUpModal } from '@/store/authStore';
import AuthProvider from '@/components/common/Provider/AuthProvider';

const RootTemplate = ({ children }: StrictPropsWithChildren) => {
  const isOpenSignUpModal = useIsOpenSignUpModal();
  const searchParams = useSearchParams();

  return (
    <AuthProvider>
      {children}
      {searchParams?.get('steps') === 'signUp' && isOpenSignUpModal && (
        <Modal>
          <SignUp />
        </Modal>
      )}
    </AuthProvider>
  );
};

export default RootTemplate;
