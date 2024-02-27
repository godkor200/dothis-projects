import { Result } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video_history/domain/event/video_history.err';
import { IGetVideoHistoryDao } from '@Apps/modules/video_history/infrastructure/daos/video-history.dao';
export interface GetRelatedVideoAndVideoHistory {
  videoId: string;
  videoViews: number;
  videoLikes: number;
  videoComments: number;
  videoPerformance: number;
  year: number;
  month: number;
  day: number;
}
export type TGetVideoHistoryRes = Result<
  GetRelatedVideoAndVideoHistory[],
  VideoHistoryNotFoundError
>;

export interface VideoHistoryOutboundPort {
  getHistory(dao: IGetVideoHistoryDao): Promise<TGetVideoHistoryRes>;
}
