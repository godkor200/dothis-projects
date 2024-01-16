'use client';

import type { PropsWithChildren } from 'react';

const TrendingPageTemplate = ({ children }: PropsWithChildren) => {
  return (
    // 필터링 컴포넌트로 인한 최상단 div 밒 fixed 버그를 활용한 translate
    <>{children}</>
  );
};

export default TrendingPageTemplate;
