'use client';

import { useRouter } from 'next/navigation';
import { type PropsWithChildren, useEffect } from 'react';

import { useIsSignedIn } from '@/store/authStore';

const LoginTemplate = ({ children }: PropsWithChildren) => {
  // const isSignIn = useIsSignedIn();

  // const router = useRouter();

  // useEffect(() => {
  //   if (isSignIn) {
  //     router.replace('/');
  //   }
  // }, [isSignIn]);

  //로그인이 된 상태에서 해당 페이지의 접근을 막기위해 설계했는데, 임시 주석처리
  return <>{children}</>;
};

export default LoginTemplate;
