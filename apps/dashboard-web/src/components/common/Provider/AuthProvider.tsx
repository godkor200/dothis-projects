'use client';

import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import {
  useAuthActions,
  useIsSignedIn,
  useIsTokenRequired,
} from '@/store/authStore';
import { apiServer } from '@/utils/api/apiServer';
import {
  isRefreshTokenExpired,
  isTokenNotExist,
  isTokenNotMatch,
} from '@/utils/api/authUtils';

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
      /**
       * 임시 주석처리 dev 단계이여서 라우팅을 다 열어두었고, 접근권한에 따른 페이지 절차를 확립이 X
       */
      // router.replace('/');

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

        await apiServer(1).auth.getVerifyToken();

        try {
          const data = await apiServer(1).auth.getOwnInfo();

          if (data.status === 200) {
            if (!data.body.data?.agreePromotion) {
              router.push('/login/terms');
            }
          }
        } catch (error) {
          console.log(error);
        }

        setIsSignedIn(true);
      } catch (error) {
        if (isAxiosError(error)) {
          const err = error;
          const statusCode = err.response?.status as number;
          const errorMessage = err.response?.data.message;

          /**
           * Refresh Token이 만료되었거나 모든 토큰이 존재하지 않을 경우 홈으로 리다이렉트
           */
          if (
            isRefreshTokenExpired(statusCode, errorMessage) ||
            isTokenNotExist(statusCode, errorMessage) ||
            isTokenNotMatch(statusCode, errorMessage)
          ) {
            setIsSignedIn(false);
            setIsTokenRequired(true);
          }
        }
      }
    })();
  }, [isSignedIn, setIsSignedIn, setIsTokenRequired]);

  return <>{children}</>;
}
export default AuthProvider;
