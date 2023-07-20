import { FindVideoQuery } from '@Apps/modules/video/queries/v1/find-video/find-video.service';
import { IfindManyVideoResult } from '@Apps/modules/video/interface/find-many-video.interface';

export interface VideoServicePort {
  findManyVideo(tag: string): Promise<string[]>;

  findVideoByWords(words: FindVideoQuery): Promise<IfindManyVideoResult[]>;
}
