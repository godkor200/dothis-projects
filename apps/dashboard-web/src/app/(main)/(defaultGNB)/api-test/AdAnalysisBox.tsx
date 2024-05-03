import useGetAdsInformation from '@/hooks/react-query/query/useGetAdsInformation';
import useGetTopViewedAds from '@/hooks/react-query/query/useGetTopViewedAds';
import { useSelectedWord } from '@/store/selectedWordStore';

const AdAnalysisBox = () => {
  const selectedWord = useSelectedWord();

  const { data: adsInfo } = useGetAdsInformation(selectedWord);

  const { data: adsList } = useGetTopViewedAds(selectedWord);
  return <div>광고분석 컴포넌트 </div>;
};

export default AdAnalysisBox;
