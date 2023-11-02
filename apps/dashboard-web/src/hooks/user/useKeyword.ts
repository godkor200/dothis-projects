import { GUEST_KEYWORD } from '@/constants/guestKeyword';
import useGetUserInfo from '@/query/user/useGetUserInfo';
import {
  convertKeywordsToArray,
  getHashKeyword,
  isHashKeyword,
} from '@/utils/keyword';

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
