import Image from 'next/image';
import type { PropsWithChildren } from 'react';

import SvgComp from '@/share/SvgComp';

import ContentSubTitle from './ContentSubTitle/ContentSubTitle';

const Content = () => {
  return (
    <div className="rounded-10 border-grey500 w-[640px] overflow-hidden border border-solid">
      <Image
        src="/RelatedContentMain.png"
        width={640}
        height={300}
        alt="Picture of the author"
        style={{ objectFit: 'cover', layout: 'fill' }}
      />
      <div className="px-[1.875rem] py-10">
        <h3 className="text-grey700 mb-6  text-[1.5rem] font-bold">
          충격!!...진짜귀여운동그란고양이실존!!!충격!!...진짜귀여운동그란고양이실존!!!...충격!!...진짜귀여운동그란고
        </h3>
        <ContentSubTitle
          secondText="경향신문"
          thirdText="경제>금융_재테크"
          date="2023. 9. 4"
        />
        <div className="bg-grey200 flex w-full items-center justify-center rounded-lg   py-4 text-center">
          <button className="inline-flex items-center gap-[0.7rem]">
            <SvgComp icon="Share" size={26} />
            <p className="text-grey700 font-bold">공유하기</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;
