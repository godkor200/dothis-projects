import { IgniteService } from '@Apps/common/ignite/service/ignite.service';

export class VideoHistoryBaseAdapter extends IgniteService {
  readonly keys: string[] = [
    'VIDEO_ID',
    'VIDEO_VIEWS',
    'VIDEO_LIKES',
    'VIDEO_COMMENTS',
    'VIDEO_PERFORMANCE',
    'YEAR',
    'MONTH',
    'DAY',
  ];
}
