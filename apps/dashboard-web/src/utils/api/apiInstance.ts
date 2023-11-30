import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { setCookie } from 'cookies-next';

import { isProduction, isServer } from '@/constants/dev';
import { authStore } from '@/store/authStore';

import { apiServer } from './apiServer';
import {
  isAccessTokenExpired,
  isRefreshTokenExpired,
  isTokenNotExist,
  isTokenNotMatch,
} from './authUtils';

export const HTTP_BASE = '  api.dothis.kr';

export const apiInstance = axios.create({
  baseURL: HTTP_BASE,
  withCredentials: true,
});

apiInstance.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import('next/headers');
    const token = cookies().get('accessToken')?.value;

    if (token) {
      config.headers.Authorization = `${token}`;
    }
  } else {
    const { getCookie } = await import('cookies-next');

    const token = getCookie('accessToken');

    if (token) {
      config.headers.Authorization = `${token}`;
    }
  }

  config.headers['X-Client-Environment'] = isProduction
    ? 'production'
    : 'local';

  return config;
});

/**
 *  interceptor getVerifyToken api 서버 오류 시 무한 재귀를 대응하기위한 count 변수
 * */
let count = 0;

// 401 코드에 Title을 정해야함, getVerifyToken response 여쭤봐야함.
apiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    /**
     * 현재 해당 response 마다 authorization을 체크해서 cookie를 갱신하는 코드가 추가되었다. (ts-Rest query 내에서 headers를 response로 못받는갑다)
     */

    function setDocumentCookie(cname: string, cvalue: string) {
      const domain = '.dothis.kr';
      document.cookie =
        cname + '=' + cvalue + ';' + ';path=/;' + 'domain=' + domain + ';';
    }
    if (response.headers['authorization'] && isProduction) {
      setDocumentCookie('accessToken', response.headers['authorization']);
    }

    if (response.headers['authorization'] && !isProduction) {
      setCookie('accessToken', response.headers['authorization']);
    }

    return response;
  },
  async (error) => {
    count += 1;

    if (count > 1) {
      count = 0;
      return Promise.reject(error);
    }

    const { data, config: originalRequest } = error.response;
    const statusCode = data.statusCode;
    const errorMessage = data.message;

    if (isAccessTokenExpired(statusCode)) {
      await apiServer(1).auth.getVerifyToken();

      // 여기에 있는 getVerifyToke header data로 이쪽에서 cookie갱신을 하려했지만, ts-rest 형식이 headers는 추가가 안되는거 같다..
      if (!isProduction) {
        /**
         *  현재 해당코드는 백엔드와 response 논의 후 백엔드 적용 시 동작할거임
         */
        // setCookie('accessToken', `Bearer ${data}`);
      }

      // if(isServer) {
      //   return  apiInstance({...originalRequest,headers})
      // ts-rest에서 return data 에 header가 없어서 여기 부분 (isServer에서 request에 Authorization 삽입)이 힘듬
      // }

      return apiInstance(originalRequest);
    }

    /**
     * 해당 if 절 앞단 true는 백엔드와 Error Text 협의 후 제거 예정
     */
    if (
      isRefreshTokenExpired(statusCode, errorMessage) ||
      isTokenNotExist(statusCode, errorMessage) ||
      isTokenNotMatch(statusCode, errorMessage)
    ) {
      const { setIsTokenRequired, setIsSignedIn } =
        authStore.getState().actions;
      setIsSignedIn(false);
      setIsTokenRequired(true);
    }

    return Promise.reject(error);
  },
);
