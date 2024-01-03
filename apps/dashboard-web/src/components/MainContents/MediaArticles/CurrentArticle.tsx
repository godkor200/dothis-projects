import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { MouseEvent } from 'react';

import SvgComp from '@/components/common/SvgComp';
import { handleImageError } from '@/utils/imagesUtil';

import ArticleInfo from './ArticleInfo';

export interface CurrentArticleProps {
  title: string;
  category: string;
  provider: string;
  date: string;
  image: string;
  link: string;
}

const CurrentArticle = ({
  title,
  category,
  provider,
  date,
  image,
  link,
}: CurrentArticleProps) => {
  const handleCopy = (e: MouseEvent<HTMLDivElement>, link: string) => {
    e.preventDefault();

    alert(`${link}가 복사`);
  };
  return (
    <div className="rounded-10 border-grey300 w-[640px] cursor-pointer overflow-hidden border border-solid">
      <Link href={`${link}` as Route} target="_blank">
        <div className="relative h-[360px] w-[640px] overflow-hidden bg-black">
          <Image
            unoptimized
            src={image}
            alt="Picture of the author"
            onError={handleImageError}
            width={0}
            height={0}
            style={{
              objectFit: 'contain',
              layout: 'fill',
              width: '640px',
              height: '100%',
            }}
          />
        </div>

        <div className="px-[30px] py-[40px]">
          <h3 className="text-grey700 mb-5 line-clamp-2 text-[20px] font-bold">
            {title}
          </h3>
          <ArticleInfo secondText={provider} thirdText={category} date={date} />
          <div onClick={(e) => handleCopy(e, link)}>
            <div className="bg-grey200 flex w-full items-center justify-center   rounded-lg py-4 text-center">
              <button className="inline-flex items-center gap-[0.7rem]">
                <SvgComp icon="Share" size={20} />
                <p className="text-grey700 font-bold">공유하기</p>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const CurrentArticleSkeleton = () => {
  return (
    <div
      role="status"
      className=" dark:border-grey700 border-grey300 animate-pulse rounded border shadow "
    >
      <div
        role="status"
        className="bg-grey300 dark:bg-grey700 flex h-[360px] w-[640px] animate-pulse items-center justify-center"
      >
        <svg
          className="text-grey200 dark:text-grey600 h-10 w-10"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>

      <div className="p-[30px]">
        <h3 className="text-grey700 bg-grey300 dark:bg-grey700 mb-6 h-[1.5rem] rounded-full text-[1.5rem] font-bold"></h3>

        <div className=" mb-4 flex items-center gap-[0.5rem]">
          <span className="bg-grey300 h-[16px] w-[64px] rounded-full"></span>

          <span className="bg-grey300 h-[16px] w-[64px] rounded-full"></span>

          <span className="bg-grey300 h-[16px] w-[64px] rounded-full"></span>
        </div>
        <div>
          <div className="bg-grey300 flex h-[58px] w-full items-center   justify-center rounded-lg py-4 text-center">
            <button className="inline-flex items-center gap-[0.7rem]"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

CurrentArticle.skeleton = CurrentArticleSkeleton;

export default CurrentArticle;
