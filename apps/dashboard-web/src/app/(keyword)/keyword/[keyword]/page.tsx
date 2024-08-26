import D3Axis from '@/components/common/Charts/D3Axis';
import D3Chart from '@/components/common/Charts/D3Chart';
import ErrorBoundary from '@/components/common/Error/ErrorBoundary';
import SystemError from '@/components/common/Error/SystemError';
import TooltipComponent from '@/components/common/Tooltip/Tooltip';

import BoxFrame from '../BoxFrame';
import MediaImageCard from '../MediaImageCard';
import MediaTextCard from '../MediaTextCard';
import MediaTextContainer from '../MediaTextContainer';
import ChartContainer from './ChartContainer';
import ChartSummaryCards from './ChartSummaryCards';
import CircleForceChart from './CircleForceChart';
import CircleForceContainer from './CircleForceContainer';
import CompetitionRate from './CompetitionRate';
import KeywordRank from './KeywordRank';
import MainCluster from './MainCluster';

const Page = ({ params }: { params: { keyword: string } }) => {
  const keyword = decodeURIComponent(params.keyword);

  return (
    <div className="px-[66px] font-[500]">
      <div className="mx-auto my-[40px] max-w-[1700px]">
        <div className="">
          <div className="grid grid-rows-[140px_460px] gap-[20px]">
            <div className="grid grid-cols-[repeat(4,minmax(300px,1fr))] gap-[20px]">
              <BoxFrame>
                <div>
                  <p className="text-grey600 mb-[20px] text-[14px]">
                    검색 키워드
                  </p>
                  <p className="text-center text-[20px] font-bold">{keyword}</p>
                </div>
              </BoxFrame>
              <BoxFrame>
                <div>
                  <p className="text-grey600 mb-[20px] text-[14px] font-[500]">
                    전체 키워드 중{' '}
                    <span className="text-primary500">{keyword}</span>의 조회수
                    순위
                  </p>

                  <ErrorBoundary fallback={<SystemError />}>
                    <KeywordRank keyword={keyword} />
                  </ErrorBoundary>
                </div>
              </BoxFrame>
              <BoxFrame>
                <div>
                  <p className="text-grey600 mb-[20px] text-[14px]">
                    대표 카테고리
                  </p>

                  <p className="text-center text-[20px] font-bold">
                    <ErrorBoundary fallback={<SystemError />}>
                      <MainCluster keyword={keyword} />
                    </ErrorBoundary>
                  </p>
                </div>
              </BoxFrame>
              <BoxFrame>
                <div>
                  <p className="text-grey600 mb-[20px] text-[14px]">경쟁강도</p>

                  <ErrorBoundary fallback={<SystemError />}>
                    <CompetitionRate keyword={keyword} />
                  </ErrorBoundary>
                </div>
              </BoxFrame>
            </div>

            {/* 주석 */}
            <div className="grid grid-cols-[repeat(2,minmax(600px,1fr))] gap-[20px]">
              <BoxFrame isPositionProperty={true}>
                <div className="flex h-full flex-col">
                  <div className="text-grey600 mb-[30px] flex gap-[10px] text-[14px] font-[500]">
                    <p>콘텐츠 추이</p>
                    <TooltipComponent
                      title={
                        '일주일 동안 발생한 조회수의 합계와 분석된 영상의 수를 나타냅니다. \n 검색량의 변화와 비교해 콘텐츠의 수요와 공급을 예측하세요.'
                      }
                    />
                  </div>
                  <ErrorBoundary fallback={<SystemError />}>
                    <ChartContainer keyword={keyword} relatedKeyword={null} />
                  </ErrorBoundary>
                </div>
              </BoxFrame>
              <BoxFrame isPositionProperty={true}>
                <div className="flex h-full flex-col">
                  <p className="text-grey600 mb-[20px] text-[14px]">
                    연관 소재
                  </p>{' '}
                  <ErrorBoundary fallback={<SystemError />}>
                    <CircleForceContainer
                      baseKeyword={keyword}
                      relatedKeyword={null}
                    />
                  </ErrorBoundary>
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

                  <ErrorBoundary fallback={<SystemError />}>
                    <MediaImageCard keyword={keyword} size={3} />
                  </ErrorBoundary>
                  {/* 서버 사이드 렌더링을 아직 안하고 있어서, client 사이드 api response 유무를 따지기 위해  Container를 하나 생성하였다. */}
                  <ErrorBoundary fallback={<SystemError />}>
                    <MediaTextContainer keyword={keyword} />
                  </ErrorBoundary>
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
