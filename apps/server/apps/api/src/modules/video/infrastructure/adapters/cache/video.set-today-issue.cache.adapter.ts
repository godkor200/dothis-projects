import { Injectable } from '@nestjs/common';
import { SetVideoTodayIssueCacheOutboundPort } from '@Apps/modules/related-word/domain/ports/set-video-today-issue.cache.outbound.port';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { GetVideoMultiKeywordCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { ITodayIssue } from '@Apps/modules/video/infrastructure/daos/video.res';

@Injectable()
export class SetVideoTodayIssueCacheAdapter
  implements SetVideoTodayIssueCacheOutboundPort
{
  constructor(
    @InjectRedis('ranking')
    private readonly redisClient: Redis,
  ) {}
  async execute(
    dao: GetVideoMultiKeywordCacheDao[],
    data: ITodayIssue[],
  ): Promise<void> {
    const key = dao.map((e) => `${e.search}:${e.related}`).join('/');
    for (const [i, v] of data.entries()) {
      const { category, videoId, videoViews, videoPublished, videoTitle } = v;
      await this.redisClient.zadd(
        key,
        i,
        `${category}:${videoId}:${videoViews}:${videoPublished}:${videoTitle}`,
      );
    }
    const aDay = 24 * 60 * 60;
    await this.redisClient.expire(key, aDay);
  }
}
