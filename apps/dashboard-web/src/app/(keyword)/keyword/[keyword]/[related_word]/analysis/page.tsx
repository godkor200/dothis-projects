import Link from 'next/link';

import D3Axis from '@/components/common/Charts/D3Axis';
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
import SummaryChart from '../summary/SummaryChart';

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
            <PredictedView
              baseKeyword={baseKeyword}
              relatedKeyword={relatedKeyword}
            />
          </div>
        </BoxFrame>
        <div className="grid grid-cols-[repeat(2,minmax(300px,1fr))] gap-[20px]">
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
      </div>

      <div className="grid grid-cols-[repeat(2,minmax(650px,1fr))] gap-[20px]">
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
              <p>조회수 성과</p>
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
        <BoxFrame isPositionProperty={true}>
          <div className="flex max-h-[330px] flex-col">
            <div className="text-grey600 mb-[30px] flex gap-[10px] text-[14px] font-[500]">
              <p>주간 조회수 상승 순위</p>
            </div>
            <MediaRank
              baseKeyword={baseKeyword}
              relatedKeyword={relatedKeyword}
            />
          </div>
        </BoxFrame>
      </div>
    </div>
  );
};

export default Page;
