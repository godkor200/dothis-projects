import Link from 'next/link';

import D3Axis from '@/components/common/Charts/D3Axis';
import TooltipComponent from '@/components/common/Tooltip/Tooltip';
import { cn } from '@/utils/cn';

import BoxFrame from '../../../BoxFrame';
import ChartContainer from '../../ChartContainer';
import SelectedKeywordProvider from '../comparison/SelectedKeywordProvider';
import Counter from '../Rolling';
import AreaChartContainer from './AreaChartContainer';
import D3AreaChart from './D3AreaChart';
import MediaRank from './MediaRank';
// import { Component, Counter } from '../Rolling';
import OutlookChart from './OutlookChart';
import PredictedView from './PredictedView';
import SuccessProbability from './SuccessProbability';
import SummaryChart from './SummaryChart';

const SummaryTab = ({
  params,
}: {
  params: { keyword: string; related_word: string };
}) => {
  const baseKeyword = decodeURIComponent(params.keyword);
  const relatedKeyword = decodeURIComponent(params.related_word);

  return (
    <div className="mt-[20px] flex flex-col gap-[20px]">
      <Link
        href={`/keyword/${baseKeyword}/${relatedKeyword}/analysis`}
        className="text-[20px] font-bold"
      >
        분석 {'[더보기]'}
      </Link>

      {/* <Component /> */}
      <div className="grid grid-cols-[minmax(600px,2fr)_repeat(2,minmax(300px,1fr))] gap-[20px]">
        <BoxFrame>
          <div>
            <div className="text-grey600 mb-[30px] flex gap-[10px] text-[14px] font-[500]">
              <p> 조회수 예측</p>
            </div>{' '}
            <PredictedView
              baseKeyword={baseKeyword}
              relatedKeyword={relatedKeyword}
            />
          </div>
        </BoxFrame>
        <BoxFrame>
          <div className="flex h-full flex-grow flex-col">
            <p className="text-grey600 mb-[30px] text-[14px] font-[500]">
              소재 전망
            </p>
            <div className="flex flex-grow  flex-col items-center justify-center">
              <OutlookChart
                baseKeyword={baseKeyword}
                relatedkeyword={relatedKeyword}
              />
            </div>
          </div>
        </BoxFrame>
        <BoxFrame>
          <div>
            <p className="text-grey600 mb-[30px] text-[14px] font-[500]">
              성공 확률
            </p>

            <SuccessProbability
              baseKeyword={baseKeyword}
              relatedKeyword={relatedKeyword}
            />
          </div>
        </BoxFrame>
      </div>

      <div className="grid grid-cols-[repeat(2,minmax(600px,1fr))] gap-[20px]">
        <BoxFrame isPositionProperty={true}>
          <div className="flex h-full flex-col">
            <div className="text-grey600 mb-[30px] flex gap-[10px] text-[14px] font-[500]">
              <p>콘텐츠 추이</p>
              <TooltipComponent
                title={
                  '검색한 키워드가 포함된 영상들이 획득한 조회수의 합계와 영상이 발행된 횟수를 나타냅니다. \n 같은 기간 동안 변화한 검색량과 비교해 콘텐츠의 수요와 공급을 예측하세요.'
                }
              />
            </div>
            <ChartContainer
              keyword={baseKeyword}
              relatedKeyword={relatedKeyword}
            />
          </div>
        </BoxFrame>

        <BoxFrame isPositionProperty={true}>
          <div className="flex h-full flex-col">
            <div className="text-grey600 mb-[30px] flex gap-[10px] text-[14px] font-[500]">
              <p>조회수 예측</p>
              <TooltipComponent title={''} />
            </div>

            <AreaChartContainer
              baseKeyword={baseKeyword}
              relatedKeyword={relatedKeyword}
            />
            {/* <D3Axis keyword={baseKeyword} relatedKeyword={relatedKeyword} /> */}
          </div>
        </BoxFrame>
      </div>

      <div>
        <BoxFrame>
          <MediaRank
            baseKeyword={baseKeyword}
            relatedKeyword={relatedKeyword}
          />
        </BoxFrame>
      </div>

      <Link
        href={`/keyword/${baseKeyword}/${relatedKeyword}/comparison`}
        className="text-[20px] font-bold"
      >
        비교 {'[더보기]'}
      </Link>

      <div className="grid grid-cols-[minmax(300px,1fr)_minmax(1000px,3fr)] gap-[20px]">
        <BoxFrame>
          <div>
            <p className="text-grey600 mb-[30px] text-[14px] font-[500]">
              {baseKeyword}의 다른 연관 키워드
            </p>
            <ul className="gap-30 flex flex-col py-[25px]">
              {['치킨매니아', '가라아게', '맥도날드'].map(
                (item, index, arr) => {
                  const [blue, green] = arr.filter(
                    (item) => item !== '맥도날드',
                  );

                  return (
                    <li
                      className={cn(
                        'flex  items-center justify-between px-[36px] text-error ',
                        {
                          'text-[#34D399]': green === item,
                          'text-[#818CF8]': blue === item,
                        },
                      )}
                      key={item}
                    >
                      <span className="bg-grey200 h-[24px] w-[24px] rounded-[4px] text-center ">
                        {index + 1}
                      </span>
                      <span className="text-[20px] font-bold">{item}</span>
                    </li>
                  );
                },
              )}
            </ul>
          </div>
        </BoxFrame>
        <BoxFrame>
          <div>
            <p className="text-grey600 mb-[30px] text-[14px] font-[500]">
              키워드 분석 결과 비교
            </p>
            <SelectedKeywordProvider relatedKeyword={relatedKeyword}>
              <SummaryChart
                baseKeyword={baseKeyword}
                relatedKeyword={relatedKeyword}
              />
            </SelectedKeywordProvider>
          </div>
        </BoxFrame>
      </div>
      <Link
        href={`/keyword/${baseKeyword}/${relatedKeyword}/insight`}
        className="text-[20px] font-bold"
      >
        인사이트 {'[더보기]'}
      </Link>

      <div className="grid grid-cols-[minmax(1000px,3fr)_minmax(300px,1fr)] gap-[20px]">
        <BoxFrame>
          <div>
            <p className="text-grey600 mb-[30px] text-[14px] font-[500]">
              치킨의 다른 연관 키워드
            </p>
            바 차트
          </div>
        </BoxFrame>
        <BoxFrame>
          <div>
            <p className="text-grey600 mb-[30px] text-[14px] font-[500]">
              소재 전망
            </p>
            도넛 차트
          </div>
        </BoxFrame>
      </div>
    </div>
  );
};

export default SummaryTab;
