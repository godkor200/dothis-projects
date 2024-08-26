'use client';

import { useSearchCountFormmaterD3 } from '@/hooks/contents/useChartFormatter';
import useGetDailyViewV2 from '@/hooks/react-query/query/useGetDailyViewV2';
1;
import useGetNaverSearchRatio from '@/hooks/react-query/query/useGetNaverSearchRatio';
import useGetVideoUploadCount from '@/hooks/react-query/query/useGetVideoUploadCount';
import { sumSearchCount } from '@/utils/naver-search/common';

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
  // 조회수 합계

  const { data: dailyViewData, isLoading: viewsLoading } = useGetDailyViewV2({
    keyword,
    relword: relatedKeyword,
  });

  const totalIncreaseViews = sumIncreaseViewsV2(dailyViewData);

  // 경쟁 영상 수
  const competitionVideoCount = dailyViewData?.at(-1)?.uniqueVideoCount ?? 0;
  // const totalVideoCount = sumVideoCount(dailyViewData);

  //   검색량 코드
  const searchRatio = useSearchCountFormmaterD3({
    baseKeyword: keyword,
    relatedKeyword: relatedKeyword,
  });

  const { isLoading: searchRatioLoading } = useGetNaverSearchRatio({
    keyword,
    relword: relatedKeyword,
  });

  const totalSearchCount = sumSearchCount(searchRatio);

  const first_searchRatio = searchRatio[0];
  const last_searchRatio = searchRatio[searchRatio.length - 1];
  const changeSearchRatio =
    Math.floor(
      ((((last_searchRatio.value || 0) as number) /
        Number(first_searchRatio.value || 1)) as number) * 100,
    ) -
    100 +
    '%';

  const SummaryList = [
    {
      title: '조회수 합계',
      value: Number(Math.floor(totalIncreaseViews)).toLocaleString('ko-kr'),
    },
    {
      title: '검색량',
      value: totalSearchCount.toLocaleString('ko-kr'),
    },
    {
      title: '경쟁 영상 수',
      value: Number(competitionVideoCount).toLocaleString('ko-kr'),
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
