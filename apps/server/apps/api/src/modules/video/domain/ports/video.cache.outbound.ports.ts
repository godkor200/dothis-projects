import { GetVideoCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
export type VideoCacheRecord = Record<string, VideoCacheReturnType[]>;
export type VideoCacheReturnType = {
  publishedDate: string;
  videoId: string;
  cluster: string;
  channelId?: string;
};

export interface VideoCacheOutboundPorts {
  execute(dao: GetVideoCacheDao): Promise<VideoCacheRecord>;
}
