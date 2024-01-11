import InView from '@/components/common/InView/InView';
import { cn } from '@/utils/cn';

const TrendingPage = () => {
  return (
    <div className="mx-auto min-h-screen max-w-[1100px]">
      <div className="flex items-center gap-[28px] py-[30px]">
        <p className="text-grey700 text-[20px] font-bold">키워드 {'1023'}개</p>
        <p className="text-grey500 font-bold">{'2024-01-07 - 2024-01-14'}</p>
        <button className="text-primary500 bg-primary100 rounded-8 ml-auto px-4 py-2 text-[14px]">
          엑셀 데이터로 다운로드 받기
        </button>
      </div>
      <div className="bg-grey00 rounded-8 shadow-[inset_0_0_0_2px_rgb(228,228,231)]">
        <div className="grid grid-cols-[40px_140px_140px_140px_140px_140px_minmax(150px,1fr)] items-center gap-[12px] py-[30px] pl-[18px] shadow-[inset_0_-1px_0_0_#d4d4d8]">
          <div className="text-grey500 text-[14px] font-bold">순위</div>
          <div className="text-grey500 text-[14px] font-bold">키워드</div>
          <div className="text-grey500 text-[14px] font-bold">
            대표 카테고리
          </div>
          <div className="text-grey500  text-[14px] font-bold">주간 조회수</div>
          <div className="text-grey500  text-[14px] font-bold">영상 수</div>
          <div className="text-grey500 text-[14px] font-bold">경쟁강도</div>
          <div className="text-grey500  text-[14px] font-bold">
            구독자 10만 이상 채널
          </div>
        </div>
        <InView onChange={() => {}} threshold={0.4}>
          <ul>
            {[...new Array(5)].map((item, index, arr) => (
              <div
                key={index}
                className={cn(
                  'grid grid-cols-[40px_140px_140px_140px_140px_140px_minmax(150px,1fr)] pl-[18px] items-center gap-[12px] ',
                  {
                    'shadow-[inset_0_-2px_0_0_#f4f4f5]':
                      index !== arr.length - 1,
                  },
                )}
              >
                <div className="flex items-center gap-[10px]">
                  <div className="text-grey700 py-[26px] text-[14px] font-bold ">
                    {'test'}
                  </div>
                </div>
                <div className="text-grey700 py-[26px]text-[14px] font-bold ">
                  test
                </div>
                <div className="text-grey700 py-[26px]  text-[14px] font-bold ">
                  test
                </div>
                <div className="text-grey700 py-[26px]  text-[14px] font-bold ">
                  test
                </div>
                <div className="text-grey700 py-[26px]  text-[14px] font-bold ">
                  ttt
                </div>
                <div className="text-grey700 py-[26px] text-[14px] font-bold ">
                  ttt
                </div>
                <div className="text-grey700 py-[26px] text-[14px] font-bold ">
                  ttt
                </div>
              </div>
            ))}
          </ul>
        </InView>
      </div>
    </div>
  );
};

export default TrendingPage;
