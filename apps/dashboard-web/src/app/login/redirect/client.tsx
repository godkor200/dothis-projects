'use client';

import { setCookie } from 'cookies-next';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { apiClient } from '@/utils/apiClient';
import { apiInstance } from '@/utils/apiInstance';

const isServer = typeof window === 'undefined';

const isProduction = process.env.NODE_ENV === 'production';

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

  if (!isProduction) {
    Cookies.set('refreshToken', `${refreshToken}`, { domain: 'dothis.kr' });
  }

  // if (!isServer) {
  //   console.log('test');
  //   document.cookie = `refreshToken=${refreshToken}; domain=.dothis.kr; path=/`;
  //   console.log(document.cookie);
  // }

  const { data } = apiClient.auth.getOwnInfo.useQuery(['my']);

  const { data: verify } = apiClient.auth.getVerifyToken.useQuery(['test']);

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
