'use client';

import Image from 'next/image';

import {
  externaImageLoader,
  getMainImage,
  handleImageError,
} from '../../../utils/imagesUtil';
import ArticleInfo from './ArticleInfo';
import type { CurrentArticleProps } from './CurrentArticle';

interface ArticleListProps {
  articleListData: CurrentArticleProps[];
  handleSetContentIndex: (index: number) => void;
}

const ArticleList = ({
  articleListData,
  handleSetContentIndex,
}: ArticleListProps) => {
  return (
    <div className="cursor-pointer px-5  pt-[0.375rem]">
      {articleListData.map(
        ({ title, category, date, provider, image }, index) => {
          return (
            <div
              className="flex gap-[1rem] py-[0.875rem]"
              onClick={() => handleSetContentIndex(index)}
              key={index}
            >
              <div className="h-[74px] w-[132px] overflow-hidden rounded-md">
                <Image
                  unoptimized
                  src={image}
                  onError={handleImageError}
                  width={132}
                  height={74}
                  alt="Picture of the author"
                  style={{ objectFit: 'cover', layout: 'fill' }}
                />
              </div>

              <div>
                <p className="text-grey700 mb-2 line-clamp-2 w-[278px] font-medium">
                  {title}
                </p>
                <ArticleInfo
                  secondText={provider}
                  thirdText={category}
                  date={date}
                  isList={true}
                />
              </div>
            </div>
          );
        },
      )}
    </div>
  );
};

export default ArticleList;
