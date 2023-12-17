'use client';

import useGetRankingRelWords from '@/hooks/react-query/query/useGetRankingRelWords';
import useGetRelWords from '@/hooks/react-query/query/useGetRelWords';
import useKeyword from '@/hooks/user/useKeyword';

const Container = () => {
  const { data: relword } = useGetRelWords();
  const { hashKeywordList } = useKeyword();
  const { data: rank } = useGetRankingRelWords(hashKeywordList[0]);

  return (
    <>
      {rank?.map((item) => (
        <div>{item}</div>
      ))}
    </>
  );
};

export default Container;
