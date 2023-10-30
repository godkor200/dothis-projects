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

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Keyword />
    </ReactQueryHydrate>
  );
}
