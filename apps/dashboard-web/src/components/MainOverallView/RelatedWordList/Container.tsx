'use client';

import useGetRankingRelWords from '@/hooks/react-query/query/useGetRankingRelWords';
import useGetRankingWordList from '@/hooks/react-query/query/useGetRankingWordList';
import useGetRelWords from '@/hooks/react-query/query/useGetRelWords';
import useKeyword from '@/hooks/user/useKeyword';
import { cn } from '@/utils/cn';

const Container = () => {
  const { data: relword } = useGetRelWords();
  const { hashKeywordList } = useKeyword();
  const { data: rank } = useGetRankingWordList(hashKeywordList);

  return (
    <div className="bg-grey00 rounded-8 shadow-[inset_0_0_0_2px_rgb(228,228,231)]">
      <div className="grid grid-cols-[minmax(250px,1fr)_140px_110px_110px_100px_100px_minmax(150px,1fr)_minmax(150px,1fr)] items-center gap-[12px] py-[30px] shadow-[inset_0_-1px_0_0_#d4d4d8]">
        <div className="text-grey500 pl-[8px] text-[14px] font-bold">소재</div>
        <div className="text-grey500 pl-[8px] text-[14px] font-bold">
          키워드
        </div>
        <div className="text-grey500 pl-[8px] text-[14px] font-bold">
          기대 조회 수(배)
        </div>
        <div className="text-grey500 pl-[8px] text-[14px] font-bold">
          일일 조회 수
        </div>
        <div className="text-grey500 pl-[8px] text-[14px] font-bold">
          누적 영상 수
        </div>
        <div className="text-grey500 pl-[8px] text-[14px] font-bold">
          경쟁강도
        </div>
        <div className="text-grey500 pl-[8px] text-[14px] font-bold">
          구독자 10만 이상 채널
        </div>
        <div className="text-grey500 pl-[8px] text-[14px] font-bold">
          구독자 수 비슷한 채널
        </div>
      </div>
      <ul>
        {rank?.map((item, index, arr) => (
          <div
            key={item + index}
            className={cn(
              'grid grid-cols-[minmax(250px,1fr)_140px_110px_110px_100px_100px_minmax(150px,1fr)_minmax(150px,1fr)] items-center gap-[12px] ',
              {
                'shadow-[inset_0_-2px_0_0_#f4f4f5]': index !== arr.length - 1,
              },
            )}
          >
            <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
              {item}
            </div>
            <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
              키워드
            </div>
            <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
              기대 조회 수(배)
            </div>
            <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
              일일 조회 수
            </div>
            <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
              누적 영상 수
            </div>
            <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
              경쟁강도
            </div>
            <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
              구독자 10만 이상 채널
            </div>
            <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
              구독자 수 비슷한 채널
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Container;
