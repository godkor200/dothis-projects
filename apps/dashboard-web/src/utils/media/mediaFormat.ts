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
  data: ClientInferResponseBody<
    typeof apiRouter.video.getVideoPageV2,
    200
  >['data']['data'][number],
): MediaProps => {
  const compactNumber = new Intl.NumberFormat('ko', {
    notation: 'compact',
  });
  return {
    title: data.videoTitle,
    provider: data.channelName,
    element: `조회수 ${compactNumber.format(data.videoViews)}`,
    uploadDate: dayjs(data.videoPublished).format('YYYY-MM-DD'),
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
