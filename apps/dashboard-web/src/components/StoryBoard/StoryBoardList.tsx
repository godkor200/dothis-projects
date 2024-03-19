'use client';

import Link from 'next/link';
import { useCallback } from 'react';

import useGetStoryBoardInfiniteQuery from '@/hooks/react-query/query/useGetStoryBoardInfiniteQuery';

import InView from '../common/InView/InView';
import StoryBoardCard from './StoryBoardCard';

/**
 * TODO: Failed handling, Skeleton, No data
 */
interface Props {
  perPage?: number;
  offset?: number;
  sort?: 'id' | 'userId' | 'title' | 'createdAt' | 'updatedAt';
  order?: 'asc' | 'desc';
}

const StoryBoardList = ({ perPage, offset, sort, order }: Props) => {
  const {
    data: sotryboardData,
    fetchNextPage,
    hasNextPage,
  } = useGetStoryBoardInfiniteQuery({ perPage, offset, sort, order });

  const handleFetchNextPage = useCallback(
    (isInview: boolean) => {
      if (isInview && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage],
  );

  const sotryboardList = sotryboardData?.pages.flatMap(
    (page) => page.body.data?.data,
  );

  return (
    <InView onChange={handleFetchNextPage} threshold={0.5}>
      {sotryboardList?.map((v) =>
        v?.id !== undefined ? (
          <Link href={`/storyboard/${v.id}`}>
            <StoryBoardCard
              storyBoardId={String(v.id)}
              title={v.title ?? '제목 없음'}
              updatedAt={String(v.updatedAt)}
            />
          </Link>
        ) : null,
      )}
    </InView>
  );
};

export default StoryBoardList;
