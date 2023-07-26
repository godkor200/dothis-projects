import dynamic from 'next/dynamic';

import ChartSidebar from '@/components/Chart/ChartSidebar';
import DashBoard from '@/components/Chart/DashBoard/DashBoard';
import DashBoardCheckBox from '@/components/Chart/DashBoard/DashBoardCheckBox';

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
        <DashBoardCheckBox />
      </div>
      <div className="flex">
        <ChartSidebar />
        <DashBoard />
      </div>
    </div>
  );
};

export default ChartPage;
