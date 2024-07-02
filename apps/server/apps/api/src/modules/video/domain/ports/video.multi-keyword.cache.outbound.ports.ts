import { GetVideoMultiKeywordCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { TVideoMultiKeywordCacheRes } from '@Apps/modules/video/infrastructure/adapters/cache/video.muti-keyword.cache.adapter';

export interface VideoMultiKeywordCacheOutboundPorts {
  execute(
    daos: GetVideoMultiKeywordCacheDao[],
  ): Promise<TVideoMultiKeywordCacheRes>;
}
