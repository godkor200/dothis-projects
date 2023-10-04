import Image from 'next/image';

import ContentSubTitle from './ContentSubTitle/ContentSubTitle';

const ContentList = () => {
  return (
    <div className="px-5 pt-[0.375rem]">
      <div className="flex gap-[1rem] pt-[0.875rem]">
        <div className="overflow-hidden rounded-md">
          <Image
            src="/RelatedContentMain.png"
            width={132}
            height={74}
            alt="Picture of the author"
            style={{ objectFit: 'cover', layout: 'fill' }}
          />
        </div>

        <div>
          <p className="text-grey700 mb-2 line-clamp-2 w-[278px] font-medium">
            인간은 대체로 합리적이지 않다…금융 투자에서는 법률·부동산·금융,
            얼마나 아... 인간은 대체로 합리적이지 않다…금융 투자에서는
            법률·부동산·금융, 얼마나 아...인간은 대체로 합리적이지 않다…금융
            투자에서는 법률·부동산·금융, 얼마나 아...인간은 대체로 합리적이지
            않다…금융 투자에서는 법률·부동산·금융, 얼마나 아...
          </p>
          <ContentSubTitle
            secondText="경향신문"
            thirdText="경제>금융_재테크"
            date="2023. 9. 4"
            isList={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentList;
