'use client';

import dynamic from 'next/dynamic';

import LineChart from '@/components/chart/LineChart';
import LineTwo from '@/components/chart/LineTwo';
import MyResponsivePie from '@/components/chart/Test';

// const LineChart = dynamic(() => import('../../../components/chart/LineChart'), {
//   ssr: false,
// });

// const MyResponsivePie = dynamic(() => import('../../../components/chart/Test'));

function ChartPage() {
  return (
    <div
      style={{
        height: '100vh',
        margin: '4rem',
      }}
    >
      {/* <p style={{ fontSize: '10rem' }}>
        lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non nemo
        voluptates, earum ratione aliquid voluptas nesciunt delectus magni
        obcaecati commodi eligendi placeat recusandae quibusdam voluptatibus,
        quis impedit animi sequi est.
      </p> */}
      {/* <LineChart /> */}
      <LineTwo />
    </div>
  );
}

export default ChartPage;
