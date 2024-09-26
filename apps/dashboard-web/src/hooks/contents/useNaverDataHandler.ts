import type { TKeywords } from '@/types/common';
import {
  getTotalSearchRatio,
  handleNaverAdsLessThanToNumber,
} from '@/utils/naver-search/common';

import type { NaverAdsAPI_Response } from '../react-query/query/useGetNaverAds';
import useGetNaverAds from '../react-query/query/useGetNaverAds';
import type { NaverAPI_Response } from '../react-query/query/useGetNaverSearchRatio';
import useGetNaverSearchRatio from '../react-query/query/useGetNaverSearchRatio';

const useNaverDataHandler = ({
  naverSearchRatioData,
  naverAdsData,
}: {
  naverSearchRatioData: NaverAPI_Response | undefined;
  naverAdsData: NaverAdsAPI_Response | undefined;
}) => {
  /**
   * 네이버 통합검색량 수치 (퍼센테이지)
   */

  const dailyRatioList = naverSearchRatioData?.results[0].data;

  const totalSearchRatio = getTotalSearchRatio(
    naverSearchRatioData?.results[0].data,
  );

  /**
   * 네이버 검색광고 (수치)
   */

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
