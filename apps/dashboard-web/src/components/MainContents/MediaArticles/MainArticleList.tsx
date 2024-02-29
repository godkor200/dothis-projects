import dayjs from 'dayjs';

import useGetNewsInfiniteQuery from '@/hooks/react-query/query/useGetNewsInfiniteQuery';
import { useSelectedWord } from '@/store/selectedWordStore';
import { cn } from '@/utils/cn';
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

  const returnData = dataObj
    ?.map((item) => {
      return {
        title: item.title,
        category: item.category[0],
        provider: item.provider,
        date: dayjs(`${item.dateline}`).format('YYYY.MM.DD'),
        image: externaImageLoader(getMainImage(item.images)),
        link: item.provider_link_page,
        hilight: item.hilight,
      };
    })
    .slice(0, 3);

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
      <div
        className={cn('mb-[40px]  flex justify-center gap-[120px]', {
          'justify-between': returnData.length === 3,
          'justify-evenly': returnData.length === 2,
        })}
      >
        {returnData.map(({ title, category, provider, date, image, link }) => (
          <CurrentArticle
            title={title}
            category={category}
            provider={provider}
            date={date}
            image={image}
            link={link}
          />
        ))}
      </div>
      <p className="mb-[40px] text-center text-[20px] font-bold">
        "{selectedWord.keyword}" 키워드를 주제로 만든 영상들의 성과를 확인하고,
        소재를 결정하세요.
      </p>
    </div>
  );
};

export default MainArticleList;
