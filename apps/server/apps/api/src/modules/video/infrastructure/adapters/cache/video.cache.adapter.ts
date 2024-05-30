import { Injectable } from '@nestjs/common';
import {
  VideoCacheOutboundPorts,
  VideoCacheReturnType,
} from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
import { GetVideoCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { RedisResultMapper } from '@Apps/common/redis/mapper/to-object.mapper';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { appGlobalConfig } from '@Apps/config/app/config/app.global';
import { Redis } from 'ioredis';
import dayjs from 'dayjs'; // dayjs 라이브러리 import

@Injectable()
export class VideoCacheAdapter implements VideoCacheOutboundPorts {
  private appGlobalConfig = appGlobalConfig;

  constructor(
    @InjectRedis('onPromise')
    private readonly redisClient: Redis,
  ) {}

  async execute(
    dao: GetVideoCacheDao,
  ): Promise<Record<string, VideoCacheReturnType[]>> {
    const { search, related } = dao;
    const period = this.appGlobalConfig.videoPublishedPeriodConstraint; // 게시 기간 제한

    const searchResults = await this.redisClient.smembers(search);
    console.log(`[탐색어 count]`, searchResults.length);
    let finalResults = searchResults;

    // 검색 결과에 대한 게시 기간 제한 적용
    const filteredByDate = finalResults.filter((item) => {
      const [videoId, publishDate] = item.split(':');
      // dayjs를 사용하여 게시 날짜가 제한 기간 내인지 확인
      return dayjs().diff(dayjs(publishDate), 'month') <= period;
    });

    if (related) {
      const relatedResults = await this.redisClient.smembers(related);
      console.log(`[연관어 count]`, relatedResults.length);

      const filterUCAndDate = (items: string[]) =>
        items.filter((item) => {
          const parts = item.split(':');
          const publishDate = parts[1];
          return (
            !parts[0].startsWith('UC') &&
            dayjs().diff(dayjs(publishDate), 'month') <= period
          );
        });

      const filteredSearchResults = filterUCAndDate(filteredByDate);
      const filteredRelatedResults = filterUCAndDate(relatedResults);

      const intersectionResults = filteredSearchResults.filter((item) =>
        filteredRelatedResults.includes(item),
      );

      finalResults = intersectionResults;
    }

    console.log(
      `[Final Results Count]: ${finalResults.length}`,
      `[Final Results]`,
      finalResults,
    );

    return RedisResultMapper.groupByCluster(
      RedisResultMapper.toObjects(finalResults),
    );
  }
}
