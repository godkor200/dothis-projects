import { getCookie } from 'cookies-next';
import { random } from 'lodash';
import { cookies } from 'next/headers';
import { useEffect, useState } from 'react';

import { isServer } from '@/constants/dev';
import { GUEST_KEYWORD } from '@/constants/guest';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import { useIsSignedIn } from '@/store/authStore';
import { useRandomIndex } from '@/store/randomIndexStore';
import { convertKeywordsToArray, getHashKeyword } from '@/utils/keyword';

/**
 * 해당 hook은 GUEST일 경우에 LocalStorage에 따른 hook을 사용하면서 달라질 수 있어서 아직 수정하지는 않았습니다.
 * @returns
 */
const useKeyword = () => {
  const { data } = useGetUserInfo();

  // 다른 mutate도 추가할 생각
  const isSignedIn = useIsSignedIn();

  const isNotSetTags = !data?.personalizationTag;

  // client에서 랜덤인덱스를 추가하기 위해 zustand로 넣고 있습니다.
  const randomIndex = useRandomIndex();

  // 지금은 store 에서 임의로 useEffect상에서 접근했지만, 나중에는 미들웨어단 임의 키워드로 searchparams로 임의로 넣어주자
  // 난수는 hydrate 때문에 안됨,  cookie로 인덱스로 지정해서 시도해보았지만 불가능하였다.

  return {
    hashKeywordList:
      !isNotSetTags && isSignedIn
        ? getHashKeyword(
            convertKeywordsToArray(data?.personalizationTag, data?.searchWord),
          )
        : [GUEST_KEYWORD[randomIndex]],

    isGuest: !(isSignedIn || !isNotSetTags),
    // GUEST_KEYWORD에 랜덤요소로 하나만 설정되게끔 하고 싶었는데,  server와 client 랜덤이 다르게 들어가서 Hydration 에러가 발생.
  };
};

export default useKeyword;
