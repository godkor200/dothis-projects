import { GetVideoMultiKeywordCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { Result } from 'oxide.ts';
import { ITodayIssue } from '@Apps/modules/video/infrastructure/daos/video.res';
import { TodayIssueNotFoundError } from '@Apps/modules/video/domain/events/video.error';

export type TGetVideoTodayIssueCacheAdapterRes = Result<
  ITodayIssue[],
  TodayIssueNotFoundError
>;

export interface GetVideoTodayIssueCacheOutboundPort {
  execute(
    dao: GetVideoMultiKeywordCacheDao[],
  ): Promise<TGetVideoTodayIssueCacheAdapterRes>;
}
