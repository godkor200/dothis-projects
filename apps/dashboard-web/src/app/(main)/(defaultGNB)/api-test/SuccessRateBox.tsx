import useGetSuccessRate from '@/hooks/react-query/query/useGetSuccessRate';
import { useSelectedWord } from '@/store/selectedWordStore';

const SuccessRateBox = () => {
  const selectedWord = useSelectedWord();
  const { data } = useGetSuccessRate(selectedWord);
  return <div>성공확률 box</div>;
};

export default SuccessRateBox;
