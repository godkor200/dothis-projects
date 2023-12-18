import { useMemo } from 'react';

import type { ResponseType, VideoCount } from '@/constants/convertText';
import { CONVERT_SUBSCRIBERANGE } from '@/constants/convertText';
import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import useGetExpectedView from '@/hooks/react-query/query/useGetExpectedView';
import useGetRelWords from '@/hooks/react-query/query/useGetRelWords';
import useGetVideoCount from '@/hooks/react-query/query/useGetVideoCount';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { cn } from '@/utils/cn';
import {
  averageViews,
  formatToLineGraph,
  sumViews,
} from '@/utils/contents/dailyview';

interface Props {
  keyword: string;
  relword: string;
  index: number;
  arr: {
    relword: string;
    keyword: string;
  }[];
}

const RelationWord = ({ keyword, relword, index, arr }: Props) => {
  // const { data: relword } = useGetRelWords(keyword);

  const { data: dailyViewData } = useGetDailyView({
    keyword: keyword,
    relword: relword,
  });

  const startDate = useStartDate();
  const endDate = useEndDate();

  const dailyViewChartData = useMemo(
    () =>
      formatToLineGraph(
        sumViews(dailyViewData.flat(), { startDate, endDate }),
        '일일 조회 수',
      ),
    [dailyViewData],
  );

  const lastDailyView = dailyViewChartData[0].data.at(-1)?.y;

  const { data: expectedViewData } = useGetExpectedView({
    keyword: keyword,
    relword: relword,
  });

  const expectedViewChartData = useMemo(
    () =>
      formatToLineGraph(
        averageViews(expectedViewData.flat(), { startDate, endDate }),
        '기대 조회 수',
      ),
    [expectedViewData],
  );

  const lastExpectedView = expectedViewChartData[0].data.at(-1)?.y;

  const { data: videoCountData } = useGetVideoCount({
    keyword: keyword,
    relword: relword,
  });

  const { totalCount, videoCountViewChartData } = useMemo(
    () =>
      videoCountData.reduce<{
        totalCount: number;
        videoCountViewChartData: ResponseType;
      }>(
        (acc, dataItem) => {
          acc.totalCount += dataItem?.videoTotal || 0;
          dataItem?.section.forEach((sectionItem) => {
            const key = sectionItem.section;

            if (key in CONVERT_SUBSCRIBERANGE) {
              const existingRange = CONVERT_SUBSCRIBERANGE[key as VideoCount];
              const existingItem =
                acc.videoCountViewChartData[key as VideoCount];

              if (existingItem) {
                existingItem.value += sectionItem.number;
              } else {
                acc.videoCountViewChartData[key as VideoCount] = {
                  id: existingRange,
                  label: existingRange,
                  value: sectionItem.number,
                };
              }
            }
          });

          return acc;
        },
        { totalCount: 0, videoCountViewChartData: {} } as {
          totalCount: number;
          videoCountViewChartData: ResponseType;
        },
      ),
    [videoCountData],
  );

  console.log(totalCount);
  console.log(videoCountViewChartData);

  return (
    <div
      key={relword + index}
      className={cn(
        'grid grid-cols-[minmax(250px,1fr)_140px_110px_110px_100px_100px_minmax(150px,1fr)_minmax(150px,1fr)] items-center gap-[12px] ',
        {
          'shadow-[inset_0_-2px_0_0_#f4f4f5]': index !== arr.length - 1,
        },
      )}
    >
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        {relword}
      </div>
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        {keyword}
      </div>
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        {lastExpectedView}
      </div>
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        {lastDailyView}
      </div>
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        누적 영상 수
      </div>
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        경쟁강도
      </div>
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        구독자 10만 이상 채널
      </div>
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        구독자 수 비슷한 채널
      </div>
    </div>
  );
};

export default RelationWord;
