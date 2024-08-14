'use client';

import D3Chart from '@/components/common/Charts/D3Chart';
import APIErrorBoundary from '@/components/common/Error/APIErrorBoundary';
import APILoadingBoundary from '@/components/common/Error/APILoadingBoundary';
import useGetRankingRelWords from '@/hooks/react-query/query/useGetRankingRelWords';

import CircleForceChart from './CircleForceChart';

const CircleForceContainer = ({
  baseKeyword,
  relatedKeyword,
}: {
  baseKeyword: string;
  relatedKeyword: string | null;
}) => {
  const { data, isLoading, isError, refetch } =
    useGetRankingRelWords(baseKeyword);

  return (
    <APIErrorBoundary hasError={isError} refetchCallback={refetch}>
      <APILoadingBoundary isLoading={isLoading}>
        <CircleForceChart keyword={baseKeyword} />
        <D3Chart keyword={baseKeyword} />
      </APILoadingBoundary>
    </APIErrorBoundary>
  );
};

export default CircleForceContainer;
