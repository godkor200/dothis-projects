import Link from 'next/link';

import D3Axis from '@/components/common/Charts/D3Axis';
import D3Chart from '@/components/common/Charts/D3Chart';

import BoxFrame from '../BoxFrame';
import MediaImageCard from '../MediaImageCard';
import MediaTextCard from '../MediaTextCard';
import ChartSummaryCards from './ChartSummaryCards';
import CircleForceChart from './CircleForceChart';
import CompetitionRate from './CompetitionRate';
import MainCluster from './MainCluster';

const Page = ({ params }: { params: { keyword: string } }) => {
  const keyword = decodeURIComponent(params.keyword);

  return (
    <div>
      <div className="border-grey500 mx-auto mt-[40px] max-w-[1700px] ">
        <div className="">
          <h2 className="mb-[20px] text-[20px] font-bold">검색어 결과</h2>
          <div className="grid grid-rows-[140px_460px] gap-[20px]">
            <div className="grid grid-cols-[repeat(4,minmax(300px,1fr))] gap-[20px]">
              <BoxFrame>
                <div>
                  <p className="text-grey600 mb-[20px] text-[14px]">
                    내 검색 키워드
                  </p>
                  <p className="text-center text-[20px] font-bold">{keyword}</p>
                </div>
              </BoxFrame>
              <BoxFrame>
                <div>
                  <p className="text-grey600 mb-[20px] text-[14px]">
                    키워드 순위
                  </p>
                  <p className="text-center text-[20px] font-bold">4</p>
                </div>
              </BoxFrame>
              <BoxFrame>
                <div>
                  <p className="text-grey600 mb-[20px] text-[14px]">
                    대표 카테고리
                  </p>

                  <p className="text-center text-[20px] font-bold">
                    <MainCluster keyword={keyword} />
                  </p>
                </div>
              </BoxFrame>
              <BoxFrame>
                <div>
                  <p className="text-grey600 mb-[20px] text-[14px]">경쟁강도</p>

                  <CompetitionRate keyword={keyword} />
                </div>
              </BoxFrame>
            </div>

            {/* 주석 */}
            <div className="grid grid-cols-[repeat(2,minmax(600px,1fr))] gap-[20px]">
              <BoxFrame>
                <div>
                  <p className="text-grey600 mb-[20px] text-[14px]">
                    콘텐츠 추이
                  </p>

                  <ChartSummaryCards keyword={keyword} />
                  <D3Axis keyword={keyword} />
                </div>
              </BoxFrame>
              <BoxFrame>
                <div>
                  <p className="text-grey600 mb-[20px] text-[14px]">
                    연관 소재
                  </p>
                  <CircleForceChart keyword={keyword} />{' '}
                  <D3Chart keyword={keyword} />
                </div>
              </BoxFrame>
            </div>

            {/* 주석 */}
            <div className="grid grid-cols-[repeat(1,minmax(1300px,1fr))] gap-[20px]">
              <BoxFrame>
                <div className="flex flex-col gap-[20px] overflow-hidden">
                  <p className="text-grey600 mb-[20px] text-[14px]">
                    <span className="text-primary500">{keyword}</span> 관련 인기
                    유튜브
                  </p>
                  <div className="flex justify-between gap-[24px] ">
                    <MediaImageCard keyword={keyword} />
                  </div>

                  <p className="text-grey600 mb-[20px] text-[14px]">
                    <span className="text-primary500">{keyword}</span> 관련 뉴스
                  </p>
                  <div className="flex justify-between gap-[24px]">
                    <MediaTextCard keyword={keyword} />
                  </div>
                </div>
              </BoxFrame>
            </div>

            {/* 주석 */}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Page;
