import { Injectable } from '@nestjs/common';
import {
  VideoCacheOutboundPorts,
  VideoCacheReturnType,
} from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
import { GetVideoCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { RedisResultMapper } from '@Apps/common/redis/mapper/to-object.mapper';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class VideoCacheAdapter implements VideoCacheOutboundPorts {
  constructor(
    @InjectRedis('onPromise')
    private readonly redisClient: Redis,
  ) {}

  async execute(
    dao: GetVideoCacheDao,
  ): Promise<Record<string, VideoCacheReturnType[]>> {
    const { search, related } = dao;

    // 'search'에 대한 Redis 검색
    const searchResults = await this.redisClient.smembers(search);
    console.log(`[Search Results for '${search}']:`, searchResults);

    let finalResults = searchResults;

    if (related) {
      // 'related'에 대한 Redis 검색
      const relatedResults = await this.redisClient.smembers(related);
      console.log(`[Related Results for '${related}']:`, relatedResults);

      // searchResults와 relatedResults의 교집합 찾기
      // UC로 시작하는 데이터 제외
      const filterUC = (items: string[]) =>
        items.filter((item) => {
          const parts = item.split(':');
          return !parts.some((part) => part.startsWith('UC'));
        });

      const filteredSearchResults = filterUC(searchResults);
      const filteredRelatedResults = filterUC(relatedResults);

      const intersectionResults = filteredSearchResults.filter((item) => {
        const isCommon = filteredRelatedResults.includes(item);
        if (isCommon) {
          console.log(`[Common Element]: ${item}`);
        }
        return isCommon;
      });

      finalResults = intersectionResults;
    }

    // 최종 결과의 개수 로깅
    console.log(`[Final Results Count]: ${finalResults.length}`);

    return RedisResultMapper.groupByCluster(
      RedisResultMapper.toObjects(finalResults),
    );
  }
}
