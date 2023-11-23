import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { UseQueryOptions } from '@ts-rest/react-query';

import { USER_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

/**
 * getOwnInfo api -> 유저정보 api를 만들어놓은 커스텀 hook
 * @param queryOptions useQuery options을 담을 수 있는 객체
 * @returns 기존 useQuery 리턴타입을 유지하면서 data는 queryResult.data?.body.data 형식으로 보낸다.
 * --- 특이사항
 * 기존 data 형식이 queryResult.data?.body.data 처럼 접근자(체인닝?)를 사용해서 가져오는게 에러사항이 있을 것 같아서 저렇게 축약해서 넣어놓았지만,
 * 저렇게 축약하니 UseQueryResult형식에 위배가 되어서 return타입에 넣어주지 못하였습니다.
 * 또한 data.body.status코드를 못쓰는 상황도 있지만 굳이 필요할까 싶어서 저렇게 작성하였습니다.
 */
const useGetUserInfo = (
  queryOptions?: UseQueryOptions<typeof apiRouter.auth.getOwnInfo>,
) => {
  const queryResult = apiClient(1).auth.getOwnInfo.useQuery(
    USER_KEY.all,
    {},
    queryOptions,
  );

  return { ...queryResult, data: queryResult.data?.body.data };
};

export default useGetUserInfo;
