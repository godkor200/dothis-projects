import useGetRelWords from '@/hooks/react-query/query/useGetRelWords';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import useKeyword from '@/hooks/user/useKeyword';
import { convertKeywordsToArray, getHashKeyword } from '@/utils/keyword';

const KeywordSearchResult = () => {
  const { data } = useGetUserInfo();

  const hasTags = getHashKeyword(
    convertKeywordsToArray(data?.personalizationTag, data?.searchWord),
  );

  const { data: relWords } = useGetRelWords();

  // 해당 로직은 백엔드에서 여러 키워드로 연관어를 뽑는 작업이 마무리되면 수정이 필요한 페이지입니다.
  return (
    <h1 className="typo-h2 bg-primary50 mb-[3.1rem] mt-[60px] flex flex-col rounded-2xl py-10 pl-12 text-center">
      <span className="mb-1">
        <span>{hasTags[0]}</span>{' '}
        {hasTags.length > 1 && `외 ${hasTags.length - 1}개`} 키워드에서 다루기
        좋은 소재는
      </span>
      <span>
        <em className="text-primary500">
          '{relWords?.relWords.split(',').slice(0, 3).join(',')}'
        </em>
        입니다.
      </span>
    </h1>
  );
};

export default KeywordSearchResult;
