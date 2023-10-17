'use client';

import { setCookie } from 'cookies-next';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { isProduction } from '@/constants/dev';
import { useAuthActions } from '@/store/authStore';
import { apiClient } from '@/utils/apiClient';
import { isHashKeyword } from '@/utils/isHashKeyword';

const isServer = typeof window === 'undefined';

// 추 후 그냥 dev단계 컴포넌트(token 관리)를 새로 생성예정

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
  const { setIsSignedIn, setIsTokenRequired } = useAuthActions();

  if (!isProduction && accessToken) {
    setCookie('accessToken', `Bearer ${accessToken}`);
  }

  const { data: userData, isLoading: userLoading } = apiClient(
    1,
  ).auth.getOwnInfo.useQuery(['user']);

  const { data: keyword, isLoading: keywordLoading } = apiClient(
    2,
  ).user.getUserKeyword.useQuery(['keyword']);

  useEffect(() => {
    if (!userLoading && !keywordLoading) {
      if (accessToken && refreshToken) {
        setIsSignedIn(true);
        setIsTokenRequired(false);
        if (isNewUser === 'true' || !userData?.body.data.argeePromotion) {
          router.replace('/login/terms');
          return;
        }
        if (
          isHashKeyword(keyword?.body.data[0].channel_keywords) &&
          isHashKeyword(keyword?.body.data[0].channel_tags)
        ) {
          router.replace('/login/choose-keyword');
          return;
        }

        router.replace('/contents');
      } else {
        throw new Error('로그인이 정상적으로 진행되지 않았습니다.');
      }
    }
  }, [userLoading, keywordLoading]);
  return <></>;
};

export default Client;
