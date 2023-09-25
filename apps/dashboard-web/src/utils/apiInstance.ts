import axios from 'axios';

import { HTTP_BASE_URL } from '@/constants/http';

const isServer = typeof window === 'undefined';

export const apiInstance = axios.create({
  baseURL: HTTP_BASE_URL,
  // withCredentials: true,
});

apiInstance.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import('next/headers'),
      token = cookies().get('accessToken')?.value;

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

// accessToken 만료 시 에러핸들링 추가 예정  (verifyToken api 가 현재 미구현)
apiInstance.interceptors.response.use();
