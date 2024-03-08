import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { handleImageError } from '@/utils/imagesUtil';

import type { MediaDigestData } from '.';
import MediaDigestSummary from './MediaDigestSummary';

interface Props extends MediaDigestData {
  index: number;
  handleSetSelectedMedia: (index: number) => void;
}

const MediaDigestCard = ({
  title,
  provider,
  element,
  uploadDate,
  image,
  link,
  index,
  handleSetSelectedMedia,
}: Props) => {
  return (
    <Link href={`${link}` as Route} target="_blank">
      <div
        className="flex gap-[1rem] py-[0.875rem]"
        /**
         * 현재 디자인 변경으로 선택된 video에 따른 기획이 없으므로 주석처리
         * onClick={() => handleSetSelectedMedia(index)}
         */

        key={index}
      >
        <div className="relative h-[74px] w-[132px] overflow-hidden rounded-md bg-black">
          <Image
            unoptimized
            src={image}
            onError={handleImageError}
            width={0}
            height={0}
            alt="Picture of the author"
            style={{
              objectFit: 'cover',
              layout: 'fill',
              width: '132px',
              height: '100%',
            }}
          />
        </div>

        <div>
          <p className="text-grey700 mb-2 line-clamp-2 w-[278px] font-medium">
            {title}
          </p>
          <MediaDigestSummary
            provider={provider}
            element={element}
            uploadDate={uploadDate}
            isList={true}
          />
        </div>
      </div>
    </Link>
  );
};

export default MediaDigestCard;
