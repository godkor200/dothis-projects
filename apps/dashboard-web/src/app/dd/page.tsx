'use client';

import './YourComponent.css'; // CSS 파일 임포트

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const request_body = {
  startDate: '2017-01-01',
  endDate: '2017-04-30',
  timeUnit: 'month',
  keywordGroups: [
    {
      groupName: '한글',
      keywords: ['한글', 'korean'],
    },
    {
      groupName: '영어',
      keywords: ['영어', 'english'],
    },
  ],
  device: 'pc',
  ages: ['1', '2', '3', '4'],
  gender: 'f',
};

const YourComponent = () => {
  const [testUnmounted, setTestUnmounted] = useState(false);

  useEffect(() => {
    async function test() {
      const data = await axios.post('api/search');

      console.log(data);
    }

    // async function clientTest() {
    //   const response = await fetch('v1/search', {
    //     method: 'POST',
    //     headers: {
    //       'X-Naver-Client-Id': 'w5hxMTJtn4za98VEUhnr',
    //       'X-Naver-Client-Secret': 'jzLwJId4wN',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(request_body),
    //   });

    //   const data = await response.json();
    //   console.log(data);
    // }
    test();
    // clientTest();
  });

  const handleTestUnmount = () => {
    setTestUnmounted(true);
  };

  return (
    <div>
      {!testUnmounted && <div id="test">sdsds</div>}
      {testUnmounted && (
        <div id="up" className="up-animation">
          ddd
        </div>
      )}
      <div onClick={handleTestUnmount}>테스트</div>
    </div>
  );
};
export default YourComponent;
