import { IfindManyVideoResult } from './find-many-video.interface';
import { FindVideoQuery } from '@Apps/modules/video/queries/v1/find-video/find-video.service';

export interface VideoAdapter {
  findManyVideo: (tag: string) => Promise<string[]>;

  findVideoBySearchOrRelated: (
    query: FindVideoQuery,
  ) => Promise<IfindManyVideoResult[]>;
}
