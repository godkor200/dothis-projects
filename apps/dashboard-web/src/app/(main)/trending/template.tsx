'use client';

import type { PropsWithChildren } from 'react';

const TrendingPageTemplate = ({ children }: PropsWithChildren) => {
  return (
    // 필터링 컴포넌트로 인한 최상단 div 밒 fixed 버그를 활용한 translate
    <div className="relative translate-x-0">
      <div className="p-[24px]">
        <h3 className="text-grey600 font-bold">검색 키워드</h3>
        <ul>
          <li></li>
        </ul>
      </div>
      <div className="bg-grey200">{children}</div>
    </div>
  );
};

export default TrendingPageTemplate;
