import dynamic from 'next/dynamic';

import ChartSidebar from '@/components/Chart/ChartSidebar';
import CumulativeVideoChartFilter from '@/components/Chart/DashBoard/CumulativeVideoChartFilter';
import DashBoard from '@/components/Chart/DashBoard/DashBoard';

// const LineChart = dynamic(() => import('../../../components/chart/LineChart'), {
//   ssr: false,
// });

// const MyResponsivePie = dynamic(() => import('../../../components/chart/Test'));

const ChartPage = () => {
  return (
    <div className=" w-full px-12 py-[60px] bg-grey200">
      {/* <LineChart /> */}
      <div className="flex mb-5">
        <div>캘린더 위치</div>
        <CumulativeVideoChartFilter />
      </div>
      <div className="flex">
        <ChartSidebar />
        <DashBoard />
      </div>
    </div>
  );
};

export default ChartPage;
