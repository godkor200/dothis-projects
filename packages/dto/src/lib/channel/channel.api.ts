import { c } from '../contract';
import { zErrResBase } from '../error.response.zod';
import { zChannelResponse } from './channel.model';

import {
  zAutocompleteChannelName,
  zChannelFilterAndSortQuery,
  zChannelListRes,
  zChannelNameAutocompleteQuery,
  zFindVideoBySearchKeywordFindChannelClusterNumberMulti,
  zGetVideoTimelineQuery,
  zGetVideoTimelineResponse,
} from './channel.zod';
import { zChannelAnalysisBody } from './channel-analysis.zod';
import { zSuccessBase } from '../success.response.zod';

const channelApiUrl = '/channel';
export const channelApi = c.router({
  analyzeChannel: {
    method: 'GET',
    path: `${channelApiUrl}`,
    responses: {
      200: zChannelResponse,
      ...zErrResBase,
    },
    summary: '내 채널 분석 정보(snb)를 가져옵니다',
    description: '내 채널 분석 정보(snb)를 출력합니다.',
  },
  getInfluentialList: {
    method: 'GET',
    path: `${channelApiUrl}/influential`,
    query: zFindVideoBySearchKeywordFindChannelClusterNumberMulti,
    responses: {
      200: zChannelResponse,
      ...zErrResBase,
    },
    summary: '관련된 영향력있는 채널을 가져옵니다',
    description: '관련된 영향력있는 채널을 출력합니다.',
  },
  getChannelList: {
    method: 'GET',
    path: `${channelApiUrl}`,
    query: zChannelFilterAndSortQuery,
    responses: {
      200: zChannelListRes,
      ...zErrResBase,
    },
    summary: '조건에 맞는 채널 리스트를 가져옵니다',
    description:
      '구독자 수 및 클러스터 번호에 따른 필터링을 기반으로 최대 50개의 채널 목록을 반환합니다.',
  },
  autocompleteChannelName: {
    method: 'GET',
    path: `${channelApiUrl}/auto-complete/:channelName`,
    pathParams: zChannelNameAutocompleteQuery,
    responses: {
      200: zAutocompleteChannelName,
      ...zErrResBase,
    },
    summary: '채널 이름 자동완성',
    description:
      '사용자가 입력한 검색어에 기반하여 채널 이름 자동완성 기능을 제공합니다.',
  },
  getVideoTimeline: {
    method: 'GET',
    path: `${channelApiUrl}/video-timeline`,
    query: zGetVideoTimelineQuery,
    responses: {
      200: zGetVideoTimelineResponse,
      ...zErrResBase,
    },
    summary: '채널의 영상 타임라인 가져오기',
    description:
      '특정 채널의 영상 타임라인을 가져옵니다. 기본적으로 지난 365일 동안의 영상을 반환합니다.',
  },
  registerChannelAnalysis: {
    method: 'POST',
    path: `${channelApiUrl}/register-analysis`,
    body: zChannelAnalysisBody,
    responses: {
      200: zSuccessBase,
      ...zErrResBase,
    },
    summary: '채널 분석 정보 등록',
    description: '특정 채널의 분석 정보를 등록합니다.',
  },
});
