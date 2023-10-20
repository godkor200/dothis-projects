import { FindVideoHistoryResposne } from '@Apps/modules/video_history/interface/find-video.history.resposne';

export interface VideoHistoryQueryHandlerPort {
  findVideoHistory(
    videoId: string[],
    from: string,
    to: string,
    clusterNumber: string,
  ): Promise<FindVideoHistoryResposne[]>;
}
