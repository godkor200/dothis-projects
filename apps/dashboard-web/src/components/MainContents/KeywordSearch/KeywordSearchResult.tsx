import useGetRelWords from '@/hooks/react-query/query/useGetRelWords';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import useKeyword from '@/hooks/user/useKeyword';
import { convertKeywordsToArray, getHashKeyword } from '@/utils/keyword';

const KeywordSearchResult = () => {
  const { hashKeywordList } = useKeyword();

  const { data: relWords } = useGetRelWords();

  // 해당 로직은 백엔드에서 여러 키워드로 연관어를 뽑는 작업이 마무리되면 수정이 필요한 페이지입니다.
  // h1 mt class에 calc (24px은 KeywordSlide컴포넌트의 margin collapse현상, 52px은 SearchInput 컴포넌트의 abolute화로 인한 영역만큼 크기)
  return (
    <h1 className="bg-primary50 mx-auto mb-[3.1rem] mt-[calc(24px+52px+60px)] flex max-w-[680px] flex-col rounded-2xl py-[18px] text-center text-[20px] font-bold">
      <span className="mb-1">
        <span>{hashKeywordList[0]}</span>{' '}
        {hashKeywordList.length > 1 && `외 ${hashKeywordList.length - 1}개`}{' '}
        키워드에서 다루기 좋은 소재는
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
