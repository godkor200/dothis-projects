'use client';

import { useState } from 'react';

// import BarChart from '@/components/common/Charts/D3Transition';

const Test = () => {
  const data = [
    { value: 50, color: '#008' },
    { value: 100, color: '#00C' },
    { value: 150, color: '#00f' },
  ];

  const data1 = [
    { value: 22, color: '#008' },
    { value: 11, color: '#00C' },
    { value: 22, color: '#00f' },
  ];

  const [test, setTest] = useState(data);
  return (
    <>
      <button onClick={() => setTest(data1)}>클릭</button>
      {/* <BarChart data={test} width={300} height={170} /> */}
    </>
  );
};

export default Test;
