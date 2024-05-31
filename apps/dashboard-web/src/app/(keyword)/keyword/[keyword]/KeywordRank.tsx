'use client';

import useGetWeeklyKeyword from '@/hooks/react-query/query/useGetWeeklyKeyword';

const KeywordRank = ({ keyword }: { keyword: string }) => {
  const { data, fetchNextPage, hasNextPage } = useGetWeeklyKeyword({
    keywordList: [keyword],
  });

  const matchedKeyword = data?.find((item) => item.keyword === keyword);

  return (
    <>
      {matchedKeyword ? (
        matchedKeyword.ranking
      ) : (
        <span className="text-grey600">분석중</span>
      )}
    </>
  );
};
export default KeywordRank;
