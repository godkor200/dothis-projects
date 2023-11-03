'use client';

import { useSearchParams } from 'next/navigation';

import SignUp from '@/components/Auth/SignUp';
import Modal from '@/components/common/Modal/AuthModal/AuthModal';
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
          <SignUp />
        </Modal>
      )}
    </AuthProvider>
  );
};

export default RootTemplate;
