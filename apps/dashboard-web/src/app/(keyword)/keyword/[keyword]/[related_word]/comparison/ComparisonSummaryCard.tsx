import Link from 'next/link';

import { GUEST_AVERAGEVIEW } from '@/constants/guest';
import { useSearchCountFormmaterD3 } from '@/hooks/contents/useChartFormatter';
import useGetDailyExpectedView from '@/hooks/react-query/query/useGetDailyExpectedView';
import useGetNaverSearchRatio from '@/hooks/react-query/query/useGetNaverSearchRatio';
import useGetUserChannelData from '@/hooks/react-query/query/useGetUserChannelData';
import type { TKeywords } from '@/types/common';
import { cn } from '@/utils/cn';
import {
  convertCompetitionFormat,
  convertCompetitionScoreFormatToHTML,
  getCompetitionScore,
} from '@/utils/contents/competitionScore';
import { sumSearchCount } from '@/utils/naver-search/common';

import { sumIncreaseViewsV2, sumVideoCount } from '../../CompetitionRate';

type Color = 'blue' | 'green' | 'red';
interface Props {
  rank: string | number;
  color: Color;
  index: number;
  selectSize: number;
}

const ComparisonSummaryCard = ({
  baseKeyword,
  relatedKeyword,
  color,
  index,
  rank,
  selectSize,
}: TKeywords & Props) => {
  const { data: dailyViewData, isLoading: viewsLoading } =
    useGetDailyExpectedView({
      baseKeyword: baseKeyword,
      relatedKeyword: relatedKeyword,
    });

  const { data: userChannelData, isLoading: userChannelIsLoading } =
    useGetUserChannelData();

  const maxExpectedHits = dailyViewData?.data
    ? Math.max(...dailyViewData.data[0].data.map((item) => item.expectedHits))
    : 1;

  const predictedView =
    userChannelData?.data.averageViews ??
    GUEST_AVERAGEVIEW * (maxExpectedHits ? maxExpectedHits : 1);

  const totalIncreaseViews = sumIncreaseViewsV2(dailyViewData?.data[0].data);

  const competitionVideoCount =
    dailyViewData?.data[0].data.at(-1)?.uniqueVideoCount ?? 0;
  // const totalVideoCount = sumVideoCount(dailyViewData?.data.data);

  //   검색량 코드
  const searchRatio = useSearchCountFormmaterD3({
    baseKeyword: baseKeyword,
    relatedKeyword: relatedKeyword,
  });

  const { isLoading: searchRatioLoading } = useGetNaverSearchRatio({
    keyword: baseKeyword,
    relword: relatedKeyword,
  });

  const totalSearchCount = sumSearchCount(searchRatio);

  const first_searchRatio = searchRatio[0];
  const last_searchRatio = searchRatio[searchRatio.length - 1];

  const copetitionScore = getCompetitionScore({
    totalDailyView: totalIncreaseViews,
    videoCount: competitionVideoCount,
  });
  const competitionConfig = convertCompetitionFormat({
    competitionScore: copetitionScore,
    totalDailyView: totalIncreaseViews,
    videoCount: competitionVideoCount,
  });

  return (
    <div
      className={cn(
        ' grid grid-cols-[40px_minmax(180px,1fr)_repeat(2,110px)_repeat(3,100px)_minmax(140px,1fr)] items-center gap-[10px] text-center text-[14px] text-grey900 font-[500]  border-b-2 border-grey200',
        {
          'bg-[#d2ffef]': color === 'green',
          'bg-[#d7dbfa]': color === 'blue',
          'bg-primary100': color === 'red',
          'border-0': index === selectSize - 1,
        },
      )}
      key={index}
    >
      <p>{rank}</p>
      <p>{relatedKeyword}</p>
      <p>{predictedView.toFixed(0)}</p>
      <p>{Number(Math.floor(totalIncreaseViews)).toLocaleString('ko-kr')}</p>
      <p>{Number(competitionVideoCount).toLocaleString('ko-kr')}</p>
      <p>{totalSearchCount}</p>
      <div>
        {' '}
        <span
          style={{
            color: competitionConfig.color,
            backgroundColor: competitionConfig.backgroundColor,
          }}
          className="rounded-8 px-[10px] py-[6px]"
        >
          {competitionConfig.content}
        </span>
      </div>
      <Link href={`/keyword/${baseKeyword}/${relatedKeyword}/analysis`}>
        <button className="rounded-8 border-primary500 bg-primary50 text-primary500 h-[32px] w-[88px]  border text-[14px] font-[500]">
          자세히
        </button>
      </Link>
    </div>
  );
};

export default ComparisonSummaryCard;
