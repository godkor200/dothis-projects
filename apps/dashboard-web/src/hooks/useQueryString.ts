import type { Route } from 'next';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const useQueryString = () => {
  const searchParams = useSearchParams();

  const resolveSearchParams = useCallback(
    (route: Route) => {
      const search = searchParams?.toString();
      return `${route}?${search}`;
    },
    [searchParams],
  );

  return searchParams;
};

export default useQueryString;
