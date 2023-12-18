import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { UseQueryOptions } from '@ts-rest/react-query';

import { RELATIONWORD_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

import useGetUserInfo from './useGetUserInfo';

/**
 * 쿼리 훅 내에서 의존성이 필요한 keyword를 가져오기 위해 useGetUserInfo를 통해 personalizationTag와 키워드 util함수를 이용해 키워드를 가져온다
 * @param queryOptions
 * @returns 기존 useQuery 리턴타입을 유지하면서 data는 queryResult.data?.body.data 형식으로 보낸다. (참고: 현재 data.relwords 타입은 '먹방,와인' string형식입니다.)
 * --- 특이사항
 * 임시로 키워드는 하나만 설정되게끔 작성하였습니다. 현재 getRelwords api가 2개의 keyword는 아직 api가 지원X
 * 유저에게 최종적으로 현재 선택된 키워드가 없을 떄 guestKeyword가 필요하여, isLoading으로 enbled를 걸어줌.
 * 키워드를 해당 훅에 파라미터로 넣을 수 있도록 고민해보았지만, enbled loading 값이 필요하여 이런 형태로 작성하였습니다.
 */
const useGetRelWords = (
  keyword: string | null,
  queryOptions?: UseQueryOptions<typeof apiRouter.relwords.getRelWords>,
) => {
  const { isLoading } = useGetUserInfo();

  const queryResult = apiClient(1).relwords.getRelWords.useQuery(
    RELATIONWORD_KEY.list([{ keyword: keyword }]),
    {
      params: {
        keyword: keyword!,
      },
    },
    { ...queryOptions, enabled: !isLoading && !!keyword },
  );
  queryResult.data;
  return {
    ...queryResult,
    data: queryResult.data?.body.data,
  };
};
export default useGetRelWords;
