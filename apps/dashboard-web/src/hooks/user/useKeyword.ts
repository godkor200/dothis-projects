import { GUEST_KEYWORD } from '@/constants/guestKeyword';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import { useIsSignedIn } from '@/store/authStore';
import {
  convertKeywordsToArray,
  getHashKeyword,
  isHashKeyword,
} from '@/utils/keyword';

/**
 * 해당 hook은 GUEST일 경우에 LocalStorage에 따른 hook을 사용하면서 달라질 수 있어서 아직 수정하지는 않았습니다.
 * @returns
 */
const useKeyword = () => {
  const { data } = useGetUserInfo();

  // 다른 mutate도 추가할 생각
  const isSignedIn = useIsSignedIn();

  const isNotSetTags = !data?.personalizationTag;

  return {
    hashKeywordList:
      isSignedIn || !isNotSetTags
        ? getHashKeyword(convertKeywordsToArray(data?.personalizationTag))
        : GUEST_KEYWORD,
    // GUEST_KEYWORD에 랜덤요소로 하나만 설정되게끔 하고 싶었는데,  server와 client 랜덤이 다르게 들어가서 Hydration 에러가 발생.
  };
};

export default useKeyword;
