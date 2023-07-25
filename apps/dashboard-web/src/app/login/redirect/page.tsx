'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const RedirectPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/login/choose-keyword');
  }, []);
};

export default RedirectPage;
