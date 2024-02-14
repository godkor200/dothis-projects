import { IFindManyVideoResult } from './find-many-video.interface';
import { SearchRelationVideoDto } from '@Apps/modules/video/application/dtos/find-videos.dtos';

export interface VideoAdapter {
  findManyVideo: (tag: string) => Promise<string[]>;

  findVideoBySearchOrRelated: (
    query: SearchRelationVideoDto,
  ) => Promise<IFindManyVideoResult[]>;
}
