import { TIssueTodayRes } from '@Apps/modules/video/application/queries/v1/find-issue-today.query-handler';

export interface FindIssueTodayInboundPort {
  execute(): Promise<TIssueTodayRes>;
}
