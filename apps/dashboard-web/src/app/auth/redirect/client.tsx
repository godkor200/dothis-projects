'use client';

import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import LoginLoadingComponent from '@/components/Auth/LoginLoading';
import { isProduction } from '@/constants/dev';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import { useAuthActions } from '@/store/authStore';
import { convertKeywordsToArray, isHashKeyword } from '@/utils/keyword';

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

  const { data: userData, isLoading: userLoading } = useGetUserInfo();

  useEffect(() => {
    if (!userLoading) {
      if (accessToken && refreshToken) {
        setIsSignedIn(true);
        setIsTokenRequired(false);
        if (isNewUser === 'true' || !userData?.agreePromotion) {
          router.replace('/auth/terms');
          return;
        }
        if (
          !isHashKeyword(convertKeywordsToArray(userData?.personalizationTag))
        ) {
          router.replace('/auth/choose-keyword');
          return;
        }

        router.replace('/contents');
      } else {
        throw new Error('로그인이 정상적으로 진행되지 않았습니다.');
      }
    }
  }, [userLoading]);
  return (
    <>
      {/* 현재 LoadingComponent가 서버 측 redirect로는 나오지않는 이슈가 존재*/}
      <LoginLoadingComponent />

      <h2 className="mt-3 text-center text-2xl font-bold">채널 분석 중</h2>
    </>
  );
};

export default Client;
