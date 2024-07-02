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
import { Err, Ok } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { VideoFetchHelper } from '@Apps/modules/video/application/service/helpers/video.fetch.helper';

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
      if (!searchResults.length) return Err(new VideoNotFoundError());

      const filteredByDateRange = VideoFetchHelper.filterByDateRangeAndCluster(
        searchResults,
        from,
        to,
        dao.relatedCluster,
      );

      let finalResults: string[];

      if (related) {
        const relatedResults = await this.redisClient.smembers(related);
        if (!relatedResults.length) return Err(new VideoNotFoundError());

        const filteredRelatedResults =
          VideoFetchHelper.filterByDateRangeAndCluster(
            relatedResults,
            from,
            to,
            dao.relatedCluster,
          );

        const intersectionResults = filteredByDateRange.filter((item) =>
          filteredRelatedResults.includes(item),
        );

        finalResults = intersectionResults;
      } else {
        finalResults = filteredByDateRange;
      }

      console.log(
        `search:${dao.search},related:${dao.related}`,
        `[Final Results Count]: ${finalResults.length}`,
        `[Final Results]:`,
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
