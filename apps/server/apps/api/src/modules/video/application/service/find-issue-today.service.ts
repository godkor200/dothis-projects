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
import { TodayIssueMapper } from '@Apps/modules/video/application/mapper/today-issue.mapper';
import { TimeUnit } from '@Apps/modules/video/infrastructure/adapters/cache/video.muti-keyword.cache.adapter';
import { VideoCacheReturnType } from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';

/**
 * fix: 키워드 5개로 고치기
 * 요청한
 */
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
  private filterDuplicateVideos(
    videoData: Record<string, VideoCacheReturnType[]>,
  ): Record<string, VideoCacheReturnType[]> {
    // 중복 확인을 위한 Set
    const uniqueVideoIds = new Set<string>();

    // 중복이 제거된 결과를 저장할 객체
    const filteredResult: Record<string, VideoCacheReturnType[]> = {};

    // 각 키에 대해 반복
    for (const key in videoData) {
      const videos = videoData[key];
      const uniqueVideos: VideoCacheReturnType[] = [];

      // 중복 제거
      for (const video of videos) {
        if (!uniqueVideoIds.has(video.videoId)) {
          uniqueVideoIds.add(video.videoId);
          uniqueVideos.push(video);
        }
      }

      // 중복이 제거된 비디오 배열을 결과 객체에 저장
      filteredResult[key] = uniqueVideos;
    }

    return filteredResult;
  }

  async execute(): Promise<TIssueTodayRes> {
    try {
      const dao = new GetWeeklyKeyword({ limit: '5' });
      const topThree = await this.weeklyKeywordRepository.getWeeklyKeywords(
        dao,
      );

      if (topThree.isOk()) {
        const topThreeUnwrap = topThree.unwrap();
        const videoMultiKeywordCacheRes: GetVideoMultiKeywordCacheDao[] =
          topThreeUnwrap.map((item) => {
            return new GetVideoMultiKeywordCacheDao(item.recommendedKeyword);
          });

        const cache = await this.getVideoTodayIssueCacheAdapter.execute(
          videoMultiKeywordCacheRes,
        );

        if (cache.isOk()) {
          return Ok(cache.unwrap());
        }

        const videoCacheRes = await this.videoMultiKeywordCache.execute(
          videoMultiKeywordCacheRes,
          TimeUnit.WEEK,
          1,
        );

        if (videoCacheRes.isOk()) {
          const videoMultiKeywordCacheResUnwrap = videoCacheRes.unwrap();

          const res = await this.videoHistoryGetTopViewsByIdsAdapter.execute({
            videos: this.filterDuplicateVideos(videoMultiKeywordCacheResUnwrap),
          });

          if (res.isOk()) {
            const videoHistoryGetTopViewsUnwrap = res.unwrap();
            const result = TodayIssueMapper.mergeResults(
              videoMultiKeywordCacheRes,
              videoHistoryGetTopViewsUnwrap,
            );

            await this.setVideoTodayIssueCacheAdapter.execute(result);
            return Ok(result);
          }
          return Err(res.unwrapErr());
        }
        return Err(videoCacheRes.unwrapErr());
      }
      return Err(topThree.unwrapErr());
    } catch (e) {
      return Err(e);
    }
  }
}
