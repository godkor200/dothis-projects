'use client';

import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { isProduction } from '@/constants/dev';
import { useAuthActions } from '@/store/authStore';
import { apiClient } from '@/utils/apiClient';

const isServer = typeof window === 'undefined';

const Client = ({
  accessToken,
  refreshToken,
  isNewUser,
}: {
  accessToken: string | string[] | undefined;
  refreshToken: string | string[] | undefined;
  isNewUser: string | string[] | undefined;
}) => {
  const router = useRouter();
  const { setIsSignedIn } = useAuthActions();

  if (!isProduction && accessToken) {
    setCookie('accessToken', `Bearer ${accessToken}`);
  }

  const { data: verify } = apiClient.auth.getVerifyToken.useQuery(['test']);

  console.log(verify);

  useEffect(() => {
    if (accessToken && refreshToken) {
      setIsSignedIn(true);
      if (isNewUser) {
        router.replace('/login/choose-keyword');
      } else {
        router.replace('/chart');
      }
    } else {
      throw new Error('로그인이 정상적으로 진행되지 않았습니다.');
    }
  }, []);
  return <></>;
};

export default Client;
