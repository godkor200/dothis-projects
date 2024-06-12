import { Injectable } from '@nestjs/common';
import {
  VideoCacheAdapterRes,
  VideoCacheOutboundPorts,
} from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
import { GetVideoCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { RedisResultMapper } from '@Apps/common/redis/mapper/to-object.mapper';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { appGlobalConfig } from '@Apps/config/app/config/app.global';
import { Redis } from 'ioredis';
import dayjs from 'dayjs';
import { Err, Ok, Result } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error'; // dayjs 라이브러리 import

@Injectable()
export class VideoCacheAdapter implements VideoCacheOutboundPorts {
  private appGlobalConfig = appGlobalConfig;

  constructor(
    @InjectRedis('onPromise')
    private readonly redisClient: Redis,
  ) {}

  async execute(dao: GetVideoCacheDao): Promise<VideoCacheAdapterRes> {
    const { search, related, from, to } = dao;
    try {
      const searchResults = await this.redisClient.smembers(search);
      console.log(`[탐색어 count]`, searchResults.length);
      if (!searchResults.length) return Err(new VideoNotFoundError());
      let finalResults: string[];

      // from과 to 사이의 날짜인지 확인하는 함수
      const isWithinRange = (date: string, from: string, to: string) => {
        return (
          dayjs(date).isAfter(dayjs(from).subtract(1, 'day')) &&
          dayjs(date).isBefore(dayjs(to).add(1, 'day'))
        );
      };

      // 검색 결과에 대한 날짜 범위 적용
      const filteredByDateRange = searchResults.filter((item) => {
        const [publishDate, channelId, videoId, clusterNumber] =
          item.split(':');

        // dayjs를 사용하여 게시 날짜가 사용자가 지정한 기간 내인지 확인
        return isWithinRange(publishDate, from, to);
      });

      if (related) {
        const relatedResults = await this.redisClient.smembers(related);
        console.log(`[연관어 count]`, relatedResults.length);
        if (!relatedResults.length) return Err(new VideoNotFoundError());

        const filterByDateRange = (items: string[]) =>
          items.filter((item) => {
            const parts = item.split(':');
            const publishDate = parts[0];
            return isWithinRange(publishDate, from, to);
          });

        const filteredRelatedResults = filterByDateRange(relatedResults);

        const intersectionResults = filteredByDateRange.filter((item) =>
          filteredRelatedResults.includes(item),
        );

        finalResults = intersectionResults;
      } else {
        finalResults = filteredByDateRange;
      }

      console.log(
        `[Final Results Count]: ${finalResults.length}`,
        `[Final Results]`,
        finalResults,
      );

      return Ok(
        RedisResultMapper.groupByCluster(
          RedisResultMapper.toObjects(finalResults),
        ),
      );
    } catch (e) {
      return Err(e);
    }
  }
}
