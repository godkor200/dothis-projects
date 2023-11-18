import { useState } from 'react';

import useGetVideoData from '@/hooks/react-query/query/useGetVideoData';
import { externalYouTubeImageLoader } from '@/utils/imagesUtil';

import ArticleList from './ArticleList';
import CurrentArticle from './CurrentArticle';

const YouTube = () => {
  const [pageIndex, setPageIndex] = useState(4);
  const [contentIndex, setContentIndex] = useState(0);

  const handleSetContentIndex = (index: number) => {
    setContentIndex(index);
  };

  const { data, isLoading } = useGetVideoData();

  const returnData = data[pageIndex]?.data?.map((item) => {
    return {
      isLoading: isLoading,
      title: item._source.video_title,
      category: item._source.video_category,
      image: externalYouTubeImageLoader(item._source.video_id),
      date: item._source.video_published,
      link: item._source.video_url,
      provider: item._source.video_category,
    };
  });

  // 현재 데이터 페이지 인덱스가 clusternumber인데,  한페이지만 보여주고 있어서 임의로 하나만 지정했습니다. 하지만 해당 clusternumber에 에러가 있을 시 계속 skeleton UI 만 나오는 현상이 있을 수 있어서 에러바운더리를 설정해주는게 좋습니다
  if (!returnData) {
    return (
      <>
        <CurrentArticle.skeleton />
        <ArticleList.skeleton />
      </>
    );
  }
  return (
    <div className="mt-10 flex gap-[1.25rem]">
      <CurrentArticle
        title={returnData[contentIndex]?.title}
        category={returnData[contentIndex]?.category}
        provider={returnData[contentIndex]?.provider}
        date={returnData[contentIndex]?.date}
        image={returnData[contentIndex]?.image}
        link={returnData[contentIndex]?.link}
      />
      <ArticleList
        articleListData={returnData}
        handleSetContentIndex={handleSetContentIndex}
      />
    </div>
  );
};

export default YouTube;
