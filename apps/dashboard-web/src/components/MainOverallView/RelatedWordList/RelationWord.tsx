import React, { useEffect, useMemo } from 'react';

import CheckboxContainer from '@/components/common/Checkbox';
import type { ResponseType, VideoCount } from '@/constants/convertText';
import { CONVERT_SUBSCRIBERANGE } from '@/constants/convertText';
import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import useGetExpectedView from '@/hooks/react-query/query/useGetExpectedView';
import useGetVideoCount from '@/hooks/react-query/query/useGetVideoCount';
import useKeyword from '@/hooks/user/useKeyword';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { cn } from '@/utils/cn';
import {
  convertCompetitionScoreFormat,
  getCompetitionScore,
} from '@/utils/contents/competitionScore';
import {
  averageViews,
  formatToLineGraph,
  sumViews,
} from '@/utils/contents/dailyview';

import type { NivoLineChart } from './Container';

interface Props {
  keyword: string;
  relword: string;
  index: number;
  arr: {
    relword: string;
    keyword: string;
  }[];
  dailyViewChartDataList: NivoLineChart;
  expectedViewChartDataList: NivoLineChart;
  setDailyViewChartDataList: React.Dispatch<
    React.SetStateAction<NivoLineChart>
  >;
  setExpectedViewChartDataList: React.Dispatch<
    React.SetStateAction<NivoLineChart>
  >;
}

/**
 * 해당 컴포넌트에 대한 주석을 추 후에 추가하도록 하겠습니다
 */
const RelationWord = ({
  keyword,
  relword,
  index,
  arr,
  dailyViewChartDataList,
  expectedViewChartDataList,
  setDailyViewChartDataList,
  setExpectedViewChartDataList,
}: Props) => {
  const { data: dailyViewData } = useGetDailyView({
    keyword: keyword,
    relword: relword,
  });

  const startDate = useStartDate();
  const endDate = useEndDate();

  const { hashKeywordList } = useKeyword();

  const dailyViewChartData = useMemo(
    () =>
      formatToLineGraph(
        sumViews(dailyViewData.flat(), { startDate, endDate }),
        relword,
      ),
    [dailyViewData],
  );

  /**
   *
   */

  // useEffect 의존성배열에 계속 실행되는 곳에 setState를 넣으면 무한으로 렌더링을 야기한다. (부모가 렌더되면 React.memo를 적용시키지않는 이상 자식도 렌더링 되기때문에 서로 계속 렌덜링이 된다)
  useEffect(() => {
    const prevDataIndex = dailyViewChartDataList.findIndex(
      (item) => item.id === dailyViewChartData[0].id,
    );
    (prevDataIndex !== -1 || dailyViewChartDataList.length < 1) &&
      index === 0 &&
      setDailyViewChartDataList((prev) =>
        handleAddChartDataList(prev, dailyViewChartData),
      );
  }, [
    JSON.stringify(dailyViewData),
    JSON.stringify(hashKeywordList),
    JSON.stringify(dailyViewChartDataList),
    /**
     * dailyViewChartDataList 넣은 이유 RelationTable에서
     * hashKeywordList에 변동이 있을 경우 (어떤 키워드를 제거할 경우) 제거한 키워드에 연관어를 지우는 useEffect 후 에 한번 더 실행이 필요함.
     * 아니면 동시성 제어로 여기 useEffect의 setState를 RelationTable 다음에 진행하게 할 수 있나?
     */
  ]);

  const lastDailyView = dailyViewChartData[0].data.at(-1)?.y;

  const { data: expectedViewData } = useGetExpectedView({
    keyword: keyword,
    relword: relword,
  });

  const expectedViewChartData = useMemo(
    () =>
      formatToLineGraph(
        averageViews(expectedViewData.flat(), { startDate, endDate }),
        relword,
      ),
    [expectedViewData],
  );

  useEffect(() => {
    const prevDataIndex = dailyViewChartDataList.findIndex(
      (item) => item.id === dailyViewChartData[0].id,
    );
    (prevDataIndex !== -1 || dailyViewChartDataList.length < 1) &&
      index === 0 &&
      setExpectedViewChartDataList((prev) =>
        handleAddChartDataList(prev, expectedViewChartData),
      );
  }, [
    JSON.stringify(expectedViewData),
    JSON.stringify(hashKeywordList),
    JSON.stringify(expectedViewChartDataList),
  ]);

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
        {
          totalCount: 0,
          videoCountViewChartData: {},
        } as {
          totalCount: number;
          videoCountViewChartData: ResponseType;
        },
      ),
    [videoCountData],
  );

  const handleOnChangeCheckBox = (isChecked: boolean) => {
    if (isChecked) {
      /**
       * 이미 연관어가 check되었을 경우
       */

      if (dailyViewChartDataList.length === 1) {
        return;
      }
      setDailyViewChartDataList((prev) =>
        handleRemoveChartDataList(prev, relword),
      );
      setExpectedViewChartDataList((prev) =>
        handleRemoveChartDataList(prev, relword),
      );
    } else {
      /**
       * 연관어가  check 되어있지않을 경우
       */
      setDailyViewChartDataList((prev) =>
        handleAddChartDataList(prev, dailyViewChartData),
      );

      setExpectedViewChartDataList((prev) =>
        handleAddChartDataList(prev, dailyViewChartData),
      );
    }
  };

  const competitionText = convertCompetitionScoreFormat(
    getCompetitionScore(lastDailyView, totalCount),
  );

  const subscribersVideoCount =
    videoCountViewChartData['100000~500000']?.value ||
    0 + videoCountViewChartData['500000이상']?.value ||
    0;

  return (
    <div
      key={relword + index}
      className={cn(
        'grid grid-cols-[minmax(250px,1fr)_140px_150px_150px_150px_100px_minmax(150px,1fr)] items-center gap-[12px] ',
        {
          'shadow-[inset_0_-2px_0_0_#f4f4f5]': index !== arr.length - 1,
        },
      )}
    >
      <div className="flex items-center gap-[10px] pl-[8px] ">
        <CheckboxContainer
          id={relword + index}
          isChecked={dailyViewChartDataList.some((item) => item.id === relword)}
          key={relword + index}
          onChange={() => {
            handleOnChangeCheckBox(
              dailyViewChartDataList.some((item) => item.id === relword),
            );
          }}
        >
          <CheckboxContainer.Checkbox />
        </CheckboxContainer>
        <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
          {relword}
        </div>
      </div>
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        {keyword}
      </div>
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        {lastExpectedView}
      </div>
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        {new Intl.NumberFormat('ko', {
          notation: 'compact',
        }).format(lastDailyView || 0) + '회'}
      </div>
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        {totalCount}
      </div>
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        {competitionText}
      </div>
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        {subscribersVideoCount}
      </div>
    </div>
  );
};

export default RelationWord;

/**
 * 현재 이 함수는 무조건 setState를 한다.
 */
const handleAddChartDataList = (
  prev: NivoLineChart,
  dailyViewChartData: {
    id: string;
    data: {
      x: string;
      y: number;
    }[];
  }[],
) => {
  const prevDataIndex = prev.findIndex(
    (item) => item.id === dailyViewChartData[0].id,
  );

  const copyPrevData = [...prev];

  if (prevDataIndex !== -1) {
    copyPrevData[prevDataIndex] = {
      id: dailyViewChartData[0].id,
      data: dailyViewChartData[0].data,
    };
    return copyPrevData;
  } else {
    return [...prev, { ...dailyViewChartData[0] }];
  }
};

const handleRemoveChartDataList = (prev: NivoLineChart, relword: string) => {
  return [...prev.filter((item) => item.id !== relword)];
};
