'use client';

import useGetKeywordInfo from '@/hooks/react-query/query/useGetKeywordInfo';
import useGetRankingRelWords from '@/hooks/react-query/query/useGetRankingRelWords';

const RelatedKeywordList = ({
  baseKeyword,
  relatedKeyword,
}: {
  baseKeyword: string;
  relatedKeyword: string;
}) => {
  const { data } = useGetRankingRelWords(baseKeyword);
};

export default RelatedKeywordList;
