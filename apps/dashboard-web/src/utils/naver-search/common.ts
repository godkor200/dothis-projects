import type {
  NaverAPI_Response,
  NaverAPI_Results,
} from '@/hooks/react-query/query/useGetNaverSearchRatio';

export const getNaver_FluctuationRate = (
  data: NaverAPI_Response | undefined,
) => {
  if (!data) return;

  const result = data.results[0].data;
  const first_searchRatio = result[0];
  const last_searchRatio = result[result.length - 1];

  return (
    Math.floor(
      ((((last_searchRatio.ratio || 0) as number) /
        Number(first_searchRatio.ratio || 1)) as number) * 100,
    ) - 100
  );
};

export const handleNaverAdsLessThanToNumber = (queryCount: string | number) => {
  if (queryCount === '<10') {
    return 10; // "<10"을 9로 변환
  }
  const count = Number(queryCount);

  return isNaN(count) ? 0 : count; // 숫자가 아닐 경우 0 반환
};

// export const getDailyQcCount = (queryCount: number, queryCount2: number) =>
//   (queryCount + queryCount2) / 30;

export const getTotalSearchRatio = (
  searchRatioData: NaverAPI_Results['data'] | undefined,
) => {
  return searchRatioData
    ? searchRatioData.reduce(
        (total, { ratio }) => total + Math.floor(Number(ratio)),
        0,
      )
    : 0;
};

export const calculateNormalizedSearchCount = ({
  dailyRatio,
  totalRatio,
  totalQcCount,
}: {
  dailyRatio: number;
  totalRatio: number;
  totalQcCount: number;
}) => (dailyRatio / totalRatio) * totalQcCount;
