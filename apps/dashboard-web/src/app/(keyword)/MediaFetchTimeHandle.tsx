import { useEffect } from 'react';

import { useGetRandomMedia } from '@/hooks/react-query/query/useGetRandomMedia';
import type { TKeywords } from '@/types/common';

import type { MediaList } from './MediaBanner';

interface Props extends TKeywords {
  currentIndex: number;
  startIndexQuery?: number;
  mediaType: 'youtube' | 'news';
  visibleMediaCount: number;
  mediaErrorCount: number;
  setMediaErrorCount: React.Dispatch<React.SetStateAction<number>>;
  setFetchTimeMediaList: React.Dispatch<React.SetStateAction<MediaList[]>>;
}

const MediaFetchTimeHanlde = ({
  baseKeyword,
  relatedKeyword,
  currentIndex,
  startIndexQuery,
  mediaType,
  visibleMediaCount,
  mediaErrorCount,
  setMediaErrorCount,
  setFetchTimeMediaList,
}: Props) => {
  const randomMedia = useGetRandomMedia({
    searchKeyword:
      visibleMediaCount + mediaErrorCount > currentIndex
        ? baseKeyword
        : undefined,
    relatedkeyword:
      visibleMediaCount + mediaErrorCount > currentIndex
        ? relatedKeyword
        : undefined,
    mediaCategory: mediaType,
    page: startIndexQuery,
    index: 0,
    setIndexNumber: setMediaErrorCount,
  });

  const { mediaResult, mediaCategory, fetchTime, searchKeyword } = randomMedia;

  useEffect(() => {
    if (mediaResult && fetchTime) {
      setFetchTimeMediaList((prev) => {
        const updatedList = prev.filter(
          (item) => item.baseKeyword !== searchKeyword,
        );
        return [
          ...updatedList,
          {
            baseKeyword: searchKeyword!,
            mediaData: mediaResult,
            mediaType: mediaCategory,
            fetchTime,
          },
        ];
      });
    }
  }, [JSON.stringify(randomMedia.mediaResult), fetchTime]);

  return null;
};

export default MediaFetchTimeHanlde;
