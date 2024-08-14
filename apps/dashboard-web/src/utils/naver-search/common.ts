import type { NaverAPI_Response } from '@/hooks/react-query/query/useGetNaverSearchRatio';

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
