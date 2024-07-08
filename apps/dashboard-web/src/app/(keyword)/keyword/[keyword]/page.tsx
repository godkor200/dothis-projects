import D3Axis from '@/components/common/Charts/D3Axis';
import D3Chart from '@/components/common/Charts/D3Chart';

import BoxFrame from '../BoxFrame';
import MediaImageCard from '../MediaImageCard';
import MediaTextCard from '../MediaTextCard';
import MediaTextContainer from '../MediaTextContainer';
import ChartContainer from './ChartContainer';
import ChartSummaryCards from './ChartSummaryCards';
import CircleForceChart from './CircleForceChart';
import CompetitionRate from './CompetitionRate';
import KeywordRank from './KeywordRank';
import MainCluster from './MainCluster';

const Page = ({ params }: { params: { keyword: string } }) => {
  const keyword = decodeURIComponent(params.keyword);

  return (
    <div className="px-[66px]">
      <div className="mx-auto my-[40px] max-w-[1700px]">
        <div className="">
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

                  <KeywordRank keyword={keyword} />
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
              <BoxFrame isPositionProperty={true}>
                <div className="flex h-full flex-col">
                  <p className="text-grey600 mb-[20px] text-[14px]">
                    콘텐츠 추이
                  </p>

                  <ChartContainer keyword={keyword} relatedKeyword={null} />
                </div>
              </BoxFrame>
              <BoxFrame isPositionProperty={true}>
                <div className="flex h-full flex-col">
                  <p className="text-grey600 mb-[20px] text-[14px]">
                    연관 소재
                  </p>
                  <CircleForceChart keyword={keyword} />{' '}
                  <D3Chart keyword={keyword} />
                  <p className="text-primary300 absolute bottom-4 right-5 text-[14px]">
                    * 키워드를 선택해주세요
                  </p>
                </div>
              </BoxFrame>
            </div>

            {/* 주석 */}
            <div className="grid grid-cols-[repeat(1,minmax(1300px,1fr))] gap-[20px]">
              <BoxFrame isPositionProperty={true}>
                <div className="flex flex-col gap-[20px] overflow-hidden">
                  <p className="text-grey600 text-[14px]">
                    <span className="text-primary500">{keyword}</span> 관련 인기
                    유튜브
                  </p>

                  <MediaImageCard keyword={keyword} />

                  {/* 서버 사이드 렌더링을 아직 안하고 있어서, client 사이드 api response 유무를 따지기 위해  Container를 하나 생성하였다. */}

                  <MediaTextContainer keyword={keyword} />
                </div>
              </BoxFrame>
            </div>

            {/* 주석 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
