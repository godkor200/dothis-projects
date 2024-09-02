'use client';

import { useState } from 'react';

import { useSearchCountFormmaterD3 } from '@/hooks/contents/useChartFormatter';
import useGetNaverAdsQueries from '@/hooks/contents/useGetNaverAdsQueries';
import useGetNaverAds from '@/hooks/react-query/query/useGetNaverAds';

import useGetDailyExpectedView from '../../../hooks/react-query/query/useGetDailyExpectedView';
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

  const { data } = useGetDailyExpectedView({
    baseKeyword: '한국어',
    relatedKeyword: '세종대왕',
  });

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
