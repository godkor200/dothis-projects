import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { MouseEvent } from 'react';

import SvgComp from '@/components/common/SvgComp';

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
        <div className="relative h-[300px] w-[640px] overflow-hidden bg-black">
          <Image
            unoptimized
            src={image}
            alt="Picture of the author"
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

        <div className="px-[1.875rem] py-10">
          <h3 className="text-grey700 mb-6 text-[1.5rem] font-bold">{title}</h3>
          <ArticleInfo secondText={provider} thirdText={category} date={date} />
          <div onClick={(e) => handleCopy(e, link)}>
            <div className="bg-grey200 flex w-full items-center justify-center   rounded-lg py-4 text-center">
              <button className="inline-flex items-center gap-[0.7rem]">
                <SvgComp icon="Share" size={26} />
                <p className="text-grey700 font-bold">공유하기</p>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CurrentArticle;
