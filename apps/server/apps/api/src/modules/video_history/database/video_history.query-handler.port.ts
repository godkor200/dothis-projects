import { IFindVideoHistoryResposne } from '@Apps/modules/video_history/interface/find-video.history.resposne';
import { OsRes } from '@Apps/common/aws/interface/os.res.interface';

export interface VideoHistoryQueryHandlerPort {
  findVideoHistory(
    videoId: string[],
    from: string,
    to: string,
    clusterNumber: string,
  ): Promise<OsRes<IFindVideoHistoryResposne>[]>;
}
