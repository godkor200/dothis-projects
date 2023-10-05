import Image from 'next/image';

import type { ContentProps } from './Content';
import ContentSubTitle from './ContentSubTitle/ContentSubTitle';

interface ContentListProps {
  contentArray: Array<ContentProps>;
}

const ContentList = ({ contentArray }: ContentListProps) => {
  return (
    <div className="px-5 pt-[0.375rem] ">
      {contentArray.map(({ title, category, date, provider }) => (
        <div className="flex gap-[1rem] py-[0.875rem]">
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
      ))}
    </div>
  );
};

export default ContentList;
