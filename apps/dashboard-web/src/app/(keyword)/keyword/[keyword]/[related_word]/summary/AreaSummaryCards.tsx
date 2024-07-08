import ChartSummaryItem from '../../ChartSummaryItem';

const AreaSummaryCards = ({}: {
  baseKeyword: string;
  relatedKeyword: string;
}) => {
  const SummaryList = [
    {
      title: '평균 성과',
      value: '0',
    },
    {
      title: '대성공 시 최대 성과',
      value: '0',
    },
    {
      title: '실패 시 최소 성과',
      value: '0',
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
