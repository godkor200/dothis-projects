import useKeyword from '@/hooks/user/useKeyword';
import useGetRelWords from '@/query/user/useGetRelWords';

const Title = () => {
  const { hashKeywordList } = useKeyword();

  const { data: relWords } = useGetRelWords();

  return (
    <h1 className="typo-h1 bg-primary50 mb-[3.1rem] mt-[60px] flex flex-col rounded-2xl py-10 pl-12 text-center">
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

export default Title;
