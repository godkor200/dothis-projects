import { IFindVideoHistoryResposne } from '@Apps/modules/video_history/interface/find-video.history.resposne';

export interface VideoHistoryQueryHandlerPort {
  findVideoHistoryFullscan(
    videoId: string[],
    from: string,
    to: string,
    clusterNumber: string,
  ): Promise<IFindVideoHistoryResposne[]>;
}
