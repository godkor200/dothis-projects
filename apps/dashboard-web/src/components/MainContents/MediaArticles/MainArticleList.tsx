import dayjs from 'dayjs';

import useGetNewsInfiniteQuery from '@/hooks/react-query/query/useGetNewsInfiniteQuery';
import { useSelectedWord } from '@/store/selectedWordStore';
import { externaImageLoader, getMainImage } from '@/utils/imagesUtil';

import CurrentArticle from './CurrentArticle';

const MainArticleList = () => {
  const selectedWord = useSelectedWord();
  const {
    data: scrollData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
  } = useGetNewsInfiniteQuery();

  const dataObj = scrollData?.pages.flatMap(
    (item) => item.return_object.documents,
  );

  const returnData = dataObj?.map((item) => {
    return {
      title: item.title,
      category: item.category[0],
      provider: item.provider,
      date: dayjs(`${item.dateline}`).format('YYYY.MM.DD'),
      image: externaImageLoader(getMainImage(item.images)),
      link: item.provider_link_page,
      hilight: item.hilight,
    };
  });

  if (isLoading) {
    return (
      <div className="mx-auto my-[80px]  flex w-[1342px] justify-between gap-[120px] px-[48px]">
        {/* <CurrentArticle.skeleton /> */}
        <CurrentArticle.skeleton />
        <CurrentArticle.skeleton />
        <CurrentArticle.skeleton />
      </div>
    );
  }

  if (returnData?.length === 0 || !returnData) {
    return null;
  }

  return (
    <div className="mx-auto w-[1342px]  px-[48px]">
      <h2 className="mb-[40px] text-center text-[20px] font-bold">
        "{selectedWord.keyword}" 키워드에 있었던 특별한 이슈
      </h2>
      <div className=" mb-[40px]  flex justify-between gap-[120px]">
        <CurrentArticle
          title={returnData[0]?.title}
          category={returnData[0]?.category}
          provider={returnData[0]?.provider}
          date={returnData[0]?.date}
          image={returnData[0]?.image}
          link={returnData[0]?.link}
        />
        {returnData[1] && (
          <CurrentArticle
            title={returnData[1]?.title}
            category={returnData[1]?.category}
            provider={returnData[1]?.provider}
            date={returnData[1]?.date}
            image={returnData[1]?.image}
            link={returnData[1]?.link}
          />
        )}
        {returnData[2] && (
          <CurrentArticle
            title={returnData[2]?.title}
            category={returnData[2]?.category}
            provider={returnData[2]?.provider}
            date={returnData[2]?.date}
            image={returnData[2]?.image}
            link={returnData[2]?.link}
          />
        )}
      </div>
      <p className="mb-[40px] text-center text-[20px] font-bold">
        "{selectedWord.keyword}" 키워드를 주제로 만든 영상들의 성과를 확인하고,
        소재를 결정하세요.
      </p>
    </div>
  );
};

export default MainArticleList;
