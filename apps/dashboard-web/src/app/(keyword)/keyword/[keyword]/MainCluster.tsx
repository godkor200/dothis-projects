'use client';

import { clustersCategories } from '@/constants/clusterCategories';
import useGetRelWords from '@/hooks/react-query/query/useGetRelWords';

const MainCluster = ({ keyword }: { keyword: string }) => {
  const { data, getRelatedClusterArray } = useGetRelWords(keyword);

  const clusterData = getRelatedClusterArray();

  const extractValue = (str: string) => {
    if (!str) return '분석중';

    const parts = str.split('>');
    return parts[parts.length - 1].trim(); // `>` 뒤의 부분 반환
  };

  return (
    <>
      {extractValue(clustersCategories[clusterData[0]]) || (
        <span className="text-grey600">분석중</span>
      )}
    </>
  );
};

export default MainCluster;
