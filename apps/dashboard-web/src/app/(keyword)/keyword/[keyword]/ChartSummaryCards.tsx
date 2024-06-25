'use client';

import { useSearchRatioFormatterD3 } from '@/hooks/contents/useChartFormatter';
import useGetDailyViewV2 from '@/hooks/react-query/query/useGetDailyViewV2';
1;
import useGetNaverSearchRatio from '@/hooks/react-query/query/useGetNaverSearchRatio';
import useGetVideoUploadCount from '@/hooks/react-query/query/useGetVideoUploadCount';

import {
  sumIncreaseViews,
  sumIncreaseViewsV2,
  sumVideoCount,
  sumVideoCountV2,
} from './CompetitionRate';

const ChartSummaryCards = ({ keyword }: { keyword: string }) => {
  // 조회수 합계 및 영상 수 코드
  //   const dailViewData = useDailyView({ keyword: keyword, relword: keyword });

  const { data: dailyViewData, isLoading: viewsLoading } = useGetDailyViewV2({
    keyword,
    relword: keyword,
  });

  const { data: videoUploadCount, isLoading: videoLoading } =
    useGetVideoUploadCount({
      keyword,
      relword: keyword,
    });
  const totalIncreaseViews = sumIncreaseViewsV2(dailyViewData);

  const totalVideoCount = sumVideoCountV2(videoUploadCount);

  //   검색량 코드
  const searchRatio = useSearchRatioFormatterD3({
    keyword: keyword,
    relword: keyword,
  });

  const { isLoading: searchRatioLoading } = useGetNaverSearchRatio({
    keyword,
    relword: keyword,
  });

  const first_searchRatio = searchRatio[0];
  const last_searchRatio = searchRatio[searchRatio.length - 1];

  return (
    <div className="flex justify-between">
      <div className="w-[222px] px-[12px] py-[15px] text-center">
        <p className="text-grey700 text-[14px]">조회수 합계</p>
        <p className="text-grey900 text-[18px] font-bold">
          {Number(Math.floor(totalIncreaseViews)).toLocaleString('ko-kr')}
        </p>
      </div>
      <div className="w-[222px] px-[12px] py-[15px] text-center">
        <p className="text-grey700 text-[14px]">검색량 변동</p>
        <p className="text-grey900 text-[18px] font-bold">
          {searchRatioLoading
            ? '분석중'
            : Math.floor(
                ((((last_searchRatio.value || 0) as number) /
                  Number(first_searchRatio.value || 1)) as number) * 100,
              ) -
              100 +
              '%'}
        </p>
      </div>
      <div className="w-[222px] px-[12px] py-[15px] text-center">
        <p className="text-grey700 text-[14px]">발행 영상 수</p>
        <p className="text-grey900 text-[18px] font-bold">
          {Number(totalVideoCount).toLocaleString('ko-kr')}
        </p>
      </div>
    </div>
  );
};

export default ChartSummaryCards;
