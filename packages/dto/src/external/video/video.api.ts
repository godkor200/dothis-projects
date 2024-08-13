import {
  zSuccessBase,
  zErrUnauthorized,
  c,
  zPaginatedOffsetQuery,
} from '../../lib/';
import {
  zRequestVideoBody,
  zCommentVideoResParam,
  zDeleteVideoParam,
  zGetReqVideoList,
  zGetVideoComments,
  zPostQueueVideoResponse,
  zPostStoryBoardQuery,
  zPreviewVideoResParam,
  zReviewVideoResponse,
  zVideoCommentRequestSchema,
  zVideoErrConflict,
  zVideoErrNotFound,
} from './';
import { z } from 'zod';
import { itemObject } from '../common.zod';

const zVideoErrRes = {
  401: zErrUnauthorized,
  404: zVideoErrNotFound,
  409: zVideoErrConflict,
};

export const VideoApiUrl = '/video';
export const externalVideoApi = c.router({
  postReqVideo: {
    method: 'POST',
    path: `${VideoApiUrl}`,
    body: zRequestVideoBody,
    responses: {
      200: zSuccessBase.merge(itemObject(zPostQueueVideoResponse)),
      ...zVideoErrRes,
    },
    summary: '크롤링할 영상 및 관리 번호를 등록합니다',
    description: '크롤링할 영상 및 관리 번호를 등록합니다',
  },
  deleteReqVideo: {
    method: 'DELETE',
    path: `${VideoApiUrl}/:videoId`,
    pathParams: zDeleteVideoParam,
    query: zPostStoryBoardQuery,
    body: z.object({}),
    responses: { 200: zSuccessBase, ...zVideoErrRes },
    summary: '크롤링할 영상 및 관리 번호를 삭제 요청을 보냅니다.',
    description: '크롤링할 영상 및 관리 번호를 삭제 요청을 보냅니다.',
  },
  getReqVideos: {
    method: 'GET',
    path: `${VideoApiUrl}`,
    query: zPaginatedOffsetQuery,
    responses: { 200: zGetReqVideoList, ...zVideoErrRes },
    summary: '크롤링할 영상 및 관리 번호를 가져옵니다.',
    description: '크롤링할 영상 및 관리 번호를 가져옵니다.',
  },
  previewVideo: {
    method: 'GET',
    path: `${VideoApiUrl}/:videoUrl/preview`,
    pathParams: zPreviewVideoResParam,
    responses: { 200: zReviewVideoResponse, ...zVideoErrRes },
    summary: '등록되지 않은 영상의 정보를 불러옵니다.',
    description: '등록되지 않은 영상의 정보를 불러옵니다.',
  },
  getVideoComments: {
    method: 'GET',
    path: `${VideoApiUrl}/:videoUrl/comments`,
    pathParams: zCommentVideoResParam,
    query: zVideoCommentRequestSchema,
    responses: { 200: zGetVideoComments, ...zVideoErrRes },
    summary: '비디오의 댓글을 가져옵니다.',
    description: '비디오의 댓글을 가져옵니다.',
  },
});
