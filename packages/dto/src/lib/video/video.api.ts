import { number, z } from 'zod';
import { c } from '../contract';
import {
  findVideoBySearchKeyword,
  findVideoPageQuery,
  zAccVideoModel,
  zVideoResponse,
} from './video.model';

export const videoBaseApiUrl = '/video';

export const videoApi = c.router({
  getVideo: {
    method: 'GET',
    path: `${videoBaseApiUrl}/:clusterNumber`,
    pathParams: z.number(), // 비디오 카테고리(cluster) 넘버
    query: findVideoPageQuery,
    responses: {
      200: zVideoResponse,
      401: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다.',
    },
    summary: '관련어와 탐색어를 기준으로 비디오를 가져옵니다.',
    description:
      '관련어와 탐색어를 기준으로 비디오를 가져옵니다. 마지막 _id를 last에 넣고 다시 요청하면 매번 최신화된 비디오 리스트를 받을수 있습니다.',
  },
  getAccVideo: {
    method: 'GET',
    path: `${videoBaseApiUrl}/accumulate/:clusterNumber`,
    pathParams: z.number(), // 비디오 카테고리(cluster) 넘버
    query: findVideoBySearchKeyword,
    responses: {
      200: zAccVideoModel,
      401: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다.',
    },
    summary: '관련어와 탐색어를 기준으로 누적 영상수를 가져옵니다.',
    description:
      '클러스터 번호(clusterNumber),탐색어(keyword),연관어(relationKeyword), 날짜(from,to)로 누적 영상수를 가져옵니다.',
  },
});
