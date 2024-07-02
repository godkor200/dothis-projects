import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { Injectable } from '@nestjs/common';
import {
  GetVideoTodayIssueCacheOutboundPort,
  TGetVideoTodayIssueCacheAdapterRes,
} from '@Apps/modules/related-word/domain/ports/get-video-today-issue.cache.outbound.port';
import { GetVideoMultiKeywordCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';

import { Err, Ok, Result } from 'oxide.ts';
import { TodayIssueNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { TodayIssueMapper } from '@Apps/modules/video/application/mapper/today-issue.mapper';

@Injectable()
export class GetVideoTodayIssueCacheAdapter
  implements GetVideoTodayIssueCacheOutboundPort
{
  constructor(
    @InjectRedis('ranking')
    private readonly redisClient: Redis,
  ) {}
  async execute(
    dao: GetVideoMultiKeywordCacheDao[],
  ): Promise<TGetVideoTodayIssueCacheAdapterRes> {
    const key = dao.map((e) => `${e.search}:${e.related}`).join('/');
    try {
      const res = await this.redisClient.zrange(key, 0, -1, 'WITHSCORES');
      if (!res.length) return Err(new TodayIssueNotFoundError());
      return Ok(TodayIssueMapper.toObject(res));
    } catch (e) {
      return Err(e);
    }
  }
}
