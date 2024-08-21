import type { TKeywords } from '@/types/common';
import {
  getTotalSearchRatio,
  handleNaverAdsLessThanToNumber,
} from '@/utils/naver-search/common';

import useGetNaverAds from '../react-query/query/useGetNaverAds';
import useGetNaverSearchRatio from '../react-query/query/useGetNaverSearchRatio';

const useNaverDataHandler = ({ baseKeyword, relatedKeyword }: TKeywords) => {
  /**
   * 네이버 통합검색량 수치 (퍼센테이지)
   */

  const { data } = useGetNaverSearchRatio({
    keyword: baseKeyword,
    relword: relatedKeyword,
  });

  const dailyRatioList = data?.results[0].data;

  const totalSearchRatio = getTotalSearchRatio(data?.results[0].data);

  /**
   * 네이버 검색광고 (수치)
   */

  const { data: naverAdsData } = useGetNaverAds({
    baseKeyword,
    relatedKeyword,
  });

  const adsDataConfig = naverAdsData?.data.keywordList[0];

  const mobileQcCount = handleNaverAdsLessThanToNumber(
    adsDataConfig?.monthlyMobileQcCnt ?? 0,
  );

  const pcQcCount = handleNaverAdsLessThanToNumber(
    adsDataConfig?.monthlyPcQcCnt ?? 0,
  );

  const totalQcCount = mobileQcCount + pcQcCount;

  return {
    dailyRatioList,
    totalSearchRatio,
    totalQcCount,
  };
};

export default useNaverDataHandler;
