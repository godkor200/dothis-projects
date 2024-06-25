'use client';

import useGetRankingRelWords from '@/hooks/react-query/query/useGetRankingRelWords';

const CircleForceChart = ({ keyword }: { keyword: string }) => {
  const { data } = useGetRankingRelWords(keyword);

  console.log(data);

  return (
    <>
      {!!data?.length && (
        <p className="text-grey900 truncate text-center text-[18px] font-bold">
          <span className="text-primary500">{data[0]}</span>를 소재로 만들어진
          영상의 성과가 가장 좋아요
        </p>
      )}
    </>
  );
};

export default CircleForceChart;
