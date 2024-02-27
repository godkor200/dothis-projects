import { GetRelatedVideoAndVideoHistory } from '@Apps/modules/video_history/domain/ports/video-history.outbound.port';

export interface IGetVideoHistoryDao
  extends Pick<GetRelatedVideoAndVideoHistory, 'videoId'> {
  clusterNumber: string;
  from?: string;
  to?: string;
}
