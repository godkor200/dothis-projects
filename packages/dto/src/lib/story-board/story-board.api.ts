import type {} from 'zod';
import { c } from '../contract';
import {
  zPaginatedSqlQueryParams,
  zPostStoryBoardBody,
  zPostStoryBoardMainParams,
  zPostStoryBoardMemoParams,
  zPostStoryBoardOverviewParams,
  zPostStoryBoardReferenceParams,
  zStoryBoardCreateArrayRes,
  zStoryBoardCreateRes,
  zStoryBoardDetails,
  zStoryBoardId,
} from './story-board.zod';
import type {} from '@ts-rest/core';

import { zAuth } from '../common.model';
import { z } from 'zod';
import { zErrResBase } from '../error.response.zod';
import { zSuccessBase } from '../success.response.zod';

export const storyBoardUrl = '/story-board';

export const storyBoardApi = c.router(
  {
    // 스토리보드 생성 API 라우터
    createStoryBoard: {
      method: 'POST',
      path: `${storyBoardUrl}`,
      body: z.any().optional(),
      responses: { 200: zStoryBoardCreateRes, ...zErrResBase },
      summary: '스토리 보드를 생성합니다',
      description: '스토리 보드의 제목 없음 스토리 보드를 생성합니다.',
    },

    // 스토리보드 제목 수정 API 라우터
    updateStoryBoardTitle: {
      method: 'POST',
      path: `${storyBoardUrl}/:storyBoardId/title`,
      body: zPostStoryBoardBody,
      pathParams: zPostStoryBoardMainParams,
      responses: { 200: zSuccessBase, ...zErrResBase },
      summary: '스토리 보드의 제목을 POST 합니다',
      description:
        '스토리 보드의 제목을 POST 합니다. body에 { value: 타이틀명 } 데이터를 보내면 됩니다.',
    },
    // 스토리보드 자동 저장 API 라우터
    updateStoryBoardDraft: {
      method: 'PUT',
      path: `${storyBoardUrl}/:storyBoardId/draft`,
      body: zPostStoryBoardBody,
      pathParams: zStoryBoardId,
      responses: { 201: zSuccessBase, ...zErrResBase },
      summary: '스토리 보드의 자동 저장을 PUT 합니다 ',
      description:
        '스토리 보드의 자동 저장을 PUT 합니다. body에 { value: boolean } 데이터를 보내면 됩니다.',
    },
    // 스토리보드 개괄 정보 추가 API 라우터
    addStoryBoardOverviews: {
      method: 'POST',
      path: `${storyBoardUrl}/overviews/:overviewsId`,
      body: zStoryBoardDetails,
      pathParams: zPostStoryBoardOverviewParams.required(),
      responses: { 200: zSuccessBase, ...zErrResBase },
      summary: '스토리 보드 영상 개요를 추가합니다',
      description:
        '스토리 보드 영상 개요를 추가합니다. zStoryBoardDetails 조드 타입을 참고하세요',
    },

    // 스토리보드 참조 추가 API 라우터
    addStoryBoardReference: {
      method: 'POST',
      path: `${storyBoardUrl}/:storyBoardId/references`,
      body: zPostStoryBoardBody,
      pathParams: zPostStoryBoardReferenceParams,
      responses: { 200: zSuccessBase, ...zErrResBase },
      summary: '스토리 보드 참조를 추가합니다',
      description:
        '스토리 보드 참조를 추가합니다. body에 { value: url } 데이터를 보내면 됩니다.',
    },

    // 스토리보드 메모 추가 API 라우터
    addStoryBoardMemo: {
      method: 'POST',
      path: `${storyBoardUrl}/:storyBoardId/memos`,
      body: zPostStoryBoardBody,
      pathParams: zPostStoryBoardMemoParams,
      responses: { 200: zSuccessBase, ...zErrResBase },
      summary: '스토리 보드 메모를 추가합니다',
      description:
        '스토리 보드 메모를 추가합니다. body에 { value: 메모...... } 데이터를 보내면 됩니다.',
    },

    getManyStoryBoard: {
      method: 'GET',
      path: `${storyBoardUrl}`,
      query: zPaginatedSqlQueryParams,
      responses: { 200: zStoryBoardCreateArrayRes, ...zErrResBase },
      summary: '사용자의 스토리 보드 페이지네이션 조회합니다',
      description: '사용자의 스토리 보드 페이지네이션 조회합니다.',
    },

    // 스토리 보드 조회 API 라우터
    getOneStoryBoard: {
      method: 'GET',
      path: `${storyBoardUrl}/:storyBoardId`,
      pathParams: zStoryBoardId,
      responses: { 200: zStoryBoardCreateRes, ...zErrResBase },
      summary: '스토리 보드 하나를 조회합니다',
      description: '스토리 보드 하나를 조회합니다.',
    },

    // 스토리 보드 수정 API 라우터
    updateStoryBoard: {
      method: 'PUT',
      path: `${storyBoardUrl}/:storyBoardId`,
      body: z.object({}),
      pathParams: zStoryBoardId,
      responses: { 200: zSuccessBase, ...zErrResBase },
      summary: '스토리 보드를 수정합니다',
      description: '스토리 보드를 수정합니다.',
    },

    // 스토리 보드 삭제 API 라우터
    deleteStoryBoard: {
      method: 'DELETE',
      path: `${storyBoardUrl}/:storyBoardId`,
      body: z.object({}),
      pathParams: zStoryBoardId,
      responses: { 200: zSuccessBase, ...zErrResBase },
      summary: '스토리 보드를 삭제합니다',
      description: '스토리 보드를 삭제합니다.',
    },
  },
  {
    baseHeaders: zAuth.optional(),
  },
);
