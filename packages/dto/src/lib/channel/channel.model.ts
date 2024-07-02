import { z } from 'zod';
import { dataObject } from '../common.model';

export const zChannelData = z.object({
  channelId: z.string().max(48).default(''),
  channelIdPart: z.string().max(1),
  channelName: z.string().max(255).nullable(),
  channelDescription: z.string().nullable(),
  channelTags: z.array(z.string()).max(2000).nullable(),
  keyword: z.array(z.string()).max(2000).nullable(),
  tag: z.string().max(2000).nullable(),
  channelCountry: z.string().max(100).nullable(),
  channelLink: z.string().max(8000).nullable(),
  channelSince: z.string().max(24).nullable(),
  channelCluster: z.number().int().default(-1),
  crawledDate: z.date().nullable(),
  userId: z.number().int().nullable(),
});

export type ChannelModel = z.TypeOf<typeof zChannelData>;

export const zChannelTagsKeywordsData = zChannelData.pick({
  channelKeywords: true,
  channelTags: true,
});

export const zChannelAnalysis = z.object({
  channelName: z.string(), // 채널명
  channelHandle: z.string(), // 채널 핸들 (@로 시작하는 그거)
  subscribers: z.number(), // 구독자
  videoCount: z.number(), // 동영상 수
  averageViews: z.number(), // 평균조회수
  mainKeywordsAndTags: z.array(z.string()), // 주사용 키워드 & 태그
});
export type ChannelAnalysisRes = z.TypeOf<typeof zChannelAnalysis>;

export const zChannelResponse = dataObject(zChannelAnalysis);
