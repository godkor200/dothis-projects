const ChartSummaryItem = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <div className="w-[222px] px-[12px] py-[15px] text-center">
      <p className="text-grey700 text-[14px]">{title}</p>
      <p className="text-grey900 text-[18px] font-bold">{value}</p>
    </div>
  );
};

export default ChartSummaryItem;
