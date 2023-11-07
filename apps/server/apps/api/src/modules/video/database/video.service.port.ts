import { FindVideoPageQuery } from '@Apps/modules/video/queries/v1/find-video-paging/find-video-paging.req.dto';
import { FindVideoDateQuery } from '@Apps/modules/video/dtos/find-videos.dtos';
import { FindVideoQuery } from '@Apps/modules/video/queries/v1/find-video/find-video.query-handler';
import {
  IFindManyVideoResult,
  IPagingRes,
} from '@Apps/modules/video/interface/find-many-video.interface';

export interface VideoServicePort {
  findManyVideo(tag: string): Promise<string[]>;

  findVideoByWords(words: FindVideoQuery): Promise<IFindManyVideoResult[]>;

  findvideoIdfullScanAndVideos<T>(query: FindVideoDateQuery): Promise<T[]>;

  findVideoPaging(arg: FindVideoPageQuery): Promise<IPagingRes>;
}
