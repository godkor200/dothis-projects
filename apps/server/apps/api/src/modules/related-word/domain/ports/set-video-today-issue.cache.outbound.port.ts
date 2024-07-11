import { ITodayIssue } from '@Apps/modules/video/infrastructure/daos/video.res';

export interface SetVideoTodayIssueCacheOutboundPort {
  execute(data: ITodayIssue[]): Promise<void>;
}
