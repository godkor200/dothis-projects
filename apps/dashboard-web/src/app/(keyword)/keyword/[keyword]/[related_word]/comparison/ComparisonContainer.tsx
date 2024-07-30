'use client';

import type { TKeywords } from '@/types/common';

import BoxFrame from '../../../BoxFrame';
import SummaryChart from '../summary/SummaryChart';
import ComparisonSummary from './ComparisonSummary';

const ComparisonContainer = ({ baseKeyword, relatedKeyword }: TKeywords) => {
  return (
    <>
      <BoxFrame>
        <div>
          <p className="text-grey600 mb-[30px] text-[14px] font-[500]">
            키워드 비교
          </p>
          <ComparisonSummary
            baseKeyword={baseKeyword}
            relatedKeyword={relatedKeyword}
          />
        </div>
      </BoxFrame>

      <BoxFrame>
        <div>
          <p className="text-grey600 mb-[30px] text-[14px] font-[500]">
            소재 분석 결과 비교
          </p>
          <SummaryChart
            baseKeyword={baseKeyword}
            relatedKeyword={relatedKeyword}
          />
        </div>
      </BoxFrame>
    </>
  );
};

export default ComparisonContainer;
