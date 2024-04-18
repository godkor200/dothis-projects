import type {} from 'zod';
import { c } from './contract';
import { userApi } from './user';
import { authApi } from './auth';
import { relatedWordsApi } from './related-word';
import { hitsApi } from './hits';
import { videoApi } from './video';
import { channelHistoryApi } from './channel-history';
import { channelApi } from './channel';
import { storyBoardApi } from './story-board';

// 동적으로 key에 맞는 값을 반환하는 함수

const apis = {
  auth: authApi,
  user: userApi,
  hits: hitsApi,
  channelHistory: channelHistoryApi,
  channel: channelApi,
  relatedWords: relatedWordsApi,
  video: videoApi,
  storyBoard: storyBoardApi,
};

function getApiByKey(key: string) {
  return apis[key];
}

// apiRouter 생성
export function createApiRouter<K extends keyof typeof apis>(
  key: K,
): Record<K, (typeof apis)[K]> {
  const api = getApiByKey(key);
  const router = c.router({
    [key]: api,
  } as typeof apis);

  // 해당 어센셜 Type 'RecursivelyApplyOptions<{ [x: string]: ...; }, {}>' is not assignable to type 'Record<K, { auth: RecursivelyApplyOptions<{ getGoogleLogin: { method: "GET"; path: "/auth/google-login"; responses: { 404: ZodObject<{ success: ZodLiteral<false>; statusCode: ZodLiteral<404>; message: ZodLiteral<...>; }, "strip", ZodTypeAny, { ...; }, { ...; }>; 400: ZodObject<...>; 401: ZodObject<...>; 500: ZodObje...'.ts(2322)

  return router;
}

export const apiRouter = c.router({
  auth: authApi,
  user: userApi,
  hits: hitsApi,
  channelHistory: channelHistoryApi,
  channel: channelApi,
  relatedWords: relatedWordsApi,
  video: videoApi,
  storyBoard: storyBoardApi,
});

export const apiRouter_Auth = c.router({
  auth: authApi,
});

export const apiRouter_User = c.router({
  user: userApi,
});

export const apiRouter_Hits = c.router({
  hits: hitsApi,
});

export const apiRouter_ChannelHistory = c.router({
  channelHistory: channelHistoryApi,
});

export const apiRouter_Channel = c.router({
  chnnel: channelApi,
});

export const apiRouter_RelatedWords = c.router({
  relatedWord: relatedWordsApi,
});

export const apiRouter_Video = c.router({
  video: videoApi,
});

export const apiRouter_Storyboard = c.router({
  storyboard: storyBoardApi,
});
