import { IfindManyVideoResult } from './find-many-video.interface';

export interface FindVideoAdapter {
  findManyVideo: (tag: string) => Promise<any[]>;
}
