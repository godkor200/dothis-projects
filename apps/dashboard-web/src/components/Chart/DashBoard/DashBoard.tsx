import LineTwo from '../LineChart';
import DailyView from './DailyView';
import Summary from './Summary';

const DashBoard = () => {
  return (
    <div className="grow ml-4 p-10 rounded-lg border border-solid border-grey400 bg-grey00">
      <Summary />
      <div className="w-full flex">
        <LineTwo />
        <DailyView view={913192} />
      </div>
    </div>
  );
};

export default DashBoard;
