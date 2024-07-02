'use client';

import useGetNewsInfiniteQuery from '@/hooks/react-query/query/useGetNewsInfiniteQuery';

import MediaTextCard from './MediaTextCard';

const MediaTextContainer = ({ keyword }: { keyword: string }) => {
  const { data: newsData, isLoading } = useGetNewsInfiniteQuery({ keyword });

  const flattenNewsData = newsData?.pages.flatMap(
    (item) => item.return_object.documents,
  );

  const filterImageNewsData = flattenNewsData?.filter(
    (item) => !item.images.endsWith('undefined'),
  );

  if (filterImageNewsData?.length === 0) {
    return null;
  }

  return (
    <>
      {' '}
      <p className="text-grey600 text-[14px]">
        <span className="text-primary500">{keyword}</span> 관련 뉴스
      </p>
      <div className="flex justify-between gap-[24px]">
        <MediaTextCard keyword={keyword} />
      </div>
    </>
  );
};

export default MediaTextContainer;
