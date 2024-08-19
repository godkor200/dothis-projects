import { GetVideoMultiKeywordCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import {
  TimeUnit,
  TVideoMultiKeywordCacheRes,
} from '@Apps/modules/video/infrastructure/adapters/cache/video.muti-keyword.cache.adapter';

export interface VideoMultiKeywordCacheOutboundPorts {
  execute(
    daos: GetVideoMultiKeywordCacheDao[],
    unit: TimeUnit, // enum 사용, 기본값은 'year'
    value: number, // 단위에 추가될 값 (기본값은 1)
  ): Promise<TVideoMultiKeywordCacheRes>;
}
