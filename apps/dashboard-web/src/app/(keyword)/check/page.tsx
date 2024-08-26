'use client';

import { useState } from 'react';

import { useSearchCountFormmaterD3 } from '@/hooks/contents/useChartFormatter';
import useGetNaverAdsQueries from '@/hooks/contents/useGetNaverAdsQueries';
import useGetNaverAds from '@/hooks/react-query/query/useGetNaverAds';

import ChartSummaryCards from '../keyword/[keyword]/ChartSummaryCards';

const Check = () => {
  const [inpValue, setInpValue] = useState('');

  const test = useSearchCountFormmaterD3({
    baseKeyword: '기안84',
    relatedKeyword: null,
  });

  const good = useGetNaverAdsQueries({
    baseKeyword: '',
    relatedKeywords: ['기안84', '마우스'],
  });

  console.log(test);
  console.log(good);
  return (
    <div>
      checkPage
      <input
        type="text"
        value={inpValue}
        onChange={(event) => setInpValue(event.target.value)}
      />
      <ChartSummaryCards keyword="기안84" relatedKeyword={null} />
    </div>
  );
};

export default Check;
