'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import MembershipModalFrame from '@/components/Membership/MembershipModalFrame';
import { useModalActions } from '@/store/modalStore';

const Page = () => {
  const { setIsRouterModalOpen, setModalContent } = useModalActions();

  const router = useRouter();

  useEffect(() => {
    setIsRouterModalOpen(true);

    setModalContent(<MembershipModalFrame hasDismissButton />);
  }, []);
  return null;
};

export default Page;
