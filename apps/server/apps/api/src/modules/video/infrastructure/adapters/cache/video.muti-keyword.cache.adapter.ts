import { Injectable } from '@nestjs/common';
import { VideoCacheReturnType } from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
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

// TimeUnit enum 정의
export enum TimeUnit {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}
@Injectable()
export class VideoMultiKeywordCacheAdapter
  implements VideoMultiKeywordCacheOutboundPorts
{
  private appGlobalConfig = appGlobalConfig;

  constructor(
    @InjectRedis('onPromise')
    private readonly redisClient: Redis,
  ) {}

  private isWithinRange(
    date: string,
    to: string,
    unit: TimeUnit = TimeUnit.YEAR, // enum 사용
    value: number = 1,
  ): boolean {
    const from = dayjs(to).subtract(value, unit); // `to`로부터 `unit`을 빼서 `from` 계산
    return (
      dayjs(date).isAfter(from) && dayjs(date).isBefore(dayjs(to).add(1, 'day'))
    );
  }
  async execute(
    daos: GetVideoMultiKeywordCacheDao[],
    unit: TimeUnit = TimeUnit.YEAR, // enum 사용, 기본값은 'year'
    value: number = 1, // 단위에 추가될 값 (기본값은 1)
  ): Promise<TVideoMultiKeywordCacheRes> {
    try {
      const today = dayjs().format('YYYY-MM-DD');

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
          return this.isWithinRange(publishDate, today, unit, value);
        });

        if (related) {
          const relatedResults = results[resultIndex][1] as string[];
          resultIndex++;

          const filteredByDateRangeRelated = relatedResults.filter((item) => {
            const [publishDate] = item.split(':');
            return this.isWithinRange(publishDate, today, unit, value);
          });

          // 교집합 계산
          const intersection = filteredByDateRangeSearch.filter((value) =>
            filteredByDateRangeRelated.includes(value),
          );
          intersectionResults[search] =
            RedisResultMapper.toObjects(intersection);
        } else {
          // 관련 검색어가 없는 경우
          intersectionResults[search] = RedisResultMapper.toObjects(
            filteredByDateRangeSearch,
          );
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
