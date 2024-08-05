'use client';

import { clustersCategories } from '@/constants/clusterCategories';
import useGetDailyViewV2 from '@/hooks/react-query/query/useGetDailyViewV2';

const MainCluster = ({ keyword }: { keyword: string }) => {
  const { representativeCategoryNumber } = useGetDailyViewV2({
    keyword: keyword,
    relword: null,
  });

  const formattedCluster = parseInt(
    representativeCategoryNumber ?? '0',
    10,
  ).toString();

  const extractValue = (str: string) => {
    if (!str) return '분석중';

    const parts = str.split('>');

    return parts[parts.length - 1].trim(); // `>` 뒤의 부분 반환
  };

  return (
    <>
      {extractValue(clustersCategories[formattedCluster]) || (
        <span className="text-grey600">분석중</span>
      )}
    </>
  );
};

export default MainCluster;
