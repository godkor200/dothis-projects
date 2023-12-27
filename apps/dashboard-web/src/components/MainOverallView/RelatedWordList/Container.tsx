'use client';

import { ResponsiveLine } from '@nivo/line';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';

import CustomTooltip from '@/components/MainContents/InfoChartAndRanking/CustomTooltip';
import { VIEWCHART_LABEL } from '@/components/MainContents/InfoChartAndRanking/KeywordAnalyticsView';
import { NIVO_CHART_COLOR } from '@/constants/nivoChartColor';
import useGetRankingWordList from '@/hooks/react-query/query/useGetRankingWordList';
import useKeyword from '@/hooks/user/useKeyword';
import { cn } from '@/utils/cn';

import RelationGraph from './RelationGraph';
import RelationTable from './RelationTable';
import RelationWord from './RelationWord';

export type NivoLineChart = Array<{
  id: string;
  color?: string;
  data: Array<{ x: string; y: number }>;
}>;

const Container = () => {
  const [dailyViewChartDataList, setDailyViewChartDataList] =
    useState<NivoLineChart>([]);

  const [expectedViewChartDataList, setExpectedViewChartDataList] =
    useState<NivoLineChart>([]);

  return (
    <div className="flex flex-col gap-[20px]">
      {dailyViewChartDataList.length === 0 ? null : (
        <RelationGraph
          dailyViewChartDataList={dailyViewChartDataList}
          expectedViewChartDataList={expectedViewChartDataList}
        />
      )}

      <RelationTable
        dailyViewChartDataList={dailyViewChartDataList}
        expectedViewChartDataList={expectedViewChartDataList}
        setDailyViewChartDataList={setDailyViewChartDataList}
        setExpectedViewChartDataList={setExpectedViewChartDataList}
      />
    </div>
  );
};

export default Container;
