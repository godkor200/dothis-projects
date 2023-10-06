import { FindVideoQuery } from '@Apps/modules/video/queries/v1/find-video/find-video.query-handler';
import {
  IFindManyVideoResult,
  IPagingRes,
} from '@Apps/modules/video/interface/find-many-video.interface';
import { FindDailyViewsQuery } from '@Apps/modules/daily_views/interface/find-daily-views.dto';
import { FindVideoPageQuery } from '@Apps/modules/video/queries/v1/find-video-paging/find-video-paging.req.dto';

export interface VideoServicePort {
  findManyVideo(tag: string): Promise<string[]>;

  findVideoByWords(words: FindVideoQuery): Promise<IFindManyVideoResult[]>;

  findvideoIdfullScanAndVideos(query: FindDailyViewsQuery): Promise<string[]>;

  findVideoPaging(arg: FindVideoPageQuery): Promise<IPagingRes>;
}
