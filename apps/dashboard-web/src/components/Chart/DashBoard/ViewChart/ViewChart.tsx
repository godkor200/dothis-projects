import DailyViewChart from './DailyViewChart';
import ExpectedViewChart from './ExpectedViewChart';

const ViewChart = () => {
  return (
    <div className="w-full h-[460px] flex flex-col mr-7">
      <div className="h-3/6 [&_svg]:overflow-visible">
        <DailyViewChart />
      </div>
      <div className="h-3/6 [&_svg]:overflow-visible">
        <ExpectedViewChart />
      </div>
    </div>
  );
};

export default ViewChart;
