import { Injectable } from '@nestjs/common';
import {
  VideoCacheAdapterRes,
  VideoCacheOutboundPorts,
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

  async execute(daos: GetVideoMultiKeywordCacheDao[]): Promise<void> {
    const today = dayjs().format('YYYY-MM-DD');
    const fromOneYearAgo = dayjs().subtract(1, 'year').format('YYYY-MM-DD');

    let finalResults: string[] = [];
    const multi = this.redisClient.multi();

    // // 각 dao에 대해 multi 명령어 추가
    // for (const dao of daos) {
    //   const { search, related } = dao;
    //   multi.smembers(search);
    //   if (related) {
    //     multi.smembers(related);
    //   }
    // }
    //
    // // multi 명령어 실행
    // const results = await multi.exec();
    //
    // let resultIndex = 0;
    // for (const dao of daos) {
    //   const { search, related } = dao;
    //   const searchResults = results[resultIndex][1];
    //   resultIndex++;
    //
    //   if (!searchResults.length) continue;
    //
    //   const filteredByDateRange = searchResults.filter((item) => {
    //     const [publishDate] = item.split(':');
    //     return this.isWithinRange(publishDate, fromOneYearAgo, today);
    //   });
    //
    //   if (related) {
    //     const relatedResults = results[resultIndex][1];
    //     resultIndex++;
    //     if (!relatedResults.length) continue;
    //
    //     const filteredRelatedResults = relatedResults.filter((item) => {
    //       const [publishDate] = item.split(':');
    //       return this.isWithinRange(publishDate, fromOneYearAgo, today);
    //     });
    //
    //     const intersectionResults = filteredByDateRange.filter((item) =>
    //       filteredRelatedResults.includes(item),
    //     );
    //
    //     finalResults = [...finalResults, ...intersectionResults];
    //   } else {
    //     finalResults = [...finalResults, ...filteredByDateRange];
    //   }
    // }
    //
    // if (!finalResults.length) return Err(new VideoNotFoundError());
    //
    // return Ok(
    //   RedisResultMapper.groupByCluster(
    //     RedisResultMapper.toObjects(finalResults),
    //   ),
    // );
  }
}
