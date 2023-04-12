import { VideoEntity } from '../repository/db/videos.entity';

export interface FindVideoAdapter {
  findManyVideo: (tag: string) => Promise<VideoEntity[]>;
}
