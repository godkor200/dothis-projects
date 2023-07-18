import LineTwo from '../LineChart';
import Summary from '../Summary';
import DailyView from './DailyView';

const DashBoard = () => {
  return (
    <div className="grow ml-4 p-10 rounded-lg border border-solid border-[#D4D4D8] bg-white">
      <Summary />
      <div className="flex">
        <LineTwo />
        <DailyView view={913192} />
      </div>
    </div>
  );
};

export default DashBoard;
