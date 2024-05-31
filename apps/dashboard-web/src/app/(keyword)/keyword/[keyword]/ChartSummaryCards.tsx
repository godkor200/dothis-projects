'use client';

import {
  useDailyView,
  useSearchRatioFormatterD3,
} from '@/hooks/contents/useChartFormatter';
import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';

import { sumIncreaseViews, sumVideoCount } from './CompetitionRate';

const ChartSummaryCards = ({ keyword }: { keyword: string }) => {
  // 조회수 합계 및 영상 수 코드
  //   const dailViewData = useDailyView({ keyword: keyword, relword: keyword });

  const { data: dailyViewData } = useGetDailyView({
    keyword,
    relword: keyword,
  });

  const totalIncreaseViews = sumIncreaseViews(dailyViewData);

  const totalVideoCount = sumVideoCount(dailyViewData);

  //   검색량 코드

  const searchRatio = useSearchRatioFormatterD3({
    keyword: keyword,
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
          {Math.floor(
            ((((last_searchRatio.value || 0) as number) /
              Number(first_searchRatio.value || 1)) as number) *
              100 *
              100,
          ) / 100}
          %
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
