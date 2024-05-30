import {
  GetVideoCacheDao,
  GetVideosMultiRelatedWordsCacheDao,
} from '@Apps/modules/video/infrastructure/daos/video.dao';
import { Result } from 'oxide.ts';
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
export type VideosMultiRelatedWordsCacheType = Record<
  string,
  VideoCacheReturnType[]
>;
export type VideosMultiRelatedWordsCacheTypeResult = Result<
  VideosMultiRelatedWordsCacheType,
  any
>;
export interface VideosMultiRelatedWordsCacheOutboundPorts {
  execute(
    dao: GetVideosMultiRelatedWordsCacheDao,
  ): Promise<VideosMultiRelatedWordsCacheTypeResult>;
}
