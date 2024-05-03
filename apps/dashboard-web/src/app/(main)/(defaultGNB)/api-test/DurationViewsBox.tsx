import useGetDurationViews from '@/hooks/react-query/query/useGetDurationViews';
import { useSelectedWord } from '@/store/selectedWordStore';

const DurationViewsBox = () => {
  const selectedWord = useSelectedWord();

  const { data } = useGetDurationViews(selectedWord);
  return <div>영상 길이별 조회수 </div>;
};

export default DurationViewsBox;
