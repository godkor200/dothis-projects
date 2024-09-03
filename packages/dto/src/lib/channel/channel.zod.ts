import { z } from 'zod';
import { findVideoBySearchKeyword } from '../video';
import { zClusterNumberMulti, zSortQuery } from '../common.model';

export const ChannelSubscriberRange = {
  RANGE_1000_TO_9999: '1000to9999',
  RANGE_10000_TO_49999: '10000to49999',
  RANGE_50000_TO_99999: '50000to99999',
  RANGE_100000_TO_499999: '100000to499999',
  RANGE_500000_TO_999999: '500000to999999',
  RANGE_1000000_PLUS: '1000000plus',
};
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

export const zChannelFilterAndSortQuery = z.object({
  channelCluster: z
    .number()
    .int()
    .min(0)
    .max(93)
    .optional()
    .describe(
      '채널이 속한 클러스터 번호입니다. 0부터 93까지의 값이 가능합니다.',
    ),

  channelSubscriber: z
    .nativeEnum(ChannelSubscriberRange)
    .optional()
    .describe(
      '채널 구독자 수 범위입니다. 가능한 값은 미리 정의된 주변 문자 열거형입니다.',
    ),

  sort: zSortQuery(['channel_subscriber', 'channel_average_views'])
    .shape.sort.describe(
      '정렬 방식입니다. 구독자 수 또는 평균 조회수를 기준으로 정렬할 수 있습니다.',
    )
    .nullish(),

  limit: z
    .string()
    .or(z.number())
    .optional()
    .default(50)
    .describe(
      '반환할 최대 항목 수입니다. 숫자 또는 문자열로 지정할 수 있습니다.',
    ),
});
export const zChannelListResponseObject = z.object({
  channelName: z.string().describe('채널의 고유 이름입니다.'),
  channelThumbnail: z.string().url().describe('채널 썸네일의 URL입니다.'),
  channelCluster: z.number().describe('채널이 속한 클러스터를 나타냅니다.'),
  mainUsedKeywords: z
    .array(z.string())
    .describe('채널에서 주로 사용하는 키워드입니다.'),
  mainUsedTags: z.array(z.string()).describe('채널의 주요 태그 목록입니다.'),
  channelSubscribers: z.number().describe('채널의 구독자 수입니다.'),
  channelAverageViews: z.number().describe('채널의 평균 조회 수입니다.'),
});
// Define the response schema
export const zChannelListResponse = z.array(zChannelListResponseObject);

export type TChannelListResponse = z.TypeOf<typeof zChannelListResponse>;
export type TChannelFilterAndSortQuery = z.TypeOf<
  typeof zChannelFilterAndSortQuery
>;
export type TInfluentialChannelRes = z.TypeOf<typeof zInfluentialChannelRes>;

const zAnalyzeMyChannelChannelRes = zInfluentialChannelRes.merge(
  z.object({ channelTotalVideos: z.number(), channelLink: z.string() }),
);
export type TAnalyzeMyChannelChannelRes = z.TypeOf<
  typeof zAnalyzeMyChannelChannelRes
>;
export type ChannelSubscriberRangeType =
  (typeof ChannelSubscriberRange)[keyof typeof ChannelSubscriberRange];
