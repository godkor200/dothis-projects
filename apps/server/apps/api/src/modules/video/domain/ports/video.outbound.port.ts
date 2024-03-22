import {
  RelatedVideoAndCountByDayDao,
  RelatedVideoAndVideoHistoryDao,
  SearchRelationVideoDao,
} from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { Result } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import {
  GetAdsInfoResDao,
  GetRelatedLastVideoAndVideoHistory,
  GetRelatedLastVideoAndVideoHistoryEach,
  GetRelatedVideoChannelHistoryDao,
  GetRelatedVideoHistory,
  GetVideoAdsTopHitsDao,
  GetVideoDao,
} from '@Apps/modules/video/infrastructure/daos/video.dao';
import {
  CountByDayRes,
  IVideoSchema,
} from '@Apps/modules/video/infrastructure/daos/video.res';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { TGetRelatedLastVideoAndVideoHistory } from '@Apps/modules/video/infrastructure/adapters/video.last-history.adapter';
import {
  TGetRelatedVideoChannelHistoryRes,
  VideoChannelHistoryAdapter,
} from '@Apps/modules/video/infrastructure/adapters/video.channel-history.adapter';
import { TGetRelatedVideoAnalyticsData } from '@Apps/modules/video/infrastructure/adapters/video.history-multiple.adapter';
import { TFindAdsInfoRes } from '@Apps/modules/video/application/queries/v1/find-ads-info.query-handler';
import { VideoAdsTopHitsAdapter } from '@Apps/modules/video/infrastructure/adapters/video.ads.top-hits.adapter';
import { TFindAdsTopHits } from '@Apps/modules/video/application/queries/v1/find-ads-top-hits.query-handler';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { GetAdsRelatedTopHitsRes } from '@dothis/dto';
const IgniteClient = require('apache-ignite-client');
const IllegalStateError = IgniteClient.Errors.IllegalStateError;

export type TRelatedVideoAndHistoryRes = Result<
  GetRelatedVideoHistory[],
  VideoNotFoundError | VideoHistoryNotFoundError | typeof IllegalStateError
>;
export type TRelatedVideos = Result<
  IVideoSchema[],
  VideoNotFoundError | VideoHistoryNotFoundError | TableNotFoundException
>;
export type TRelatedEntireCount = Result<
  number[][],
  VideoNotFoundError | TableNotFoundException
>;

export type TGetVideoWithChannelInfo = Result<
  IVideoSchema,
  VideoNotFoundError | TableNotFoundException
>;
export type TRelatedVideosCountByDay = Result<CountByDayRes[], any>;
export type TFindAdsTopHitsRepoRes = Result<
  GetAdsRelatedTopHitsRes[],
  VideoNotFoundError | TableNotFoundException
>;
export interface IGetRelatedVideoOutboundPort {
  execute(props: SearchRelationVideoDao): Promise<TRelatedVideos>;
}
export interface IGetRelatedVideoAndVideoHistoryOutBoundPort {
  execute(
    props: RelatedVideoAndVideoHistoryDao,
  ): Promise<TRelatedVideoAndHistoryRes>;
}
export interface IGetRelatedVideosCountByDayOutBoundPort {
  execute(dao: RelatedVideoAndCountByDayDao): Promise<TRelatedVideosCountByDay>;
}
export interface IGetRelatedVideosPaginatedOutBoundPort {
  execute(dao: GetVideoDao): Promise<TRelatedVideos>;
}
export interface IGetRelatedVideosEntireCountOutBoundPort {
  execute(dao: GetVideoDao): Promise<TRelatedEntireCount>;
}

export interface IGetRelatedLastVideoHistoryEach {
  execute(
    dao: GetRelatedLastVideoAndVideoHistoryEach,
  ): Promise<TGetRelatedLastVideoAndVideoHistory>;
}
export interface IGetRelatedLastVideoHistory {
  execute(
    dao: GetRelatedLastVideoAndVideoHistory,
  ): Promise<TGetRelatedVideoAnalyticsData>;
}
export interface IGetRelatedVideoChannelHistoryOutboundPort {
  execute(
    dao: GetRelatedVideoChannelHistoryDao,
  ): Promise<TGetRelatedVideoChannelHistoryRes>;
}
export interface IGetVideoAdsInfoAdapterOutboundPort {
  execute(dao: GetAdsInfoResDao): Promise<TFindAdsInfoRes>;
}
export interface IGetVideoAdsTopHitsAdapterOutboundPort {
  execute(dao: GetVideoAdsTopHitsDao): Promise<TFindAdsTopHitsRepoRes>;
}
