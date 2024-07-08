import Link from 'next/link';

import D3Axis from '@/components/common/Charts/D3Axis';
import { cn } from '@/utils/cn';

import BoxFrame from '../../../BoxFrame';
import ChartContainer from '../../ChartContainer';
import Counter from '../Rolling';
import AreaChartContainer from './AreaChartContainer';
import D3AreaChart from './D3AreaChart';
import MediaRank from './MediaRank';
// import { Component, Counter } from '../Rolling';
import OutlookChart from './OutlookChart';
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
            <p className="text-grey600 mb-[30px] text-[14px] font-[500]">
              조회수 예측
            </p>

            <div className=" gap-30 flex flex-col pb-[30px] text-center">
              <p className="text-grey600  mb-[50px]  text-[14px] font-[500]">
                키워드에 대한 시청자 수요 X 주간 검색량 변동 X 경쟁 채널의
                구독자 규모
              </p>
              <p className="text-grey600  mb-[40px]  text-[14px] font-[500]">
                키워드의 평균 성과 X 채널의 평소 성과
              </p>

              <div className="text-grey600 flex items-center justify-center gap-[10px] text-[14px] font-[400]">
                <p>조회수</p>
                <div className="text-primary500   px-[10px] text-[18px] font-bold">
                  <Counter value={1232324234} />
                </div>
                <p>예상</p>
                {/* 여기 조회수에 그냥 가상선택자 달아주자 */}
              </div>
            </div>
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
            <p className="text-grey600 mb-[20px] text-[14px]">콘텐츠 추이</p>
            <ChartContainer
              keyword={baseKeyword}
              relatedKeyword={relatedKeyword}
            />
          </div>
        </BoxFrame>

        <BoxFrame isPositionProperty={true}>
          <div className="flex h-full flex-col">
            <p className="text-grey600 mb-[20px] text-[14px]">조회수 예측</p>

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
            <SummaryChart />
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
