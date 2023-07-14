import { IfindManyVideoResult } from './find-many-video.interface';

export interface VideoAdapter {
  findManyVideo: (tag: string) => Promise<any[]>;
}
