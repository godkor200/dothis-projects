import { number, z } from 'zod';
import { c } from '../contract';
import { findVideoPageQuery } from './video.model';

export const videoBaseApiUrl = '/video';

export const videoApi = c.router({
  getVideo: {
    method: 'GET',
    path: `${videoBaseApiUrl}/:clusterNumber`,
    pathParams: z.number(), // 비디오 카테고리(cluster) 넘버
    query: findVideoPageQuery,
    responses: {
      200: 'video 튜플',
      401: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다.',
    },
    summary: '관련어와 탐색어를 기준으로 비디오를 가져옵니다.',
    description:
      '관련어와 탐색어를 기준으로 비디오를 가져옵니다. 마지막 _id를 last에 넣고 다시 요청하면 매번 최신화된 비디오 리스트를 받을수 있습니다.',
  },
});
