import Image from 'next/image';
import type { PropsWithChildren } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import SvgComp from '@/share/SvgComp';

import ContentSubTitle from './ContentSubTitle/ContentSubTitle';
import { externaImageLoader, getMainImage } from './utils';

export interface ContentProps {
  title: string;
  category: string;
  provider: string;
  date: string;
  image: string;
  link: string;
}

const Content = ({
  title,
  category,
  provider,
  date,
  image,
  link,
}: ContentProps) => {
  return (
    <div className="rounded-10 border-grey300 w-[640px] cursor-pointer overflow-hidden border border-solid">
      <div className="h-[300px] w-[640px] overflow-hidden">
        <Image
          unoptimized
          src={externaImageLoader(getMainImage(image))}
          width={640}
          height={300}
          alt="Picture of the author"
          style={{ objectFit: 'cover', layout: 'fill' }}
        />
      </div>
      <div className="px-[1.875rem] py-10">
        <h3 className="text-grey700 mb-6  text-[1.5rem] font-bold">{title}</h3>
        <ContentSubTitle
          secondText={provider}
          thirdText={category}
          date={date}
        />
        <CopyToClipboard text={link} onCopy={() => alert(`${link}가 복사`)}>
          <div className="bg-grey200 flex w-full  items-center justify-center   rounded-lg py-4 text-center">
            <button className="inline-flex items-center gap-[0.7rem]">
              <SvgComp icon="Share" size={26} />
              <p className="text-grey700 font-bold">공유하기</p>
            </button>
          </div>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default Content;
