import { dehydrate } from '@tanstack/query-core';
import axios from 'axios';

import { apiServer } from '@/utils/apiServer';

import getQueryClient from '../../query/getQueryClient';
import ReactQueryHydrate from '../../query/ReactQueryHydrate';
import Keyword from './Keyword';

export default async function PostPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['rel'], () =>
    apiServer(1).relwords.getRelWords({
      params: {
        keyword: '손흥민',
      },
    }),
  );
  const dehydratedState = dehydrate(queryClient);

  // const authResponse = await auth.json();
  // console.log(authResponse);

  try {
    const auth = await apiTest.get('/v1/auth/verify-token', {
      withCredentials: true,
    });

    console.log('success');
  } catch (error) {
    console.log('error ');
    console.log(error);
  }
  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Keyword />
    </ReactQueryHydrate>
  );
}

export const HTTP_BASE = 'https://api.dothis.kr';

export const apiTest = axios.create({
  baseURL: HTTP_BASE,
  withCredentials: true,
});

apiTest.interceptors.request.use(async (config) => {
  return config;
});
