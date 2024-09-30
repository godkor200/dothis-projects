'use client';

import { useSearchCountFormmaterD3 } from '@/hooks/contents/useChartFormatter';
import useGetDailyViewV2 from '@/hooks/react-query/query/useGetDailyViewV2';
1;
import useGetDailyExpectedView from '@/hooks/react-query/query/useGetDailyExpectedView';
import useGetNaverSearchRatio from '@/hooks/react-query/query/useGetNaverSearchRatio';
import { sumSearchCount } from '@/utils/naver-search/common';

import ChartSummaryItem from './ChartSummaryItem';
import { sumIncreaseViewsV2 } from './CompetitionRate';

const ChartSummaryCards = ({
  keyword,
  relatedKeyword,
  expectedViews,
}: {
  keyword: string;
  relatedKeyword: string | null;
  expectedViews?: boolean;
}) => {
  const dailyVeiwEnabled = !expectedViews;

  const dailyViewWithExpectedViewEnabled = expectedViews;

  // 조회수 합계

  const { data: dailyViewData, isLoading: dailyViewLoading } =
    useGetDailyViewV2(
      {
        keyword,
        relword: relatedKeyword,
      },
      { enabled: dailyVeiwEnabled },
    );

  const { data: viewsData, isLoading: viewsLoading } = useGetDailyExpectedView(
    {
      baseKeyword: keyword,
      relatedKeyword: relatedKeyword,
    },
    { enabled: dailyViewWithExpectedViewEnabled },
  );

  const baseData = expectedViews ? viewsData?.data[0].data : dailyViewData;

  const totalIncreaseViews = sumIncreaseViewsV2(baseData);

  // 경쟁 영상 수
  const competitionVideoCount = baseData?.at(-1)?.uniqueVideoCount ?? 0;
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
      title: '주간 조회수 합계',
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
