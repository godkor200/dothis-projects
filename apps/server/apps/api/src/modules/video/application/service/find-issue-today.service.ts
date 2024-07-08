import { FindIssueTodayInboundPort } from '@Apps/modules/video/domain/ports/find-issue-today.inbound.port';
import { TIssueTodayRes } from '@Apps/modules/video/application/queries/v1/find-issue-today.query-handler';
import { Inject, Logger } from '@nestjs/common';
import { WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { WeeklyHitsV2OutboundPort } from '@Apps/modules/hits/domain/ports/weekly-hits.v2.outbound.port';
import { Err, Ok } from 'oxide.ts';
import { GetWeeklyKeyword } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { VideoMultiKeywordCacheOutboundPorts } from '@Apps/modules/video/domain/ports/video.multi-keyword.cache.outbound.ports';
import { GetVideoMultiKeywordCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import {
  RedisCacheAdapterTokens,
  VIDEO_MULTI_KEYWORD_WORDS_ADAPTER_DI_TOKEN,
  VIDEO_TOP_VIEWS_ADAPTER_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import { IVideoHistoryGetTopViewsByIdsOutboundPort } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { SetVideoTodayIssueCacheOutboundPort } from '@Apps/modules/related-word/domain/ports/set-video-today-issue.cache.outbound.port';
import { GetVideoTodayIssueCacheOutboundPort } from '@Apps/modules/related-word/domain/ports/get-video-today-issue.cache.outbound.port';

export class FindIssueTodayService implements FindIssueTodayInboundPort {
  constructor(
    @Inject(WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN)
    private readonly weeklyKeywordRepository: WeeklyHitsV2OutboundPort,

    @Inject(VIDEO_MULTI_KEYWORD_WORDS_ADAPTER_DI_TOKEN)
    private readonly videoMultiKeywordCache: VideoMultiKeywordCacheOutboundPorts,

    @Inject(VIDEO_TOP_VIEWS_ADAPTER_DI_TOKEN)
    private readonly videoHistoryGetTopViewsByIdsAdapter: IVideoHistoryGetTopViewsByIdsOutboundPort,

    @Inject(RedisCacheAdapterTokens.REDIS_CLIENT_SET_TODAY_ISSUE_DI_TOKEN)
    private readonly setVideoTodayIssueCacheAdapter: SetVideoTodayIssueCacheOutboundPort,

    @Inject(RedisCacheAdapterTokens.REDIS_CLIENT_GET_TODAY_ISSUE_DI_TOKEN)
    private readonly getVideoTodayIssueCacheAdapter: GetVideoTodayIssueCacheOutboundPort,
  ) {}

  async execute(): Promise<TIssueTodayRes> {
    try {
      const dao = new GetWeeklyKeyword({ limit: '3' });
      const topThree = await this.weeklyKeywordRepository.getWeeklyKeywords(
        dao,
      );

      if (topThree.isOk()) {
        const topThreeUnwrap = topThree.unwrap();
        const videoMultiKeywordCacheRes: GetVideoMultiKeywordCacheDao[] =
          topThreeUnwrap.map((item) => {
            const firstTopAssociatedWord = item.topAssociatedWord
              .split(',')[0]
              .trim();

            return new GetVideoMultiKeywordCacheDao(
              item.recommendedKeyword,
              firstTopAssociatedWord,
            );
          });

        const cache = await this.getVideoTodayIssueCacheAdapter.execute(
          videoMultiKeywordCacheRes,
        );

        if (cache.isOk()) {
          return Ok(cache.unwrap());
        }
        const VideoMultiKeywordCacheRes =
          await this.videoMultiKeywordCache.execute(videoMultiKeywordCacheRes);
        if (VideoMultiKeywordCacheRes.isOk()) {
          const videoMultiKeywordCacheResUnwrap =
            VideoMultiKeywordCacheRes.unwrap();

          const res = await this.videoHistoryGetTopViewsByIdsAdapter.execute({
            videos: videoMultiKeywordCacheResUnwrap,
          });
          if (res.isOk()) {
            await this.setVideoTodayIssueCacheAdapter.execute(
              videoMultiKeywordCacheRes,
              res.unwrap(),
            );
            return res;
          }
        }
      }
      return Err(topThree.unwrapErr());
    } catch (e) {
      return Err(e);
    }
  }
}
