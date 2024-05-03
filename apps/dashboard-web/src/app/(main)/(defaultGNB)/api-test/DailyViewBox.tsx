import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import useGetVideoCount from '@/hooks/react-query/query/useGetVideoCount';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { useSelectedWord } from '@/store/selectedWordStore';

const DailyViewBox = () => {
  const selectedWord = useSelectedWord();

  const { data: dailyviewData } = useGetDailyView(selectedWord);

  const { data: videoCountData } = useGetVideoCount(selectedWord);

  return <div>데일리뷰 박스</div>;
};

export default DailyViewBox;
