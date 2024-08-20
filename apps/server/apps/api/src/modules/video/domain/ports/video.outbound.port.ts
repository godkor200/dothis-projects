import {
  GetVideoViewsMatchingSearchOnSpecificDateDao,
  SearchRelationVideoAndHistoryDao,
  SearchRelationVideoDao,
} from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { Result } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import {
  GetAdsInfoResDao,
  GetRelatedLastVideoAndVideoHistory,
  GetRelatedLastVideoAndVideoHistoryEach,
  GetRelatedVideoHistory,
  GetVideoAdsTopHitsDao,
  GetVideoAndChannelViewsByDateAndKeywordsDao,
  GetVideoDao,
} from '@Apps/modules/video/infrastructure/daos/video.dao';
import {
  CountByDayRes,
  GetVideoAndChannelViewsByDateAndKeywordsRes,
  IVideoSchema,
  TVideoRes,
} from '@Apps/modules/video/application/dtos/video.res';
import {
  CacheDoesNotFoundException,
  TableNotFoundException,
} from '@Libs/commons';

import { TFindAdsInfoRes } from '@Apps/modules/video/application/queries/v1/find-ads-info.query-handler';
import { GetAdsRelatedTopHitsRes } from '@dothis/dto';
import { GetRelatedVideoAndVideoHistory } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { VideoNoKeywordPaginatedDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';

export type TRelatedVideoAndHistoryRes = Result<
  GetRelatedVideoHistory[],
  VideoNotFoundError | VideoHistoryNotFoundError | TableNotFoundException
>;
export type TRelatedVideos = Result<
  IVideoSchema[],
  VideoNotFoundError | VideoHistoryNotFoundError | TableNotFoundException
>;
export type TRelatedEntireCount = Result<
  number[][],
  VideoNotFoundError | TableNotFoundException
>;
export type TGetRelatedLastVideoAndVideoHistory = Result<
  GetRelatedVideoAndVideoHistory[],
  | VideoHistoryNotFoundError
  | TableNotFoundException
  | CacheDoesNotFoundException
>;
export type TGetVideoWithChannelInfo = Result<
  IVideoSchema,
  VideoNotFoundError | TableNotFoundException
>;
export type TRelatedVideosCountByDay = Result<
  CountByDayRes[],
  VideoHistoryNotFoundError | TableNotFoundException
>;
export type TFindAdsTopHitsRepoRes = Result<
  GetAdsRelatedTopHitsRes[],
  VideoNotFoundError | TableNotFoundException
>;
export type TGetVideoAndChannelViewsByDateAndKeywordsRes = Result<
  GetVideoAndChannelViewsByDateAndKeywordsRes[],
  TableNotFoundException | VideoNotFoundError
>;
export type TGetVideoViewsMatchingSearchOnSpecificDateRes<T> = Result<
  T[],
  VideoNotFoundError | TableNotFoundException | CacheDoesNotFoundException
>;
export interface IGetRelatedVideoOutboundPort {
  execute(props: SearchRelationVideoDao): Promise<TRelatedVideos>;
}
export interface IGetRelatedVideoAndVideoHistoryOutBoundPort {
  execute(
    props: SearchRelationVideoAndHistoryDao,
  ): Promise<TRelatedVideoAndHistoryRes>;
}
export interface IGetRelatedVideosCountByDayOutBoundPort {
  execute(
    dao: SearchRelationVideoAndHistoryDao,
  ): Promise<TRelatedVideosCountByDay>;
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
  execute(dao: GetRelatedLastVideoAndVideoHistory): Promise<any>;
}

export interface IGetVideoAdsInfoAdapterOutboundPort {
  execute(dao: GetAdsInfoResDao): Promise<TFindAdsInfoRes>;
}
export interface IGetVideoAdsTopHitsAdapterOutboundPort {
  execute(dao: GetVideoAdsTopHitsDao): Promise<TFindAdsTopHitsRepoRes>;
}
export interface IGetVideoAndChannelViewsByDateAndKeywordsOutboundPort {
  execute(
    dao: GetVideoAndChannelViewsByDateAndKeywordsDao,
  ): Promise<TGetVideoAndChannelViewsByDateAndKeywordsRes>;
}
export interface IGetVideoViewsMatchingSearchOnSpecificDateOutboundPort {
  execute<T>(
    dao: GetVideoViewsMatchingSearchOnSpecificDateDao,
  ): Promise<TGetVideoViewsMatchingSearchOnSpecificDateRes<T>>;
}
export interface IGetVideoVideoNoKeywordPaginatedOutboundPort {
  execute(dao: VideoNoKeywordPaginatedDao): Promise<TVideoRes>;
}
