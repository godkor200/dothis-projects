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
  console.log(data);

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

  return (
    returnData && (
      <>
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
      </>
    )
  );
};

export default YouTube;
