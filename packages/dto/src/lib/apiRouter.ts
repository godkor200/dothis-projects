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
