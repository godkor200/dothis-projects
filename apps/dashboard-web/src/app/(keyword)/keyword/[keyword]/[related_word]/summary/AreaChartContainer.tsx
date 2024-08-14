import AreaSummaryCards from './AreaSummaryCards';
import D3AreaChart from './D3AreaChart';

const AreaChartContainer = ({
  baseKeyword,
  relatedKeyword,
}: {
  baseKeyword: string;
  relatedKeyword: string;
}) => {
  return (
    <>
      <AreaSummaryCards
        baseKeyword={baseKeyword}
        relatedKeyword={relatedKeyword}
      />
      <D3AreaChart baseKeyword={baseKeyword} relatedKeyword={relatedKeyword} />
    </>
  );
};

export default AreaChartContainer;
