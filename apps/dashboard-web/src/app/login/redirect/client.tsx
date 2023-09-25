'use client';

import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { apiClient } from '@/utils/apiClient';
import { apiInstance } from '@/utils/apiInstance';

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

  setCookie('accessToken', `Bearer ${accessToken}`);
  setCookie('refreshToken', `Bearer ${refreshToken}`);

  const { data } = apiClient.auth.getOwnInfo.useQuery(['my']);

  useEffect(() => {
    if (accessToken && refreshToken) {
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
