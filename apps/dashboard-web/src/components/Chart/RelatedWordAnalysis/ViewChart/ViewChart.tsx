import DailyViewChart from './DailyViewChart';
import ExpectedViewChart from './ExpectedViewChart';

const ViewChart = () => {
  return (
    <div className="mr-7 flex h-[460px] w-full flex-col">
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
