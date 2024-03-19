import type { apiRouter } from '@dothis/dto';
import type { UseInfiniteQueryOptions } from '@ts-rest/react-query';

import { STORYBOARD_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

interface Props {
  perPage?: number;
  offset?: number;
  sort?: 'id' | 'userId' | 'title' | 'createdAt' | 'updatedAt';
  order?: 'asc' | 'desc';
  queryOptions?: UseInfiniteQueryOptions<
    typeof apiRouter.storyBoard.getManyStoryBoard
  >;
}

const useGetStoryBoardInfiniteQuery = ({
  perPage = 30,
  offset = 0,
  sort = 'updatedAt',
  order = 'asc',
  queryOptions,
}: Props) => {
  const queryResults = apiClient(
    1,
  ).storyBoard.getManyStoryBoard.useInfiniteQuery(
    STORYBOARD_KEY.list([
      {
        sort,
        order,
      },
    ]),
    ({ pageParam = 1 }) => ({
      // ({ pageParam = { page: 1, offset: offset, limit: perPage } }) => ({
      query: {
        limit: perPage,
        page: pageParam,
        offset: offset,
        // limit: pageParam.limit,
        // page: pageParam.page,
        // offset: pageParam.skip,
        filed: sort,
        param: order,
      },
    }),
    {
      ...queryOptions,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.status === 200
          ? lastPage.body.data?.count &&
            lastPage.body.data?.count > allPages.length * perPage
            ? allPages.length + 1
            : undefined
          : undefined;
        // return lastPage.status === 200
        //   ? lastPage.body.data?.count &&
        //     lastPage.body.data?.count > allPages.length * perPage
        //     ? { limit: perPage, skip: allPages.length * perPage }
        //     : undefined
        //   : undefined;
      },
    },
  );
  return queryResults;
};

export default useGetStoryBoardInfiniteQuery;
