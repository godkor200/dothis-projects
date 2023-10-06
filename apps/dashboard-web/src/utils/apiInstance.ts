import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { setCookie } from 'cookies-next';

import { isProduction } from '@/constants/dev';

import { apiServer } from './apiServer';
import { isAccessTokenExpired } from './authUtils';

export const HTTP_BASE = '  api.dothis.kr';

const isServer = typeof window === 'undefined';

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

  return config;
});

// 401 코드에 Title을 정해야함, getVerifyToken response 여쭤봐야함.
apiInstance.interceptors.response.use(
  (response: any) => {
    console.log(response.headers);
    return response;
  },
  async (error) => {
    const { data, config: originalRequest } = error.response;
    const statusCode = data.statusCode;

    if (isAccessTokenExpired(statusCode)) {
      const data = await apiServer.auth.getVerifyToken();
      if (!isProduction) {
        /**
         *  현재 해당코드는 백엔드와 response 논의 후 백엔드 적용 시 동작할거임
         */

        setCookie('accessToken', `Bearer ${data.body}`);
      }
      return apiInstance(originalRequest);
    }
    return Promise.reject(error);
  },
);
