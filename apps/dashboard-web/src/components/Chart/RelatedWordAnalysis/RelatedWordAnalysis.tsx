import CumulativeVideoChart from './CumulativeVideoChart/CumulativeVideoChart';
import DailyView from './DailyView';
import Summary from './Summary';
import ViewChart from './ViewChart/ViewChart';

export const VIEWCHART_LABEL = {
  DAILYVIEW: '일일 조회수',
  EXPECTEDVIEW: '기대 조회수',
} as const;

const RelatedWordAnalysis = () => {
  return (
    <div className="grow ml-5 pt-[2.5rem] bg-grey00">
      <Summary />
      <div className="flex w-full h-[520px]">
        <ViewChart />
        <div className="flex flex-col min-w-[18.12rem] [&_text]:font-bold">
          <DailyView view={913192} />
          <CumulativeVideoChart />
        </div>
      </div>
    </div>
  );
};

export default RelatedWordAnalysis;
