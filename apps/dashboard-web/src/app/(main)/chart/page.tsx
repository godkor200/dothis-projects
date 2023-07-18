import dynamic from 'next/dynamic';

import ChartSidebar from '@/components/Chart/ChartSidebar';
import DashBoard from '@/components/Chart/DashBoard/DashBoard';

// const LineChart = dynamic(() => import('../../../components/chart/LineChart'), {
//   ssr: false,
// });

// const MyResponsivePie = dynamic(() => import('../../../components/chart/Test'));

const ChartPage = () => {
  return (
    <div className="flex w-full py-14 px-12 bg-[#F4F4F5]">
      {/* <LineChart /> */}
      <ChartSidebar />
      <DashBoard />
    </div>
  );
};

export default ChartPage;
