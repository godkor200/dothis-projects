import { Result } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import {
  IGetLastVideoHistoryDao,
  IGetListVideoHistoryDao,
  IGetVideoHistoryDao,
  IGetVideoHistoryGetMultipleByIdDao,
  GetVideoHistoryMultipleByIdV2Dao,
  GetVideoHistoryMultipleByIdAndRelatedWordsDao,
  VideoHistoryGetTopViewsByIdsDao,
} from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import {
  ComplexQueryException,
  TableNotFoundException,
} from '@Libs/commons/src/exceptions/exceptions';
import {
  DateData,
  ITodayIssue,
  IVideoSchema,
} from '@Apps/modules/video/infrastructure/daos/video.res';
import { TIssueTodayRes } from '@Apps/modules/video/application/queries/v1/find-issue-today.query-handler';

export interface GetRelatedVideoAndVideoHistoryPickChannelAverageViews
  extends DateData {
  videoId: string;
  videoViews: number;
  videoLikes: number;
  videoComments: number;
  videoPerformance: number;
  videoCluster: number;
  channelAverageViews: number;
}
export interface GetRelatedVideoAndVideoHistory
  extends Omit<
    GetRelatedVideoAndVideoHistoryPickChannelAverageViews,
    'channelAverageViews'
  > {}

export type TGetVideoHistoryRes = Result<
  GetRelatedVideoAndVideoHistory[],
  VideoHistoryNotFoundError | TableNotFoundException | ComplexQueryException
>;

export interface IRelatedVideoAnalyticsData
  extends Pick<
    GetRelatedVideoAndVideoHistory,
    'videoId' | 'videoViews' | 'day'
  > {
  channelAverageViews: number;
  channelId: string;
  videoTitle: string;
  videoTags: string;
}

export interface IGetOneVideoHistoryOutboundPort {
  execute(dao: IGetVideoHistoryDao): Promise<TGetVideoHistoryRes>;
}
export interface IGetLastVideoHistoryOutboundPort {
  execute(dao: IGetLastVideoHistoryDao): Promise<TGetVideoHistoryRes>;
}
export interface IGetListVideoHistoryOutboundPort {
  execute(dao: IGetListVideoHistoryDao): Promise<TGetVideoHistoryRes>;
}
export interface IGetVideoHistoryGetMultipleByIdOutboundPort {
  execute(
    dao: IGetVideoHistoryGetMultipleByIdDao,
  ): Promise<TGetVideoHistoryRes>;
}
export interface IGetVideoHistoryGetMultipleByIdV2OutboundPort {
  execute(dao: GetVideoHistoryMultipleByIdV2Dao): Promise<TGetVideoHistoryRes>;
}
export interface IGetVideoHistoryLastOneByIdsOutboundPort {
  execute(
    dao: GetVideoHistoryMultipleByIdAndRelatedWordsDao,
  ): Promise<TGetVideoHistoryRes>;
}

export interface IVideoHistoryGetTopViewsByIdsOutboundPort {
  execute(dao: VideoHistoryGetTopViewsByIdsDao): Promise<TIssueTodayRes>;
}
