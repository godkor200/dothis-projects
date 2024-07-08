'use client';

import { useSearchParams } from 'next/navigation';

import D3Axis from '@/components/common/Charts/D3Axis';
import D3Chart from '@/components/common/Charts/D3Chart';

const Page = () => {
  const searchparmas = useSearchParams();
  return (
    <>
      {/* <D3
        width={500}
        height={500}
        data={[
          { year: 2019, sales: 10000, efficiency: 25 },
          { year: 2020, sales: 12000, efficiency: 28 },
          { year: 2021, sales: 15000, efficiency: 30 },
          { year: 2022, sales: 18000, efficiency: 32 },
          { year: 2023, sales: 20000, efficiency: 35 },
        ]}
      /> */}

      <D3Chart keyword="세종" />
      <D3Axis keyword="세종" relatedKeyword={'대왕'} />
      {/* <D3Tool />
      <D3ToolTip /> */}
      {/* <D3Chart /> */}
    </>
  );
};

export default Page;
