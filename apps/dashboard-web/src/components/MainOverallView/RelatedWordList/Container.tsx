'use client';

import useGetRankingWordList from '@/hooks/react-query/query/useGetRankingWordList';
import useKeyword from '@/hooks/user/useKeyword';
import { cn } from '@/utils/cn';

import RelationWord from './RelationWord';

const Container = () => {
  const { hashKeywordList } = useKeyword();

  const { data: rank, isLoading } = useGetRankingWordList(hashKeywordList, {
    onError: (data) => {},
  });

  return (
    <div className="bg-grey00 rounded-8 shadow-[inset_0_0_0_2px_rgb(228,228,231)]">
      <div className="grid grid-cols-[minmax(250px,1fr)_140px_150px_150px_150px_100px_minmax(150px,1fr)] items-center gap-[12px] py-[30px] shadow-[inset_0_-1px_0_0_#d4d4d8]">
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
      </div>
      <ul>
        {/* props드릴링이 생기는 것보다는 각기 다르게 호출해주자. */}
        {rank?.map((item, index, arr) => (
          <RelationWord
            key={index + item.relword}
            arr={arr}
            index={index}
            keyword={item.keyword}
            relword={item.relword}
          />
        ))}
      </ul>
    </div>
  );
};

export default Container;
