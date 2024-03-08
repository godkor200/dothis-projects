'use client';

import InView from '@/components/common/InView/InView';

import type { MediaDigestData } from '.';
import MediaDigestCard from './MediaDigestCard';

interface Props {
  mediaDigestData: MediaDigestData[];
  handleSetSelectedMedia: (index: number) => void;
  handleFetchNextPage: (isInview: boolean) => void;
}

const MediaDigestList = ({
  mediaDigestData,
  handleSetSelectedMedia,
  handleFetchNextPage,
}: Props) => {
  return (
    // hover:overflow-auto
    <div className="accodient-box h-[630px] cursor-pointer  overflow-auto pl-5 pr-3  pt-[0.375rem]">
      <InView onChange={handleFetchNextPage} threshold={0.5}>
        {mediaDigestData.map((mediaData, index) => {
          return (
            <MediaDigestCard
              {...mediaData}
              index={index}
              handleSetSelectedMedia={handleSetSelectedMedia}
            />
          );
        })}
      </InView>
    </div>
  );
};

const MediaDigestListSkeleton = () => {
  return (
    <div className="cursor-pointer px-5  pt-[0.375rem]">
      {[...new Array(5)].map((item, index) => {
        return (
          <div className="flex gap-[1rem] py-[0.875rem]" key={index}>
            <div
              role="status"
              className="bg-grey300 dark:bg-grey700 flex  h-[74px] w-[132px] animate-pulse items-center justify-center rounded-lg"
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

            <div>
              <p className=" bg-grey300 mb-2 line-clamp-2 h-[16px] w-[278px] rounded-full "></p>
              <div className="flex gap-[8px]">
                <p className=" bg-grey300 h-[16px] w-[64px] rounded-full "></p>
                <p className=" bg-grey300  h-[16px] w-[32px] rounded-full "></p>
                <p className=" bg-grey300  h-[16px] w-[32px] rounded-full "></p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

MediaDigestList.skeleton = MediaDigestListSkeleton;

export default MediaDigestList;
