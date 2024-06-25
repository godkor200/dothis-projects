'use client';

import { useState } from 'react';

import ApiErrorComponent from '@/components/common/Charts/ApiErrorComponent ';
import D3Axis from '@/components/common/Charts/D3Axis';
import useGetDailyViewV2 from '@/hooks/react-query/query/useGetDailyViewV2';
import useGetNaverSearchRatio from '@/hooks/react-query/query/useGetNaverSearchRatio';
import useGetVideoUploadCount from '@/hooks/react-query/query/useGetVideoUploadCount';
import { cn } from '@/utils/cn';

import BoxLoadingComponent from '../BoxLoadingComponent';
import ChartSummaryCards from './ChartSummaryCards';

const ChartContainer = ({ keyword }: { keyword: string }) => {
  const [errorCount, setErrorCount] = useState(0);

  const {
    isLoading: dailyViewLoading,
    isError: dailyViewError,

    refetch: dailViewRefetch,
  } = useGetDailyViewV2({
    keyword: keyword,
    relword: keyword,
  });

  const {
    isLoading: naverSearchLoading,
    isError: naverSearchError,
    refetch: naverSearchRefetch,
  } = useGetNaverSearchRatio({
    keyword: keyword,
    relword: keyword,
  });

  const {
    isLoading: videoLoading,
    isError: videoError,
    refetch: videoRefetch,
  } = useGetVideoUploadCount({
    keyword: keyword,
    relword: keyword,
  });

  const refetchCallback = () => {
    if (dailyViewError) dailViewRefetch();
    if (naverSearchError) naverSearchRefetch();
    if (videoError) videoRefetch();

    setErrorCount((prev) => prev + 1);
  };

  if (errorCount > 3 && (dailyViewError || naverSearchError || videoError)) {
    return (
      <div className="flex flex-1 items-center justify-center text-center text-[20px] font-bold">
        <h2>
          데이터를 불러오는 데 문제가 발생했습니다.
          <br />
          빠른 시일에 문제를 해결하도록 하겠습니다.
          <br />
          이용에 불편을 드려 죄송합니다.
        </h2>
      </div>
    );
  }

  if (dailyViewError || naverSearchError || videoError) {
    return <ApiErrorComponent refetch={refetchCallback} />;
  }

  if (dailyViewLoading || naverSearchLoading || videoLoading) {
    return (
      <BoxLoadingComponent
        classname={cn('absolute top-0 right-3 w-[80px] h-[80px]')}
      />
    );
  }

  return (
    <>
      <ChartSummaryCards keyword={keyword} />
      <D3Axis keyword={keyword} />
    </>
  );
};

export default ChartContainer;
