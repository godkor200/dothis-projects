import { FindVideoPageQuery } from '@Apps/modules/video/queries/v1/find-video-paging/find-video-paging.req.dto';
import {
  FindVideoDateQuery,
  VIDEO_DATA_KEY,
} from '@Apps/modules/video/dtos/find-videos.dtos';
import { FindVideoQuery } from '@Apps/modules/video/queries/v1/find-video/find-video.query-handler';
import {
  IFindManyVideoResult,
  IPagingRes,
} from '@Apps/modules/video/interface/find-many-video.interface';

export class FindVideoByMultipleIndex {
  public readonly keyword: string;
  public readonly relWord: string;
  public readonly cluster: string[];
  public readonly data: VIDEO_DATA_KEY[];
  constructor(props: FindVideoByMultipleIndex) {
    this.keyword = props.keyword;
    this.relWord = props.relWord;
    this.cluster = props.cluster;
    this.data = props.data;
  }
}

export interface VideoServicePort {
  findManyVideo(tag: string): Promise<string[]>;

  findVideoByWords(words: FindVideoQuery): Promise<IFindManyVideoResult[]>;

  findvideoIdfullScanAndVideos<T>(query: FindVideoDateQuery): Promise<T[]>;

  findVideoPaging(arg: FindVideoPageQuery): Promise<IPagingRes>;

  findVideosWithMultipleIndex<T>(arg: FindVideoByMultipleIndex): Promise<T[]>;
}
