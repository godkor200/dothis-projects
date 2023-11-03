import { QueryClient } from '@tanstack/query-core';
import type { QueryKey } from '@tanstack/react-query';
import { dehydrate, type QueryFunction } from '@tanstack/react-query';
import { Hydrate as RQHydrate } from '@tanstack/react-query';
import { cache, type PropsWithChildren } from 'react';

type Props = {
  queryKey: QueryKey;
  queryFn: QueryFunction;
};

const PrefetchHydration = async ({
  queryKey,
  queryFn,
  children,
}: PropsWithChildren<Props>) => {
  const getQueryClient = cache(() => new QueryClient());
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(queryKey, queryFn);
  const dehydratedState = dehydrate(queryClient);

  return <RQHydrate state={dehydratedState}>{children}</RQHydrate>;
};

export default PrefetchHydration;
