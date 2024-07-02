'use client';

import { useEffect } from 'react';

import LoginFrame from '@/components/Auth/LoginFrame';
import Modal from '@/components/common/Modal/Modal';
import { useModalActions } from '@/store/modalStore';

const Page = () => {
  const { setIsRouterModalOpen, setModalContent } = useModalActions();

  useEffect(() => {
    setIsRouterModalOpen(true);

    setModalContent(<LoginFrame hasDismissButton />);
  }, []);
  return null;
};

export default Page;
