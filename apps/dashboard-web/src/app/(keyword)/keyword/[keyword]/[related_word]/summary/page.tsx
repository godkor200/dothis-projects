import Link from 'next/link';

import { cn } from '@/utils/cn';

import BoxFrame from '../../../BoxFrame';

const SummaryTab = ({
  keyword,
  relatedWord,
}: {
  keyword: string;
  relatedWord: string;
}) => {
  return (
    <div className="mt-[20px] flex flex-col gap-[20px]">
      <Link
        href={`/keyword/${keyword}/${relatedWord}/analysis`}
        className="text-[20px] font-bold"
      >
        분석 {'[더보기]'}
      </Link>

      <div className="grid grid-cols-[minmax(600px,2fr)_repeat(2,minmax(300px,1fr))] gap-[20px]">
        <BoxFrame>
          <div>
            <p className="text-grey600 mb-[30px] text-[14px] font-[500]">
              조회수 예측
            </p>

            <div className=" gap-30 flex flex-col text-center">
              <p className="text-grey600  text-[14px]  font-[400]">
                시청자 수요 계산... 소재 전망 계산... 성공 확률 계산... 키워드
                성과 계산... 구독자 경쟁력 계산... 정민 평소 성과 계산...
              </p>

              <div className="text-grey600 flex items-center justify-center gap-[10px] text-[14px] font-[400]">
                <p>조회수</p>
                <p className="text-primary500 px-[10px] text-[20px] font-bold">
                  392,550,100
                </p>
                <p>예상</p>
                {/* 여기 조회수에 그냥 가상선택자 달아주자 */}
              </div>
            </div>
          </div>
        </BoxFrame>
        <BoxFrame>
          <div>
            <p className="text-grey600 mb-[30px] text-[14px] font-[500]">
              소재 전망
            </p>

            <div className=" gap-30 flex flex-col text-center">
              <p className=" px-[10px] text-[20px] font-bold">보통</p>
              <p className="text-grey600  text-[14px]  font-[400]">
                검색에 의한 노출이 줄어드니 추천 알고리즘에 대비한 전략을
                준비하세요.
              </p>
            </div>
          </div>
        </BoxFrame>
        <BoxFrame>
          <div>
            <p className="text-grey600 mb-[30px] text-[14px] font-[500]">
              성공 확률
            </p>

            <div className=" gap-30 flex flex-col text-center">
              <p className=" px-[10px] text-[20px] font-bold">48%</p>
              <p className="text-grey600  text-[14px]  font-[400]">
                이 주제를 다룬 4,269명 중 2,049명이 평소보다 조회수가 높습니다.
              </p>
            </div>
          </div>
        </BoxFrame>
      </div>
      <Link
        href={`/keyword/${keyword}/${relatedWord}/comparison`}
        className="text-[20px] font-bold"
      >
        비교 {'[더보기]'}
      </Link>

      <div className="grid grid-cols-[minmax(300px,1fr)_minmax(1000px,3fr)] gap-[20px]">
        <BoxFrame>
          <div>
            <p className="text-grey600 mb-[30px] text-[14px] font-[500]">
              치킨의 다른 연관 키워드
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
                          'text-green': green === item,
                          'text-sky': blue === item,
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
              소재 전망
            </p>

            <div className=" gap-30 flex flex-col text-center">
              <p className=" px-[10px] text-[20px] font-bold">보통</p>
              <p className="text-grey600  text-[14px]  font-[400]">
                검색에 의한 노출이 줄어드니 추천 알고리즘에 대비한 전략을
                준비하세요.
              </p>
            </div>
          </div>
        </BoxFrame>
      </div>
      <Link
        href={`/keyword/${keyword}/${relatedWord}/insight`}
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
