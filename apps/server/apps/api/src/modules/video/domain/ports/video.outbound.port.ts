import {
  RelatedVideoAndCountByDayDao,
  RelatedVideoAndVideoHistoryDao,
  SearchRelationVideoDao,
} from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { Result } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { VideoHistoryNotFoundError } from '@Apps/modules/video_history/domain/events/video_history.err';
import {
  FindIndividualVideoInfoV1Dao,
  GetRelatedLastVideoAndVideoHistory,
  GetRelatedVideoHistory,
  GetVideoDao,
} from '@Apps/modules/video/infrastructure/daos/video.dao';
import {
  CountByDayRes,
  IVideoSchema,
} from '@Apps/modules/video/infrastructure/daos/video.res';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
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
export interface VideoOutboundPort {
  getRelatedVideoAndVideoHistory(
    props: RelatedVideoAndVideoHistoryDao,
  ): Promise<TRelatedVideoAndHistoryRes>;

  getRelatedVideos(props: SearchRelationVideoDao): Promise<TRelatedVideos>;

  getRelatedVideosCountByDay(
    props: RelatedVideoAndCountByDayDao,
  ): Promise<TRelatedVideosCountByDay>;

  getRelatedVideosEntireCount(dao: GetVideoDao): Promise<TRelatedEntireCount>;

  getRelatedVideosPaginated(dao: GetVideoDao): Promise<TRelatedVideos>;

  getRelatedLastVideoAndVideoHistory(
    dao: GetRelatedLastVideoAndVideoHistory,
  ): Promise<void>;
}

export interface IHistoryListOutboundPort
  extends Pick<VideoOutboundPort, 'getRelatedVideoAndVideoHistory'> {}
export interface IVideosCountByDay
  extends Pick<VideoOutboundPort, 'getRelatedVideosCountByDay'> {}

export interface IGetRelatedLastVideoHistory
  extends Pick<VideoOutboundPort, 'getRelatedLastVideoAndVideoHistory'> {}
