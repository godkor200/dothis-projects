import { c } from '../contract';
import {
  zPostStoryBoardBody,
  zPostStoryBoardDetailParams,
  zPostStoryBoardMainParams,
  zPostStoryBoardMemoParams,
  zPostStoryBoardPathParams,
  zPostStoryBoardReferenceParams,
  zStoryBoardDetails,
  zStoryBoardId,
} from './story-board.zod';
import { responses } from '../response';

export const storyBoardUrl = '/story-board';
export const storyBoardApi = c.router({
  // 스토리보드 생성 API 라우터
  createStoryBoard: {
    method: 'POST',
    path: `${storyBoardUrl}`,
    body: zPostStoryBoardBody,
    responses,
    summary: '스토리 보드를 생성합니다',
    description: '스토리 보드의 제목 없음 스토리 보드를 생성합니다.',
  },

  // 스토리보드 제목 수정 API 라우터
  updateStoryBoardTitle: {
    method: 'POST',
    path: `${storyBoardUrl}/:storyBoardId/title`,
    body: zPostStoryBoardBody,
    pathParams: zPostStoryBoardMainParams,
    responses,
    summary: '스토리 보드의 제목을 POST 합니다',
    description: '스토리 보드의 제목을 POST 합니다.',
  },
  // 스토리보드 제목 수정 API 라우터
  updateStoryBoardDraft: {
    method: 'PUT',
    path: `${storyBoardUrl}/:storyBoardId/draft`,
    body: zPostStoryBoardBody,
    pathParams: zPostStoryBoardPathParams,
    responses,
    summary: '스토리 보드의 자동 저장을 PUT 합니다',
    description: '스토리 보드의 자동 저장을 PUT 합니다.',
  },
  // 스토리보드 세부 정보 추가 API 라우터
  addStoryBoardDetail: {
    method: 'POST',
    path: `${storyBoardUrl}/details/:detailId`,
    body: zStoryBoardDetails,
    pathParams: zPostStoryBoardDetailParams,
    responses,
    summary: '스토리 보드 영상 개요를 추가합니다',
    description: '스토리 보드 영상 개요를 추가합니다.',
  },

  // 스토리보드 참조 추가 API 라우터
  addStoryBoardReference: {
    method: 'POST',
    path: `${storyBoardUrl}/:storyBoardId/references`,
    body: zPostStoryBoardBody,
    pathParams: zPostStoryBoardReferenceParams,
    responses,
    summary: '스토리 보드 참조를 추가합니다',
    description: '스토리 보드 참조를 추가합니다.',
  },

  // 스토리보드 메모 추가 API 라우터
  addStoryBoardMemo: {
    method: 'POST',
    path: `${storyBoardUrl}/:storyBoardId/memos`,
    body: zPostStoryBoardBody,
    pathParams: zPostStoryBoardMemoParams,
    responses,
    summary: '스토리 보드 메모를 추가합니다',
    description: '스토리 보드 메모를 추가합니다.',
  },

  // 스토리 보드 조회 API 라우터
  getStoryBoard: {
    method: 'GET',
    path: `${storyBoardUrl}/:storyBoardId`,
    pathParams: zStoryBoardId,
    responses,
    summary: '스토리 보드를 조회합니다',
    description: '스토리 보드를 조회합니다.',
  },

  // 스토리 보드 수정 API 라우터
  updateStoryBoard: {
    method: 'PUT',
    path: `${storyBoardUrl}/:storyBoardId`,
    body: {},
    pathParams: zStoryBoardId,
    responses,
    summary: '스토리 보드를 수정합니다',
    description: '스토리 보드를 수정합니다.',
  },

  // 스토리 보드 삭제 API 라우터
  deleteStoryBoard: {
    method: 'DELETE',
    path: `${storyBoardUrl}/:storyBoardId`,
    body: {},
    pathParams: zStoryBoardId,
    responses,
    summary: '스토리 보드를 삭제합니다',
    description: '스토리 보드를 삭제합니다.',
  },
});
