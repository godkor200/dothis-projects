import { IgniteService } from '@Apps/common/ignite/service/ignite.service';

export class VideoHistoryBaseAdapter {
  readonly keys: string[] = [
    'VIDEO_ID',
    'VIDEO_VIEWS',
    'VIDEO_LIKES',
    'VIDEO_COMMENTS',
    'VIDEO_PERFORMANCE',
    'VIDEO_CLUSTER',
    'YEAR',
    'MONTH',
    'DAY',
  ];
}
