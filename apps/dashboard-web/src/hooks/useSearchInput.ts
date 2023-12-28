import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { UseMutateFunction } from '@tanstack/react-query';
import type { ClientArgs } from '@ts-rest/core';
import type { UseMutationResult } from '@ts-rest/react-query';
import { useCallback, useMemo } from 'react';

import { convertKeywordsToArray } from '@/utils/keyword';

import useGetUserInfo from './react-query/query/useGetUserInfo';

const useSearchInput = () => {
  const { data: userData } = useGetUserInfo();

  /**
   * @description 해당 변수는 활성화된 Tag(키워드,검색어)를 비활성화할 때 비활성화 가능여부를 return합니다
   * @description 최소한 1개 이상의 활성화된 Tag를 가지고 있어야하므로, 그 조건을 boolean 형태로 반환합니다.
   * @returns 활성화 Tag가 1개있을 시 더이상 비활성화가 불가능하므로 false를 반환
   *
   */
  const isHashedTag = useMemo(() => {
    return convertKeywordsToArray(userData?.personalizationTag)
      .concat(convertKeywordsToArray(userData?.searchWord))
      .filter((item) => item.endsWith('#')).length === 1
      ? false
      : true;
  }, [userData?.personalizationTag, userData?.searchWord]);

  /**
   * @description searchWord를 추가 생성할 때 사용되는 함수입니다.
   * @param userKeyword userInfo api response로 받은 searchword를 받습니다.
   * @param keyword 추가하려하는 keyword를 받습니다.
   * @var index 추가하려는 keyword가 이미 userKeyword에 포함되어있는지 확인합니다.
   * @var hashindex 추가하려는 keyword가 활성화가 되어있는 상태로 이미 userKeyword에 포함되어있는지 확인합니다.
   * @returns mutate -> body에서 필요로 하는 형태인 배열로 반환해서 return합니다.
   * @returns 이미 userKeyword에 추가가 되어있으면 #을 붙인상태로 return하며, 없을경우 unShift로 맨 앞에 추가하려 반환합니다.
   */
  const createSearchWord = useCallback(
    (
      userKeyword: string | undefined | null,
      personalizationTag: string | undefined | null,
      keyword: string,
      keywordMutationResult: UseMutationResult<
        typeof apiRouter.user.putUpdatePersonalTag,
        ClientArgs
      >,
    ) => {
      const dataArray = userKeyword ? userKeyword.split(',') : [];

      const personalizationDataArray = personalizationTag
        ? personalizationTag.split(',')
        : [];

      const index = dataArray.indexOf(keyword);

      const hashindex = dataArray.indexOf(`${keyword}#`);

      // personalizationTag 에도 중복체크가 필요해서 넣었습니다.
      const personalizationIndex = personalizationDataArray.indexOf(keyword);

      const personalizationHashIndex = personalizationDataArray.indexOf(
        `${keyword}#`,
      );

      if (
        index !== -1 ||
        hashindex !== -1 ||
        personalizationIndex !== -1 ||
        personalizationHashIndex !== -1
      ) {
        if (hashindex !== -1 || personalizationHashIndex !== -1) {
          return dataArray;
        }

        if (personalizationIndex !== -1) {
          keywordMutationResult.mutate({
            body: {
              tag: addHashAndConvertToArray(personalizationTag, keyword),
            },
          });
        }

        dataArray[index] = `${keyword}#`;
      } else {
        dataArray.unshift(`${keyword}#`);
      }

      return dataArray;
    },
    [],
  );

  /**
   * @description personalization 및 searchword의 keyword를 활성화할 때 사용되는 함수입니다.
   * @param userKeyword userInfo api response로 받은 personalization 혹은 searchword를 받습니다.
   * @param keyword 활성화하려하는 keyword를 받습니다.
   * @returns mutate -> body에서 필요로 하는 형태인 배열로 반환해서 return합니다.
   * @returns 기존 array에 매칭되는 keyword뒤에 #을 추가해서 반환합니다.
   */
  const addHashAndConvertToArray = useCallback(
    (userKeyword: string | undefined | null, keyword: string) => {
      if (userKeyword === null || userKeyword === undefined) {
        throw new Error('데이터를 저장하는데 문제가 생겼습니다.');
      }
      // 문자열을 콤마(,)로 분리하여 배열로 만듭니다.
      const dataArray = userKeyword.split(',');

      // 배열 요소 중에서 keyword와 일치하는 부분을 찾아서 '#'을 추가합니다.
      for (let i = 0; i < dataArray.length; i++) {
        const regex = new RegExp(`^${keyword}$`);
        if (regex.test(dataArray[i])) {
          dataArray[i] += '#';
        }
      }

      return dataArray;
    },
    [],
  );

  /**
   * @description personalization 및 searchword의 keyword를 비활성화할 때 사용되는 함수입니다.
   * @param userKeyword userInfo api response로 받은 personalization 혹은 searchword를 받습니다.
   * @param keyword 비활성화하려하는 keyword를 받습니다.
   * @var isHashedTag isHashTag 여부를 판별해서 비활성화 가능한지 안한지 여부를 따집니다.
   * @returns mutate -> body에서 필요로 하는 형태인 배열로 반환해서 return합니다.
   * @returns 기존 array에 매칭되는 keyword뒤에 #을 제거해서 반환합니다.
   */
  const removeHashAndConvertToArray = useCallback(
    (userKeyword: string | undefined | null, keyword: string) => {
      if (userKeyword === null || userKeyword === undefined) {
        throw new Error('데이터를 저장하는데 문제가 생겼습니다.');
      }

      // 문자열을 콤마(,)로 분리하여 배열로 만듭니다.
      const dataArray = userKeyword.split(',');

      if (!isHashedTag) {
        return dataArray;
      }

      // 배열 요소 중에서 keyword와 일치하는 부분을 찾아서 '#'을 제거합니다.
      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].includes(keyword)) {
          dataArray[i] = dataArray[i].replace('#', '');
        }
      }

      return dataArray;
    },
    [isHashedTag],
  );

  /**
   * @description searchword의 keyword를 삭제할 때 사용되는 함수입니다.
   * @param userKeyword userInfo api response로 받은 searchword를 받습니다.
   * @param keyword 제거하려는 keyword를 받습니다.
   * @var isHashedTag isHashTag 여부를 판별해서 비활성화 가능한지 안한지 여부를 따집니다. &&  제거 시 제거하려는 키워드가 활성화 되어있는지 조건을 판별합니다.
   * @returns mutate -> body에서 필요로 하는 형태인 배열로 반환해서 return합니다.
   * @returns 기존 array에 매칭되는 keyword를 필터링한 array를 반환합니다.
   */
  const deleteKeywordAndConvertToArray = useCallback(
    (userKeyword: string | undefined | null, keyword: string) => {
      if (userKeyword === null || userKeyword === undefined) {
        throw new Error('데이터를 저장하는데 문제가 생겼습니다.');
      }

      const dataArray = userKeyword.split(',');

      if (!isHashedTag && keyword.endsWith('#')) {
        return dataArray;
      }

      const resultArray = dataArray.filter((item) => {
        const regex = new RegExp(`^${keyword}(#)?$`);
        return !regex.test(item);
        // return !(
        //     item === keyword ||
        //     (item === keyword + '#' && item.endsWith('#'))
        //   );
      });

      return resultArray;
    },
    [isHashedTag],
  );

  /**
   * @description personalization의 keyword를 초기화할 때 사용되는 함수입니다.
   * @param userKeyword userInfo api response로 받은 personalization을 받습니다.
   * @returns mutate -> body에서 필요로 하는 형태인 배열로 반환해서 return합니다.
   * @returns 기존 personalization에서 첫번째 요소를 제외한 나머지요소에 #을 제거한 array형태를 반환합니다.
   */
  const resetKeyword = useCallback((userKeyword: string | undefined | null) => {
    if (userKeyword === null || userKeyword === undefined) {
      throw new Error('데이터를 생성하는데 문제가 생겼습니다.');
    }

    const dataArray = userKeyword.split(',');

    for (let i = 1; i < dataArray.length; i++) {
      if (!dataArray[0].endsWith('#')) {
        dataArray[0] += '#';
      }
      dataArray[i] = dataArray[i].replace('#', '');
    }

    return dataArray;
  }, []);

  return {
    createSearchWord,
    addHashAndConvertToArray,
    removeHashAndConvertToArray,
    deleteKeywordAndConvertToArray,
    resetKeyword,
  };
};

export default useSearchInput;
