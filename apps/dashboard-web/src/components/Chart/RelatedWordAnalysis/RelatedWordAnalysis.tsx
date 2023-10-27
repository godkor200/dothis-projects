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
    <div className="bg-grey00 ml-5 grow pt-[2.5rem]">
      <Summary />
      <div className="flex h-[520px] w-full">
        <ViewChart />

        <div className="flex min-w-[18.12rem] flex-col [&_text]:font-bold">
          <DailyView view={913192} />

          <CumulativeVideoChart />
        </div>
      </div>
    </div>
  );
};

export default RelatedWordAnalysis;
