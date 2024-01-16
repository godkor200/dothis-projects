'use client';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import React, {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  type PropsWithChildren,
  useState,
} from 'react';

import SearchGNB from '@/components/common/Layout/SearchGNB';
import SvgComp from '@/components/common/SvgComp';

import OpenFilterContextProvider from './OpenFilterContext';
import TrendingQueryContextProvider, {
  useTrendingQueryContext,
} from './TrendingQueryContext';

const TrendingPageTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    // 필터링 컴포넌트로 인한 최상단 div 밒 fixed 버그를 활용한 translate
    <>
      <OpenFilterContextProvider>
        <TrendingQueryContextProvider>
          <div className="mx-auto max-w-[1342px]">
            <SearchGNB />
          </div>
          <>{children}</>
        </TrendingQueryContextProvider>
      </OpenFilterContextProvider>
    </>
  );
};

export default TrendingPageTemplate;
