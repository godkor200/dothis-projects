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
import { VideoFetchHelper } from '@Apps/modules/video/application/service/helpers/video.fetch.helper';

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
      // results 배열이 정의되어 있는지 확인합니다.
      if (!results || results.length === 0) {
        return Err(new VideoNotFoundError());
      }

      const currentDate = dayjs().format('YYYYMMDD'); // 현재 날짜를 포맷에 맞춰 생성
      const cutoffDate = dayjs().subtract(period, 'month').format('YYYYMMDD'); // 기준 날짜를 포맷에 맞춰 생성

      // words를 순회하며 결과를 매핑합니다.
      const mappedResults = words.reduce((acc, key, index) => {
        // Redis에서 가져온 목록을 필터링 합니다.
        const filteredMembers = VideoFetchHelper.filterByDateRangeAndCluster(
          results[index][1] as string[],
          cutoffDate,
          currentDate,
          dao.relatedCluster,
        );

        // 필터링된 회원 목록을 객체 형태로 변환하여 결과에 추가합니다.
        acc[key] = RedisResultMapper.toObjects(filteredMembers);
        return acc;
      }, {} as Record<string, VideoCacheReturnType[]>);

      console.log('mappedResults', mappedResults);

      return Ok(mappedResults);
    } catch (e) {
      return Err(e);
    }
  }
}
