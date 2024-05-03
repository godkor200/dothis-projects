'use client';

import DashboardDonutChart from '@/components/common/Charts/DashboardDonutChart';
import {
  CONVERT_SUBSCRIBERANGE,
  type SubscriberRange,
  type SubscriberRangeVideoCounts,
} from '@/constants/convertText';

interface Props {
  totalCount: number;
  videoCountsBySection: SubscriberRangeVideoCounts;
}

const CumulativeVideoChart = ({ totalCount, videoCountsBySection }: Props) => {
  const getApexChartFormat = (
    videoCountViewChartData: SubscriberRangeVideoCounts,
  ) => {
    const labels: Array<
      (typeof CONVERT_SUBSCRIBERANGE)[keyof typeof CONVERT_SUBSCRIBERANGE]
    > = [];
    const values: number[] = [];

    for (const key in videoCountViewChartData) {
      labels.push(CONVERT_SUBSCRIBERANGE[key as SubscriberRange]);
      values.push(videoCountViewChartData[key as SubscriberRange]);
    }

    return { labels, values };
  };

  const { labels, values } = getApexChartFormat(videoCountsBySection);

  return (
    <div className="rounded-8 border-grey400 bg-grey00 text-grey600 flex h-[368px] flex-col border p-6 font-bold">
      <div>연간 영상 수</div>
      <div className="relative h-full">
        <div className="absolute left-2/4 top-[65px] flex translate-x-[-50%] flex-col items-center justify-center">
          <div>영상 수</div>
          <div className="text-[20px]">
            <span className="text-primary500">{totalCount || 182}</span>개
          </div>
        </div>
        <DashboardDonutChart labels={labels} series={values} />
      </div>
    </div>
  );
};

export default CumulativeVideoChart;
