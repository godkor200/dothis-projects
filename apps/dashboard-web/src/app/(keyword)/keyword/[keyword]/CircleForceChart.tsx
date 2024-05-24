'use client';

import useGetRankingWordList from '@/hooks/react-query/query/useGetRankingWordList';

const CircleForceChart = ({ keyword }: { keyword: string }) => {
  const { data } = useGetRankingWordList([keyword]);

  return (
    <p className="text-grey900 truncate text-center text-[18px] font-bold">
      {!!data.length && (
        <span className="text-primary500">{data[0].relword}</span>
      )}{' '}
      를 소재로 만들어진 영상의 성과가 가장 좋아요
    </p>
  );
};

export default CircleForceChart;
