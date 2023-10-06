'use client';

import Image from 'next/image';
import type { ChangeEvent, ReactEventHandler } from 'react';

import { type ContentProps } from './Content';
import ContentSubTitle from './ContentSubTitle/ContentSubTitle';
import { externaImageLoader, getMainImage, handleImageError } from './utils';

interface ContentListProps {
  contentArray: Array<ContentProps>;
  handleSetContentIndex: (index: number) => void;
}

const ContentList = ({
  contentArray,
  handleSetContentIndex,
}: ContentListProps) => {
  return (
    <div className="px-5 pt-[0.375rem] ">
      {contentArray.map(({ title, category, date, provider, image }, index) => {
        return (
          <div
            className="flex gap-[1rem] py-[0.875rem]"
            onClick={() => handleSetContentIndex(index)}
            key={index}
          >
            <div className="h-[74px] w-[132px] overflow-hidden rounded-md">
              <Image
                unoptimized
                src={externaImageLoader(getMainImage(image))}
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
              <ContentSubTitle
                secondText={provider}
                thirdText={category}
                date={date}
                isList={true}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContentList;
