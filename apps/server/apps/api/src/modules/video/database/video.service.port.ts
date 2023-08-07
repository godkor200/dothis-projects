import { FindVideoQuery } from '@Apps/modules/video/queries/v1/find-video/find-video.query-handler';
import { IfindManyVideoResult } from '@Apps/modules/video/interface/find-many-video.interface';
import { FindDailyViewsQuery } from '@Apps/modules/daily_views/interface/find-daily-views.dto';

export interface VideoServicePort {
  findManyVideo(tag: string): Promise<string[]>;

  findVideoByWords(words: FindVideoQuery): Promise<IfindManyVideoResult[]>;

  findvideoIdfullScanAndVideos(query: FindDailyViewsQuery): Promise<string[]>;
}
