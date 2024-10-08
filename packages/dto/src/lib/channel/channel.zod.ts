import { z } from 'zod';
import { findVideoBySearchKeyword } from '../video';

import {
  zClusterNumberMulti,
  zDateQuery,
  zSearchKeyword,
  zSortQuery,
} from '../common.model';
import { zChannelAnalysis } from './channel.model';
import { dataObject, zClusterNumberMulti, zSortQuery } from '../common.model';

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
  channelId: z.string().describe('채널의 고유 id입니다.'),
  channelName: z.string().describe('채널의 고유 이름입니다.'),
  channelThumbnail: z.string().url().describe('채널 썸네일의 URL입니다.'),
  channelCluster: z.number().describe('채널이 속한 클러스터를 나타냅니다.'),
  mainUsedKeywords: z
    .array(z.string())
    .describe('채널에서 주로 사용하는 키워드입니다.'),
  mainUsedTags: z.array(z.string()).describe('채널의 주요 태그 목록입니다.'),
  channelSubscribers: z.number().describe('채널의 구독자 수입니다.'),
  channelTotalVideos: z.number().describe('채널의 비디오 수입니다.'),
  channelAverageViews: z.number().describe('채널의 평균 조회 수입니다.'),
});

export const zChannelNameAutocompleteQuery = zInfluentialChannelRes.pick({
  channelName: true,
});

export const zChannelNameAutocompleteResponse = z.object({
  thumbnail: z.string().url().describe('Channel thumbnail URL'),
  channelName: zChannelNameAutocompleteQuery.shape.channelName,
  subscriberCount: z.number().int().nonnegative().describe('Subscriber count'),
});

export const zChannelNameAutocompleteList = z.array(
  zChannelNameAutocompleteResponse,
);

export const zChannelNameAutocompleteListData = dataObject(
  zChannelNameAutocompleteList,
);

export const zAutocompleteChannelName = zChannelNameAutocompleteListData;

export const zGetVideoTimelineQuery = zChannelId;

export const zGetRegisterChannelIdQuery = zChannelId;
export const zGetVideoTimelineResponse = z.object({
  videoId: z.string().url(),
  title: z.string().min(1, 'Title must not be empty'),
  views: z.number().nonnegative('Views must be a non-negative integer'),
  publishedDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
});

export const zRegisteredChannelContentsResp = z.object({
  videoId: z.string().nonempty('Video ID는 빈 문자열일 수 없습니다.'), // 비디오의 고유 식별자
  videoTitle: z.string().nonempty('비디오 제목은 빈 문자열일 수 없습니다.'), // 비디오 제목
  videoViews: z.number().nonnegative('비디오 조회수는 음수일 수 없습니다.'), // 비디오 조회수
  videoPublished: z.date(),
  videoUseText: z.string().nullable(),
});

export const zRegisterChannelListResponseObject =
  zChannelListResponseObject.pick({
    channelId: true,
    channelName: true,
    channelThumbnail: true,
    channelSubscribers: true,
    channelAverageViews: true,
    channelTotalViews: true,
  });
export const zRegisterChannelAnalysisResponse = z.array(
  zRegisterChannelListResponseObject,
);

export const zRegisteredChannelContentsResponse = z.array(
  zRegisteredChannelContentsResp,
);
export const zGetContentListQuery = zDateQuery
  .pick({ from: true })
  .merge(zSearchKeyword.pick({ search: true }))
  .merge(zChannelId)
  .merge(zSortQuery(['video_published', 'video_views']));

// Define the response schema
export const zChannelListResponse = z.array(zChannelListResponseObject);

export const zChannelListRes = dataObject(zChannelListResponse);

export type TChannelNameAutocompleteResponse = z.TypeOf<
  typeof zChannelNameAutocompleteResponse
>;
export type TChannelVideoTimeLineResp = z.TypeOf<
  typeof zGetVideoTimelineResponse
>;
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

export type TGetRegisteredChannelRes = z.TypeOf<
  typeof zRegisterChannelAnalysisResponse
>;
