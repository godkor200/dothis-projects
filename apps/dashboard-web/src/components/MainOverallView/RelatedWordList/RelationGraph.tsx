import { ResponsiveLine } from '@nivo/line';
import dayjs from 'dayjs';

import CustomTooltip from '@/components/MainContents/InfoChartAndRanking/CustomTooltip';
import { VIEWCHART_LABEL } from '@/components/MainContents/InfoChartAndRanking/KeywordAnalyticsView';
import { NIVO_CHART_COLOR } from '@/constants/nivoChartColor';
import {
  ceilToNearest,
  floorToNearest,
  getRoundingUnit,
  roundToNearest,
  unitFormat,
} from '@/utils/mainContentUtil';

import type { NivoLineChart } from './Container';
import RelationDailyViewChart from './RelationDailyViewChart';
import RelationExpectedViewChart from './RelationExpectedViewChart';

interface Props {
  dailyViewChartDataList: NivoLineChart;
  expectedViewChartDataList: NivoLineChart;
}

const RelationGraph = ({
  dailyViewChartDataList,
  expectedViewChartDataList,
}: Props) => {
  return (
    <div className="bg-grey00 rounded-8 h-[550px] p-[40px] pb-[80px] shadow-[inset_0_0_0_2px_rgb(228,228,231)]">
      <div
        className="h-3/6
    w-full [&_svg]:overflow-visible"
      >
        <RelationDailyViewChart
          dailyViewChartDataList={dailyViewChartDataList}
        />
      </div>
      <div
        className="h-3/6
    w-full [&_svg]:overflow-visible"
      >
        <RelationExpectedViewChart
          expectedViewChartDataList={expectedViewChartDataList}
        />
      </div>
    </div>
  );
};

export default RelationGraph;
