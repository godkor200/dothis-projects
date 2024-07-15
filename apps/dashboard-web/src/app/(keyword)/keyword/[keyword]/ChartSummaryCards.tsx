'use client';

import { useSearchRatioFormatterD3 } from '@/hooks/contents/useChartFormatter';
import useGetDailyViewV2 from '@/hooks/react-query/query/useGetDailyViewV2';
1;
import useGetNaverSearchRatio from '@/hooks/react-query/query/useGetNaverSearchRatio';
import useGetVideoUploadCount from '@/hooks/react-query/query/useGetVideoUploadCount';

import ChartSummaryItem from './ChartSummaryItem';
import {
  sumIncreaseViews,
  sumIncreaseViewsV2,
  sumVideoCount,
  sumVideoCountV2,
} from './CompetitionRate';

const ChartSummaryCards = ({
  keyword,
  relatedKeyword,
}: {
  keyword: string;
  relatedKeyword: string | null;
}) => {
  // 조회수 합계 및 영상 수 코드
  //   const dailViewData = useDailyView({ keyword: keyword, relword: keyword });

  const { data: dailyViewData, isLoading: viewsLoading } = useGetDailyViewV2({
    keyword,
    relword: relatedKeyword,
  });

  const { data: videoUploadCount, isLoading: videoLoading } =
    useGetVideoUploadCount({
      keyword,
      relword: relatedKeyword,
    });

  const totalIncreaseViews = sumIncreaseViewsV2(dailyViewData);

  const totalVideoCount = sumVideoCount(dailyViewData);

  //   검색량 코드
  const searchRatio = useSearchRatioFormatterD3({
    keyword: keyword,
    relword: relatedKeyword,
  });

  const { isLoading: searchRatioLoading } = useGetNaverSearchRatio({
    keyword,
    relword: relatedKeyword,
  });

  const first_searchRatio = searchRatio[0];
  const last_searchRatio = searchRatio[searchRatio.length - 1];

  const SummaryList = [
    {
      title: '조회수 합계',
      value: Number(Math.floor(totalIncreaseViews)).toLocaleString('ko-kr'),
    },
    {
      title: '검색량 변동',
      value: searchRatioLoading
        ? '분석중'
        : Math.floor(
            ((((last_searchRatio.value || 0) as number) /
              Number(first_searchRatio.value || 1)) as number) * 100,
          ) -
          100 +
          '%',
    },
    {
      title: '경쟁 영상 수',
      value: Number(totalVideoCount).toLocaleString('ko-kr'),
    },
  ];

  return (
    <div className="flex justify-between">
      {SummaryList.map((item) => (
        <ChartSummaryItem
          title={item.title}
          value={item.value}
          key={item.title}
        />
      ))}
    </div>
  );
};

export default ChartSummaryCards;
