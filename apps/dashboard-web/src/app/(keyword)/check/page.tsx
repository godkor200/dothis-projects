'use client';

import { useState } from 'react';

import { useSearchCountFormmaterD3 } from '@/hooks/contents/useChartFormatter';
import useGetNaverAds from '@/hooks/react-query/query/useGetNaverAds';

const Check = () => {
  const [inpValue, setInpValue] = useState('');

  const test = useSearchCountFormmaterD3({
    baseKeyword: '기안84',
    relatedKeyword: null,
  });
  console.log(test);
  return (
    <div>
      checkPage
      <input
        type="text"
        value={inpValue}
        onChange={(event) => setInpValue(event.target.value)}
      />
    </div>
  );
};

export default Check;
