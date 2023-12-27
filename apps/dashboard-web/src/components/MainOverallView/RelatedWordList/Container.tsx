'use client';

import { useState } from 'react';

import RelationGraph from './RelationGraph';
import RelationTable from './RelationTable';

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
