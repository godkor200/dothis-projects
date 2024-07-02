import { Injectable } from '@nestjs/common';
import {
  VideoCacheAdapterRes,
  VideoCacheOutboundPorts,
  VideoCacheReturnType,
} from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
import { GetVideoMultiKeywordCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { RedisResultMapper } from '@Apps/common/redis/mapper/to-object.mapper';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { appGlobalConfig } from '@Apps/config/app/config/app.global';
import { Redis } from 'ioredis';
import dayjs from 'dayjs';
import { Err, Ok, Result } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { VideoMultiKeywordCacheOutboundPorts } from '@Apps/modules/video/domain/ports/video.multi-keyword.cache.outbound.ports';
export type TVideoMultiKeywordCacheRes = Result<
  Record<string, VideoCacheReturnType[]>,
  VideoNotFoundError
>;
@Injectable()
export class VideoMultiKeywordCacheAdapter
  implements VideoMultiKeywordCacheOutboundPorts
{
  private appGlobalConfig = appGlobalConfig;

  constructor(
    @InjectRedis('onPromise')
    private readonly redisClient: Redis,
  ) {}

  private isWithinRange(date: string, from: string, to: string): boolean {
    return (
      dayjs(date).isAfter(dayjs(from).subtract(1, 'year')) &&
      dayjs(date).isBefore(dayjs(to).add(1, 'day'))
    );
  }
  async execute(
    daos: GetVideoMultiKeywordCacheDao[],
  ): Promise<TVideoMultiKeywordCacheRes> {
    try {
      const today = dayjs().format('YYYY-MM-DD');
      const fromOneYearAgo = dayjs().subtract(1, 'year').format('YYYY-MM-DD');

      let intersectionResults: Record<string, VideoCacheReturnType[]> = {};

      const multi = this.redisClient.multi();

      // 각 dao에 대해 multi 명령어 추가
      for (const dao of daos) {
        const { search, related } = dao;
        multi.smembers(search);
        if (related) {
          multi.smembers(related);
        }
      }

      // multi 명령어 실행
      const results = await multi.exec();

      let resultIndex = 0;
      for (const dao of daos) {
        const { search, related } = dao;
        const searchResults = results[resultIndex][1] as string[];
        resultIndex++;

        const filteredByDateRangeSearch = searchResults.filter((item) => {
          const [publishDate] = item.split(':');
          return this.isWithinRange(publishDate, fromOneYearAgo, today);
        });

        if (related) {
          const relatedResults = results[resultIndex][1] as string[];
          resultIndex++;

          const filteredByDateRangeRelated = relatedResults.filter((item) => {
            const [publishDate] = item.split(':');
            return this.isWithinRange(publishDate, fromOneYearAgo, today);
          });

          // 교집합 계산
          const intersection = filteredByDateRangeSearch.filter((value) =>
            filteredByDateRangeRelated.includes(value),
          );
          intersectionResults[search] =
            RedisResultMapper.toObjects(intersection);
        }
      }

      if (Object.keys(intersectionResults).length === 0)
        return Err(new VideoNotFoundError());

      return Ok(intersectionResults);
    } catch (e) {
      return Err(e);
    }
  }
}
