import useGetPerformanceData from '@/hooks/react-query/query/useGetPerformanceData';
import { useSelectedWord } from '@/store/selectedWordStore';

const PerformanceBox = () => {
  const selectedWord = useSelectedWord();
  const { data } = useGetPerformanceData(selectedWord);
  return <div>퍼포먼스 박스</div>;
};

export default PerformanceBox;
