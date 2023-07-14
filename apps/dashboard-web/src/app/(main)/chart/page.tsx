'use client';

import dynamic from 'next/dynamic';
import { styled } from 'styled-components';

import ChartSidebar from '@/components/Chart/ChartSidebar';
import LineTwo from '@/components/Chart/LineChart';
import Summary from '@/components/Chart/Summary';

// const LineChart = dynamic(() => import('../../../components/chart/LineChart'), {
//   ssr: false,
// });

// const MyResponsivePie = dynamic(() => import('../../../components/chart/Test'));

const ChartPage = () => {
  return (
    <Dashboard>
      {/* <p style={{ fontSize: '10rem' }}>
        lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non nemo
        voluptates, earum ratione aliquid voluptas nesciunt delectus magni
        obcaecati commodi eligendi placeat recusandae quibusdam voluptatibus,
        quis impedit animi sequi est.
      </p> */}
      {/* <LineChart /> */}
      <ChartSidebar />
      <Chart>
        <Summary />
        <LineTwo />
      </Chart>
    </Dashboard>
  );
};

export default ChartPage;

const Dashboard = styled.div`
  display: flex;
  height: 100vh;
  padding: 60px 48px;
  background-color: #f4f4f5;
`;

const Chart = styled.div`
  flex: 1;
  margin-left: 16px;
  padding: 40px;
  border-radius: 8px;
  border: 1px solid #d4d4d8;
  background-color: #ffffff;
`;
