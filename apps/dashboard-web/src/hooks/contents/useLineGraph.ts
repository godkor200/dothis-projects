import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { ClientInferResponseBody } from '@ts-rest/core';
import { useMemo } from 'react';

import type { ResponseType, VideoCount } from '@/constants/convertText';
import { CONVERT_SUBSCRIBERANGE } from '@/constants/convertText';
import { useEndDate, useStartDate } from '@/store/dateStore';
import {
  averageViews,
  formatToLineGraph,
  sumViews,
} from '@/utils/contents/dailyview';

import useGetDailyView from '../react-query/query/useGetDailyView';
import useGetExpectedView from '../react-query/query/useGetExpectedView';
import useGetVideoCount from '../react-query/query/useGetVideoCount';

type Post = ClientInferResponseBody<
  typeof apiRouter.video.getAccVideo,
  200
>['data']['section'];

export const useDailyViewChartDataForNivo = ({
  keyword,
  relword,
}: {
  keyword: string | null;
  relword: string | null;
}) => {
  const { data: dailyViewData } = useGetDailyView({ keyword, relword });

  const startDate = useStartDate();
  const endDate = useEndDate();

  return useMemo(
    () =>
      formatToLineGraph(
        sumViews(dailyViewData.flat(), { startDate, endDate }),
        '일일 조회 수 ',
      ),
    [dailyViewData],
  );
};

export const useExpectedViewChartDataForNivo = ({
  keyword,
  relword,
}: {
  keyword: string | null;
  relword: string | null;
}) => {
  const { data: expectedViewData } = useGetExpectedView({ keyword, relword });

  const startDate = useStartDate();
  const endDate = useEndDate();

  return useMemo(
    () =>
      formatToLineGraph(
        averageViews(expectedViewData.flat(), { startDate, endDate }),
        '기대 조회 수',
      ),
    [expectedViewData],
  );
};

export const useVideoCountViewChartData = ({
  keyword,
  relword,
}: {
  keyword: string | null;
  relword: string | null;
}) => {
  const { data: videoCountData } = useGetVideoCount({ keyword, relword });

  return useMemo(
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
};

const updateVideoCountViewChartData = (
  acc: { totalCount: number; videoCountViewChartData: ResponseType },
  sectionItem: Post[0],
) => {
  const key = sectionItem.section;

  if (key in CONVERT_SUBSCRIBERANGE) {
    const existingRange = CONVERT_SUBSCRIBERANGE[key as VideoCount];
    const existingItem = acc.videoCountViewChartData[key as VideoCount];

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
};
