import AnalyticsSummaryCard from './AnalyticsSummaryCard';

interface Props {
  totalView: number;
  viewCountChange: number;
  searchVolumeChange: number;
}

const AnalyticsSummaryList = ({
  totalView,
  viewCountChange,
  searchVolumeChange,
}: Props) => {
  const summaryData = [
    { title: '조회수 합계', value: totalView, unit: '' },
    { title: '조회수 변동', value: viewCountChange, unit: '%' },
    { title: '검색량 변동', value: searchVolumeChange, unit: '%' },
  ];

  return (
    <ul className="mt-10">
      {summaryData.map(({ title, value, unit }, index) => (
        <AnalyticsSummaryCard
          title={title}
          view={value}
          unit={unit}
          key={title + index}
        />
      ))}
    </ul>
  );
};

export default AnalyticsSummaryList;
