import Link from 'next/link';

import D3Axis from '@/components/common/Charts/D3Axis';
import D3Chart from '@/components/common/Charts/D3Chart';

import BoxFrame from '../BoxFrame';
import MediaImageCard from '../MediaImageCard';
import MediaTextCard from '../MediaTextCard';
import CircleForceChart from './CircleForceChart';

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
                  <p className="text-center text-[20px] font-bold">먹방</p>
                </div>
              </BoxFrame>
              <BoxFrame>
                <div>
                  <p className="text-grey600 mb-[20px] text-[14px]">경쟁강도</p>
                  <p className="text-center text-[20px] font-bold">경쟁 과열</p>
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

                  <div className="flex justify-between">
                    <div className="w-[222px] px-[12px] py-[15px] text-center">
                      <p className="text-grey700 text-[14px]">조회수 합계</p>
                      <p className="text-grey900 text-[18px] font-bold">
                        12345678
                      </p>
                    </div>
                    <div className="w-[222px] px-[12px] py-[15px] text-center">
                      <p className="text-grey700 text-[14px]">검색량 변동</p>
                      <p className="text-grey900 text-[18px] font-bold">42%</p>
                    </div>
                    <div className="w-[222px] px-[12px] py-[15px] text-center">
                      <p className="text-grey700 text-[14px]">발행 영상 수</p>
                      <p className="text-grey900 text-[18px] font-bold">1234</p>
                    </div>
                  </div>
                  <D3Axis />
                </div>
              </BoxFrame>
              <BoxFrame>
                <div>
                  <p className="text-grey600 mb-[20px] text-[14px]">
                    연관 소재
                  </p>
                  <CircleForceChart keyword={keyword} /> <D3Chart />
                </div>
              </BoxFrame>
            </div>

            {/* 주석 */}
            <div className="grid grid-cols-[repeat(1,minmax(1300px,1fr))] gap-[20px]">
              <BoxFrame>
                <div className="flex flex-col gap-[20px] overflow-hidden">
                  <p className="text-grey600 mb-[20px] text-[14px]">
                    <span className="text-primary500">양념치킨</span> 관련 인기
                    유튜브
                  </p>
                  <div className="flex justify-between gap-[24px] ">
                    <MediaImageCard />
                  </div>

                  <p className="text-grey600 mb-[20px] text-[14px]">
                    <span className="text-primary500">양념치킨</span> 관련 뉴스
                  </p>
                  <div className="flex justify-between gap-[24px]">
                    <MediaTextCard />
                  </div>
                </div>
              </BoxFrame>
            </div>

            {/* 주석 */}
          </div>
        </div>
      </div>
      <div></div>
      <Link href={`/keyword/${keyword}/중국어`}>
        연관어로 이동 클릭해주세요
      </Link>
    </div>
  );
};

export default Page;
