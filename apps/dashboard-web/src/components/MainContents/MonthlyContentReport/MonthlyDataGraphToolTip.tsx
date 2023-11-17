import type { RadarSliceTooltipDatum } from '@nivo/radar';

interface MonthlyDataGraphToolTipProps {
  data: RadarSliceTooltipDatum[];
  label: string | number;
  maxViews: number;
  maxVideoTotalCounts: number;
  viewAndVideoMaxValue: number;
}

const MonthlyDataGraphToolTip = ({
  data,
  label,
  maxVideoTotalCounts,
  maxViews,
  viewAndVideoMaxValue,
}: MonthlyDataGraphToolTipProps) => {
  data.sort((a, b) => (a.id === 'views' ? -1 : 1));

  return (
    <article className="bg-grey00 p-2 shadow-md">
      <h4 className="my-1 font-bold">{label}</h4>
      {data.map((graphData, index) => {
        const color = `bg-[${graphData.color}]`;

        return (
          <div key={index} className="flex items-center gap-[12px]">
            <div className={`${color} block h-3 w-3 `} />
            <span className="flex-1">{graphData.id}</span>
            {Math.floor(
              (graphData.value / viewAndVideoMaxValue) *
                (graphData.id === 'views' ? maxViews : maxVideoTotalCounts),
            )}
          </div>
        );
      })}
    </article>
  );
};

export default MonthlyDataGraphToolTip;
