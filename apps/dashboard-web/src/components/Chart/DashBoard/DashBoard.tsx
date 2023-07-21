import LineTwo from '../LineChart';
import CumulativeVideoChart from './CumulativeVideoChart';
import DailyView from './DailyView';
import Summary from './Summary';

const DashBoard = () => {
  return (
    <div className="grow ml-4 p-10 rounded-lg border border-solid border-grey400 bg-grey00">
      <Summary />
      <div className="flex w-full h-[520px]">
        <LineTwo />
        <div className="flex flex-col">
          <DailyView view={913192} />
          <CumulativeVideoChart />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
