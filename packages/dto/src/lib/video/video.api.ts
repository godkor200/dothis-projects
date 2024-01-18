import { number, z } from 'zod';
import { c } from '../contract';
import {
  findVideoBySearchKeyword,
  findVideoPageQuery,
  zAccVideoModel,
  zFindVideoPageWithClusterQuery,
  zVideoDetails,
  zVideoResponse,
} from './video.model';

export const videoBaseApiUrl = '/video';

export const videoApi = c.router({
  getVideoPageV1: {
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
      '관련어와 탐색어를 기준으로 비디오를 가져옵니다. 마지막 _id를 last에 넣고 다시 요청하면 다음 페이지의 비디오 리스트를 받을수 있습니다.',
  },
  getVideoPageV2: {
    method: 'GET',
    path: `${videoBaseApiUrl}`,
    query: zFindVideoPageWithClusterQuery,
    responses: {
      200: zVideoResponse,
      401: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다.',
    },
    summary: '관련어와 탐색어를 기준으로 비디오를 가져옵니다. v2',
    description:
      '관련어와 탐색어를 기준으로 비디오를 가져옵니다. 마지막 _id를 last에 넣고 다시 요청하면 다음 페이지의 비디오 리스트를 받을수 있습니다. 쿼리로 cluster를 배열로 넣고 한번 호출하고 페이지네이션 기능구현하시면 됩니다',
  },
  getIndividualVideo: {
    method: 'GET',
    path: `${videoBaseApiUrl}/:clusterNumber/:videoId`,
    pathParams: { clusterNumber: z.number(), videoId: z.string() }, // 비디오 카테고리(cluster) 넘버, 비디오 아이디
    query: findVideoPageQuery,
    responses: {
      200: zVideoDetails,
      401: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다.',
    },
    summary: '비디오 id를 기준으로 비디오 정보를 가져 옵니다',
    description: '비디오 id를 기준으로 비디오 정보를 가져 옵니다 ',
  },
  getAccVideo: {
    method: 'GET',
    path: `${videoBaseApiUrl}/accumulate`,
    query: findVideoBySearchKeyword,
    responses: {
      200: zAccVideoModel,
      401: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다.',
    },
    summary: '관련어와 탐색어를 기준으로 누적 영상수를 가져옵니다.',
    description:
      '탐색어(keyword), 연관어(relationKeyword), 날짜(from,to)로 누적 영상수를 가져옵니다 .기존에꺼 대비해서 한번만 호출하면 됩니다.',
  },
});
