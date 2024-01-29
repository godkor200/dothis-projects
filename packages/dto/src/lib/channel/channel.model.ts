import { z } from 'zod';

export const zChannelData = z.object({
  id: z.number(),
  userId: z.number().nullable(),
  channelName: z.string(),
  channelUrl: z.string(),
  channelSubscriber: z.number().nullable(),
  channelDescription: z.string().nullable(),
  channelSince: z.date(),
  channelTotalViews: z.number(),
  channelTotalVideos: z.number(),
  channelNormalVideos: z.number(),
  channelCountry: z.string().nullable(),
  channelLink: z.string(),
  channelKeywords: z.array(z.string()),
  channelTags: z.array(z.string()).nullable(),
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
