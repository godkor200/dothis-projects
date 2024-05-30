'use client';

import { clustersCategories } from '@/constants/clusterCategories';
import useGetRelWords from '@/hooks/react-query/query/useGetRelWords';

const MainCluster = ({ keyword }: { keyword: string }) => {
  const { data, getRelatedClusterArray } = useGetRelWords(keyword);

  const clusterData = getRelatedClusterArray();

  return (
    <>
      {clustersCategories[clusterData[0]] || (
        <span className="text-grey600">분석중</span>
      )}
    </>
  );
};

export default MainCluster;
