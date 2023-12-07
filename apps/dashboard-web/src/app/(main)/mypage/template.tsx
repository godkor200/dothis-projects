'use client';

import { useRouter } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { useIsSignedIn, useIsTokenRequired } from '@/store/authStore';
import { useStartDate } from '@/store/dateStore';

const MyPageTemplate = ({ children }: PropsWithChildren) => {
  const isSignIn = useIsSignedIn();

  const isTokenRequired = useIsTokenRequired();

  const router = useRouter();

  const startDate = useStartDate();

  console.log(startDate);

  useEffect(() => {
    if (!isSignIn) {
      if (isTokenRequired) {
        router.replace('/');
      }
    }
  }, [isSignIn, isTokenRequired]);

  return <>{children}</>;
};

export default MyPageTemplate;
