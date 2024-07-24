import Link from 'next/link';
import { usePathname } from 'next/navigation';

import SvgComp from '@/components/common/SvgComp';
import { cn } from '@/utils/cn';

import BoxFrame from '../../../BoxFrame';
import SummaryChart from '../summary/SummaryChart';
import ComparisonContainer from './ComparisonContainer';
import ComparisonSummary from './ComparisonSummary';
import RelatedKeywordList from './RelatedKeywordList';
import SelectedKeywordProvider from './SelectedKeywordProvider';

const Page = ({
  params,
}: {
  params: { keyword: string; related_word: string };
}) => {
  const baseKeyword = decodeURIComponent(params.keyword);
  const relatedKeyword = decodeURIComponent(params.related_word);

  return (
    <div className="mb-[80px] mt-[20px] flex flex-col gap-[20px]">
      <Link
        href={`/keyword/${baseKeyword}/${relatedKeyword}/comparison`}
        className="text-[20px] font-bold"
      >
        비교
      </Link>
      <SelectedKeywordProvider relatedKeyword={relatedKeyword}>
        <div className="grid grid-cols-[minmax(300px,1fr)_minmax(1000px,3fr)] gap-[20px]">
          <BoxFrame>
            <RelatedKeywordList
              baseKeyword={baseKeyword}
              relatedKeyword={relatedKeyword}
            />
          </BoxFrame>

          <div className="grid grid-rows-[1fr_1fr] gap-[20px]">
            <BoxFrame>
              <div>
                <p className="text-grey600 mb-[30px] text-[14px] font-[500]">
                  키워드 분석 결과 비교
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
                  키워드 분석 결과 비교
                </p>
                <SummaryChart
                  baseKeyword={baseKeyword}
                  relatedKeyword={relatedKeyword}
                />
              </div>
            </BoxFrame>
          </div>
        </div>
      </SelectedKeywordProvider>
    </div>
  );
};

export default Page;
