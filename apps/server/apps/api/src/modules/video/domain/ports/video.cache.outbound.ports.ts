import {
  GetVideoCacheDao,
  GetVideosMultiRelatedWordsCacheDao,
} from '@Apps/modules/video/infrastructure/daos/video.dao';
import { Result } from 'oxide.ts';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
export type VideoCacheRecord = Record<string, VideoCacheReturnType[]>;
export type VideoCacheReturnType = {
  publishedDate: string;
  videoId: string;
  cluster: string;
  channelId?: string;
};

export interface VideoCacheOutboundPorts {
  execute(dao: GetVideoCacheDao): Promise<VideoCacheAdapterRes>;
}
export type VideosMultiRelatedWordsCacheType = Record<
  string,
  VideoCacheReturnType[]
>;

export type VideoCacheAdapterRes = Result<VideoCacheRecord, VideoNotFoundError>;
export type VideosMultiRelatedWordsCacheTypeResult = Result<
  VideosMultiRelatedWordsCacheType,
  TableNotFoundException | VideoNotFoundError
>;
export interface VideosMultiRelatedWordsCacheOutboundPorts {
  execute(
    dao: GetVideosMultiRelatedWordsCacheDao,
  ): Promise<VideosMultiRelatedWordsCacheTypeResult>;
}
