'use client';

import React, { useState } from 'react';

import GptTest from './BarTransition';

const GPT = () => {
  const [data, setData] = useState([
    { name: 'A', value: 30 },
    { name: 'B', value: 80 },
    { name: 'C', value: 45 },
    { name: 'D', value: 60 },
    { name: 'E', value: 20 },
    { name: 'F', value: 90 },
    { name: 'G', value: 55 },
  ]);

  const updateData = () => {
    setData(
      data.map((item) => ({
        ...item,
        value: Math.floor(Math.random() * 100),
      })),
    );
  };

  // const updateData = () => {
  //   setData([]); // Clear all data
  // };
  return (
    <div>
      <button onClick={updateData}>Update Data</button>
      <GptTest data={data} />
    </div>
  );
};

export default GPT;
