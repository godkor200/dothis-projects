'use client';

import useGetDailyExpectedView from '@/hooks/react-query/query/useGetDailyExpectedView';

import ChartSummaryItem from '../../ChartSummaryItem';

const AreaSummaryCards = ({
  baseKeyword,
  relatedKeyword,
}: {
  baseKeyword: string;
  relatedKeyword: string;
}) => {
  const { data: apiData } = useGetDailyExpectedView({
    baseKeyword,
    relatedKeyword,
  });

  const maxExpectedHits = apiData?.data
    ? Math.max(...apiData.data.data.map((item) => item.expectedHits)) > 0.1
      ? Math.max(...apiData.data.data.map((item) => item.expectedHits)).toFixed(
          1,
        )
      : 0.1
    : 0;

  const maxAreaExpectedHits = apiData?.data
    ? Math.max(...apiData.data.data.map((item) => item.maxPerformance)) > 0.1
      ? Math.max(
          ...apiData.data.data.map((item) => item.maxPerformance),
        ).toFixed(1)
      : 0.1
    : 0;

  const minAreaExpectedHits = apiData?.data
    ? Math.max(...apiData.data.data.map((item) => item.minPerformance)) > 0.1
      ? Math.max(
          ...apiData.data.data.map((item) => item.minPerformance),
        ).toFixed(1)
      : 0.1
    : 0;

  const SummaryList = [
    {
      title: '평균 성과',
      value: `x${maxExpectedHits}`,
    },
    {
      title: '최대 성과',
      value: `x${maxAreaExpectedHits}`,
    },
    {
      title: '최소 성과',
      value: `x${minAreaExpectedHits}`,
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

export default AreaSummaryCards;
