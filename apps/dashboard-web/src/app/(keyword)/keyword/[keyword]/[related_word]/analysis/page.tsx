import Link from 'next/link';

import D3Axis from '@/components/common/Charts/D3Axis';
import ErrorBoundary from '@/components/common/Error/ErrorBoundary';
import SystemError from '@/components/common/Error/SystemError';
import TooltipComponent from '@/components/common/Tooltip/Tooltip';
import { cn } from '@/utils/cn';

import BoxFrame from '../../../BoxFrame';
import ChartContainer from '../../ChartContainer';
import Counter from '../Rolling';
import AreaChartContainer from '../summary/AreaChartContainer';
import MediaRank from '../summary/MediaRank';
import OutlookChart from '../summary/OutlookChart';
import PredictedView from '../summary/PredictedView';
import SuccessProbability from '../summary/SuccessProbability';

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
        href={`/keyword/${baseKeyword}/${relatedKeyword}/analysis`}
        className="text-[20px] font-bold"
      >
        분석
      </Link>

      {/* <Component /> */}
      <div className="grid grid-cols-[repeat(2,minmax(600px,1fr))] gap-[20px]">
        <BoxFrame>
          <div>
            <div className="text-grey600 mb-[40px] flex gap-[10px] text-[14px] font-[500]">
              <p> 조회수 예측</p>
            </div>{' '}
            <ErrorBoundary fallback={<SystemError />}>
              <PredictedView
                baseKeyword={baseKeyword}
                relatedKeyword={relatedKeyword}
              />
            </ErrorBoundary>
          </div>
        </BoxFrame>
        <div className="grid grid-cols-[repeat(2,minmax(300px,1fr))] gap-[20px]">
          <BoxFrame>
            <div className="flex h-full flex-grow flex-col">
              <p className="text-grey600 mb-[30px] text-[14px] font-[500]">
                소재 전망
              </p>
              <div className="flex flex-grow  flex-col items-center justify-center">
                <ErrorBoundary fallback={<SystemError />}>
                  <OutlookChart
                    baseKeyword={baseKeyword}
                    relatedkeyword={relatedKeyword}
                  />
                </ErrorBoundary>
              </div>
            </div>
          </BoxFrame>
          <BoxFrame>
            <div>
              <p className="text-grey600 mb-[30px] text-[14px] font-[500]">
                성공 확률
              </p>
              <ErrorBoundary fallback={<SystemError />}>
                <SuccessProbability
                  baseKeyword={baseKeyword}
                  relatedKeyword={relatedKeyword}
                />
              </ErrorBoundary>
            </div>
          </BoxFrame>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(2,minmax(650px,1fr))] gap-[20px]">
        <BoxFrame isPositionProperty={true}>
          <div className="flex h-full flex-col">
            <div className="text-grey600 mb-[30px] flex gap-[10px] text-[14px] font-[500]">
              <p>콘텐츠 추이</p>
              <TooltipComponent
                title={
                  '일주일 동안 발생한 조회수의 합계와 분석된 영상의 수를 나타냅니다.  \n 검색량의 변화와 비교해 콘텐츠의 수요와 공급을 예측하세요.'
                }
              />
            </div>
            <ErrorBoundary fallback={<SystemError />}>
              <ChartContainer
                keyword={baseKeyword}
                relatedKeyword={relatedKeyword}
              />
            </ErrorBoundary>
          </div>
        </BoxFrame>

        <BoxFrame isPositionProperty={true}>
          <div className="flex h-full flex-col">
            <div className="text-grey600 mb-[30px] flex gap-[10px] text-[14px] font-[500]">
              <p>조회수 성과</p>
              <TooltipComponent
                title={
                  '이 주제를 다룬 채널의 평균 조회수보다 몇 배의 조회수를 얻었는지 계산합니다. \n 평균 성과가 높다면 누가 다뤄도 높은 조회수가 예상되고, 반대로 평균 성과가 \n 낮다면 누가 다뤄도 낮은 조회수가 예상되는 키워드라는 의미입니다.'
                }
              />
            </div>

            <ErrorBoundary fallback={<SystemError />}>
              <AreaChartContainer
                baseKeyword={baseKeyword}
                relatedKeyword={relatedKeyword}
              />
            </ErrorBoundary>
            {/* <D3Axis keyword={baseKeyword} relatedKeyword={relatedKeyword} /> */}
          </div>
        </BoxFrame>
      </div>

      <div>
        <BoxFrame isPositionProperty={true}>
          <div className="flex flex-col">
            <div className="text-grey600 mb-[30px] flex gap-[10px] text-[14px] font-[500]">
              <p>주간 조회수 상승 순위</p>
            </div>
            <ErrorBoundary fallback={<SystemError />}>
              <MediaRank
                baseKeyword={baseKeyword}
                relatedKeyword={relatedKeyword}
              />
            </ErrorBoundary>
          </div>
        </BoxFrame>
      </div>
    </div>
  );
};

export default Page;
