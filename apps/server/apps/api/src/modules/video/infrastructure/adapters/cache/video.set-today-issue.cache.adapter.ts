import { Injectable } from '@nestjs/common';
import { SetVideoTodayIssueCacheOutboundPort } from '@Apps/modules/related-word/domain/ports/set-video-today-issue.cache.outbound.port';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { ITodayIssue } from '@Apps/modules/video/application/dtos/video.res';

@Injectable()
export class SetVideoTodayIssueCacheAdapter
  implements SetVideoTodayIssueCacheOutboundPort
{
  constructor(
    @InjectRedis('ranking')
    private readonly redisClient: Redis,
  ) {}
  async execute(data: ITodayIssue[]): Promise<void> {
    const dataFilter = data.filter((e) => {
      // 속성들이 모두 null이 아닌지 체크하여 필터링
      const hasValidAttributes =
        e.videoId !== null &&
        e.videoTitle !== null &&
        e.videoViews !== null &&
        e.videoPublished !== null;

      if (hasValidAttributes) {
        return true;
      }
      return false;
    });
    const key = dataFilter.map((e) => `${e.search}:${e.related}`).join('/');

    for (const [i, v] of dataFilter.entries()) {
      const {
        search,
        related,
        videoId,
        videoViews,
        videoPublished,
        videoTitle,
        channelName,
      } = v;

      await this.redisClient.zadd(
        key,
        i,
        `${
          search + `:` + related
        }:${videoId}:${videoViews}:${videoPublished}:${channelName}:${videoTitle}`,
      );
    }
    const aDay = 24 * 60 * 60;
    await this.redisClient.expire(key, aDay);
  }
}
