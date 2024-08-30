import { ITodayIssue } from '@Apps/modules/video/application/dtos/video.res';

export interface SetVideoTodayIssueCacheOutboundPort {
  execute(data: ITodayIssue[]): Promise<void>;
}
