import type { apiRouter } from '@dothis/dto';
import type { UseQueryOptions } from '@ts-rest/react-query';
import type { DeepRequired } from 'react-hook-form';

import { KEYWORD_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

/**
 * 유저에 키워드를 가져옵니다. ex({channel_keywords : ['산악회', '스티브', '최준', '이즈', '학번'], channel_tags : ['피식대학', '싸이월드', '05학번이즈백', '소주'] })
 * @param queryOptions
 * @returns
 * --- 특이사항
 * 해당 네이밍을 수정할까 고민 중입니다.
 * 정의한 dto 네이밍에 따라 getKeyword라는 네이밍을 사용했지만, 가져오는 데이터는 유저에 channel에서 추출한 keyword 및 tags를 반환하기 때문에 네이밍을 그에 맞게 수정할지 고민 중입니다.
 */
const useGetKeyword = (
  queryOptions?: UseQueryOptions<typeof apiRouter.user.getUserKeyword>,
) => {
  const queryResult = apiClient(2).user.getUserKeyword.useQuery(
    KEYWORD_KEY.all,
    {},
    { ...queryOptions },
  );

  const requiredQueryResult = queryResult.data as DeepRequired<
    typeof queryResult.data
  >;

  return {
    ...queryResult,
    data: requiredQueryResult?.body.data,
  };
};

export default useGetKeyword;
