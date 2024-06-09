import {
  VideoCacheReturnType,
  VideosMultiRelatedWordsCacheOutboundPorts,
  VideosMultiRelatedWordsCacheTypeResult,
} from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
import { GetVideosMultiRelatedWordsCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { Err, Ok } from 'oxide.ts';
import { RedisResultMapper } from '@Apps/common/redis/mapper/to-object.mapper';
import { appGlobalConfig } from '@Apps/config/app/config/app.global';
import dayjs from 'dayjs';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';

export class VideoMultiRelatedWordsCacheAdapter
  implements VideosMultiRelatedWordsCacheOutboundPorts
{
  private appGlobalConfig = appGlobalConfig;

  constructor(
    @InjectRedis('onPromise')
    private readonly redisClient: Redis,
  ) {}

  async execute(
    dao: GetVideosMultiRelatedWordsCacheDao,
  ): Promise<VideosMultiRelatedWordsCacheTypeResult> {
    try {
      const period = this.appGlobalConfig.videoPublishedPeriodConstraint;
      const words = dao.words;
      const transaction = this.redisClient.multi();
      words.forEach((key) => {
        transaction.smembers(key);
      });
      const results = await transaction.exec();
      if (!results[1].length) return Err(new VideoNotFoundError());

      const currentDate = dayjs(); // 현재 날짜
      const cutoffDate = currentDate.subtract(period, 'month'); // 기준 날짜

      const mappedResults = results.reduce((acc, result, index) => {
        const key = words[index];
        const members = (result[1] as string[]).filter((member) => {
          const dateStr = member.split(':')[0];
          const memberDate = dayjs(dateStr, 'YYYYMMDD');
          return memberDate.isAfter(cutoffDate);
        });

        acc[key] = RedisResultMapper.toObjects(members);
        return acc;
      }, {} as Record<string, VideoCacheReturnType[]>);

      return Ok(mappedResults);
    } catch (e) {
      return Err(e);
    }
  }
}
