import { GUEST_KEYWORD } from '@/constants/guestKeyword';
import useGetUserInfo from '@/query/user/useGetUserInfo';
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

  return {
    hashKeywordList: isHashKeyword(
      convertKeywordsToArray(data?.personalizationTag),
    )
      ? getHashKeyword(convertKeywordsToArray(data?.personalizationTag))
      : GUEST_KEYWORD,
  };
};

export default useKeyword;
