'use client';

import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

import {
  useAuthActions,
  useIsSignedIn,
  useIsTokenRequired,
} from '@/store/authStore';
import { apiInstance } from '@/utils/apiInstance';
import { apiServer } from '@/utils/apiServer';
import { isRefreshTokenExpired, isTokenNotExist } from '@/utils/authUtils';

/**
 *  해당 AuthProvider는 자동로그인을 위한 template입니다
 *  추 후 로그인이 필요한 라우팅의 경우 다른 Provider로 template에 삽입할 것입니다.
 */
function AuthProvider({ children }: StrictPropsWithChildren) {
  const router = useRouter();
  const isSignedIn = useIsSignedIn();
  const isTokenRequired = useIsTokenRequired();
  const { setIsSignedIn, setIsTokenRequired } = useAuthActions();

  useEffect(() => {
    if (isSignedIn) return;
    /**
     * 토큰이 없는 경우 홈으로 리다이렉트
     */
    if (isTokenRequired) {
      router.replace('/');

      return;
    }
  }, [isSignedIn, isTokenRequired, router]);

  useEffect(() => {
    if (isSignedIn) return;

    (async () => {
      try {
        /**
         * Access Token이 존재하지 않을 경우 재발급
         */
        await apiServer.auth.getVerifyToken();

        setIsSignedIn(true);
      } catch (error) {
        if (isAxiosError(error)) {
          const err = error;
          const statusCode = err.response?.status as number;
          const errorData = err.response?.data.data;
          const title = errorData?.title as string;

          /**
           * Refresh Token이 만료되었거나 모든 토큰이 존재하지 않을 경우 홈으로 리다이렉트
           */
          if (
            isRefreshTokenExpired(statusCode, title) ||
            isTokenNotExist(statusCode, title)
          ) {
            setIsTokenRequired(true);
          }
        }
      }
    })();
  }, [isSignedIn, setIsSignedIn, setIsTokenRequired]);

  return <>{children}</>;
}
export default AuthProvider;
