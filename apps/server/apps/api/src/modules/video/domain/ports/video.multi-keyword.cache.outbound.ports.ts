import { GetVideoMultiKeywordCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';

export interface VideoMultiKeywordCacheOutboundPorts {
  execute(daos: GetVideoMultiKeywordCacheDao[]): Promise<void>;
}
