import useGetInfluentialChannel from '@/hooks/react-query/query/useGetInfluentialChannel';
import { useSelectedWord } from '@/store/selectedWordStore';

const InfluentialChannelBox = () => {
  const selectedWord = useSelectedWord();
  const { data } = useGetInfluentialChannel(selectedWord);

  return <div>영향력 있는 채널 box</div>;
};

export default InfluentialChannelBox;
