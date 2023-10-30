import useGetUserInfo from '@/query/user/useGetUserInfo';
import {
  convertKeywordsToArray,
  getHashKeyword,
  isHashKeyword,
} from '@/utils/keyword';

const guestKeyword = ['먹방', '와인'];

const useKeyword = () => {
  const { data } = useGetUserInfo();

  // 다른 mutate도 추가할 생각

  return {
    hashKeywordList: isHashKeyword(
      convertKeywordsToArray(data?.personalizationTag),
    )
      ? getHashKeyword(convertKeywordsToArray(data?.personalizationTag))
      : guestKeyword,
  };
};

export default useKeyword;
