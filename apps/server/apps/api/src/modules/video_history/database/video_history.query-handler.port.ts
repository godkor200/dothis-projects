import { VIDEO_HISTORY_DATA } from '@Apps/modules/video_history/interface/video_history.res';

export interface VideoHistoryQueryHandlerPort {
  findVideoHistoryFullscan<T>(
    videoId: string[],
    from: string,
    to: string,
    clusterNumber: string,
    data?: VIDEO_HISTORY_DATA[],
  ): Promise<T[]>;
}
