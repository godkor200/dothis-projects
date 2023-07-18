import dynamic from 'next/dynamic';

import ChartSidebar from '@/components/Chart/ChartSidebar';
import DailyView from '@/components/Chart/DashBoard/DailyView';
import LineTwo from '@/components/Chart/LineChart';
import Summary from '@/components/Chart/Summary';

// const LineChart = dynamic(() => import('../../../components/chart/LineChart'), {
//   ssr: false,
// });

// const MyResponsivePie = dynamic(() => import('../../../components/chart/Test'));

const ChartPage = () => {
  return (
    <div className="flex w-full	h-screen py-14 px-12 bg-[#F4F4F5]">
      {/* <p style={{ fontSize: '10rem' }}>
        lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non nemo
        voluptates, earum ratione aliquid voluptas nesciunt delectus magni
        obcaecati commodi eligendi placeat recusandae quibusdam voluptatibus,
        quis impedit animi sequi est.
      </p> */}
      {/* <LineChart /> */}
      <ChartSidebar />
      <div className="grow ml-4 p-10 rounded-lg border border-solid border-[#D4D4D8] bg-white">
        <Summary />
        <LineTwo />
        <DailyView view={913192} />
      </div>
    </div>
  );
};

export default ChartPage;
