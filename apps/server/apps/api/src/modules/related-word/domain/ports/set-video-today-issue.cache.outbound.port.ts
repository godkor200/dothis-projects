import { GetVideoMultiKeywordCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { TIssueTodayRes } from '@Apps/modules/video/application/queries/v1/find-issue-today.query-handler';
import { ITodayIssue } from '@Apps/modules/video/infrastructure/daos/video.res';

export interface SetVideoTodayIssueCacheOutboundPort {
  execute(
    dao: GetVideoMultiKeywordCacheDao[],
    data: ITodayIssue[],
  ): Promise<void>;
}
