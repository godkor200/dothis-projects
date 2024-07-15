import type { apiRouter } from '@dothis/dto';
import type { ClientInferResponseBody } from '@ts-rest/core';
import dayjs from 'dayjs';

import type { NewsResponse } from '@/types/news';

import {
  externaImageLoader,
  externalYouTubeImageLoader,
  getMainImage,
} from '../imagesUtil';

export interface MediaProps {
  title: string;
  provider: string;
  element: string;
  image: string;
  uploadDate: string;
  link: string;
}

interface News_Hilight {
  hilight: string;
}

export const formatYoutubeForMediaProps = (
  data:
    | ClientInferResponseBody<
        typeof apiRouter.video.getVideoPageV2,
        200
      >['data']['data'][number]
    | ClientInferResponseBody<
        typeof apiRouter.video.getIssueToday,
        200
      >['data'][number],
): MediaProps => {
  const compactNumber = new Intl.NumberFormat('ko', {
    notation: 'compact',
  });

  let uploadDate: string;
  if ('year' in data && 'month' in data && 'day' in data) {
    // apiRouter.video.getVideoPageV2의 데이터 타입일 경우
    uploadDate = data.videoPublished
      ? data.videoPublished
      : dayjs(`${data.year}-${data.month}-${data.day}`).format('YYYY-MM-DD');
  } else {
    // apiRouter.video.getIssueToday의 데이터 타입일 경우
    uploadDate = data.videoPublished;
  }

  return {
    title: data.videoTitle,
    provider: data.channelName,
    element: `조회수 ${compactNumber.format(data.videoViews)}`,
    uploadDate: uploadDate,
    image: externalYouTubeImageLoader(data.videoId),
    link: data.videoId,
  };
};

export const formatNewsFormMediaProps = (
  data: NewsResponse['return_object']['documents'][number],
): MediaProps & News_Hilight => {
  return {
    title: data.title,
    provider: data.provider,
    element: data.category[0],
    uploadDate: dayjs(`${data.dateline}`).format('YYYY.MM.DD'),
    image: externaImageLoader(getMainImage(data.images)),
    link: data.provider_link_page,
    hilight: data.hilight,
  };
};
