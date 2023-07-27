import CumulativeVideoChart from './CumulativeVideoChart';
import DailyView from './DailyView';
import Summary from './Summary';
import ViewChart from './ViewChart/ViewChart';

export const VIEWCHART_LABEL = {
  DAILYVIEW: '일일 조회수',
  EXPECTEDVIEW: '기대 조회수',
} as const;

const DashBoard = () => {
  return (
    <div className="grow ml-4 p-10 rounded-lg border border-solid border-grey400 bg-grey00">
      <Summary />
      <div className="flex w-full h-[520px]">
        <ViewChart />
        <div className="flex flex-col">
          <DailyView view={913192} />
          <CumulativeVideoChart />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
