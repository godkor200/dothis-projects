import dayjs from 'dayjs';
import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import SvgComp from '@/components/common/SvgComp';
import { handleImageError } from '@/utils/imagesUtil';

import type { MediaDigestData } from '.';
import MediaDigestSummary from './MediaDigestSummary';

interface Props extends MediaDigestData {
  mediaType?: string;
}

const SelectedMediaCard = ({
  title,
  provider,
  element,
  uploadDate,
  image,
  link,
  mediaType,
}: Props) => {
  const formattedUploadDate = dayjs(uploadDate).format('YYYY-MM-DD');
  return (
    <div className="rounded-10 border-grey300 w-[320px] cursor-pointer overflow-hidden border border-solid">
      <Link
        href={
          mediaType === 'youtube'
            ? (`https://www.youtube.com/watch?v=${link}` as Route)
            : (`${link}` as Route)
        }
        target="_blank"
      >
        <div className="relative aspect-video overflow-hidden bg-white">
          <Image
            unoptimized
            src={image}
            alt="Picture of the author"
            onError={handleImageError}
            fill={true}
            // layout="responsive"

            className="object-cover"
          />
        </div>

        <div className="px-[16px] py-[12px]">
          <h3 className="text-grey700 mb-5 line-clamp-2 min-h-[42px] text-[16px] font-bold">
            {title}
          </h3>
          <MediaDigestSummary
            provider={provider}
            element={element}
            uploadDate={formattedUploadDate}
          />
        </div>
      </Link>
    </div>
  );
};

const SelectedMediaCardSkeleton = () => {
  return (
    <div
      role="status"
      className=" dark:border-grey700 border-grey300 w-[320px] animate-pulse rounded border shadow"
    >
      <div
        role="status"
        className=" dark:bg-grey700 flex h-[180px] w-[320px]  animate-pulse items-center justify-center"
      >
        <SvgComp
          icon="SideLogo"
          width={60}
          height={60}
          className="opacity-30"
        />
      </div>

      <div className="p-[30px]">
        <div className=" mb-4 flex items-center gap-[0.5rem]">
          <span className="bg-grey300 h-[16px] w-[64px] rounded-full"></span>

          <span className="bg-grey300 h-[16px] w-[64px] rounded-full"></span>

          <span className="bg-grey300 h-[16px] w-[64px] rounded-full"></span>
        </div>
      </div>
    </div>
  );
};

SelectedMediaCard.skeleton = SelectedMediaCardSkeleton;

export default SelectedMediaCard;
