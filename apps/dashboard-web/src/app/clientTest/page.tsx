import { dehydrate } from '@tanstack/query-core';

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

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Keyword />
    </ReactQueryHydrate>
  );
}
