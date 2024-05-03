import { z } from 'zod';
import { findVideoBySearchKeyword } from '../video';
import { zClusterNumberMulti, zSortQuery } from '../common.model';

export const zChannelId = z.object({ channelId: z.string() });

export const zFindVideoBySearchKeywordFindChannel = findVideoBySearchKeyword;

export const zInfluentialChannelRes = z.object({
  channelName: z.string().describe('채널의 고유 이름입니다.'),
  channelCluster: z.string().describe('채널이 속한 클러스터를 나타냅니다.'),
  mainlyUsedKeywords: z
    .string()
    .describe('채널에서 주로 사용하는 키워드입니다.'),
  channelSubscribers: z.number().describe('채널의 구독자 수입니다.'),
  channelAverageViews: z.number().describe('채널의 평균 조회 수입니다.'),
});
export const zSortChannelInfo = zSortQuery(
  Object.keys(zInfluentialChannelRes.shape),
);
export const zFindVideoBySearchKeywordFindChannelClusterNumberMulti =
  zFindVideoBySearchKeywordFindChannel
    .merge(zClusterNumberMulti)
    .merge(zSortChannelInfo);

export type TInfluentialChannelRes = z.TypeOf<typeof zInfluentialChannelRes>;

const zAnalyzeMyChannelChannelRes = zInfluentialChannelRes.merge(
  z.object({ channelTotalVideos: z.number(), channelLink: z.string() }),
);
export type TAnalyzeMyChannelChannelRes = z.TypeOf<
  typeof zAnalyzeMyChannelChannelRes
>;
