import { FindIssueTodayInboundPort } from '@Apps/modules/video/domain/ports/find-issue-today.inbound.port';
import { TIssueTodayRes } from '@Apps/modules/video/application/queries/v1/find-issue-today.query-handler';
import { Inject } from '@nestjs/common';
import { WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { WeeklyHitsV2OutboundPort } from '@Apps/modules/hits/domain/ports/weekly-hits.v2.outbound.port';
import { Err, Ok } from 'oxide.ts';
import { GetWeeklyKeyword } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { TopVideoOutboundPort } from '@Apps/modules/video/domain/ports/top-video.outbound.port';
import {
  TOP_VIDEO_ADAPTER_DI_TOKEN,
  VIDEO_DATA_ADAPTER_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import { TopVideoDao } from '@Apps/modules/video/infrastructure/daos/top-video.dao';
import dayjs from 'dayjs';

/**
 * fix: 키워드 5개로 고치기
 * 요청한
 */
export class FindIssueTodayService implements FindIssueTodayInboundPort {
  constructor(
    @Inject(WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN)
    private readonly weeklyKeywordRepository: WeeklyHitsV2OutboundPort,

    @Inject(TOP_VIDEO_ADAPTER_DI_TOKEN)
    private readonly topVideoAdapter: TopVideoOutboundPort,
  ) {}

  async execute(): Promise<TIssueTodayRes> {
    const current = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    try {
      const dao = new GetWeeklyKeyword({ limit: '5' });
      const topThree = await this.weeklyKeywordRepository.getWeeklyKeywords(
        dao,
      );
      if (topThree.isOk()) {
        const topThreeUnwrap = topThree.unwrap();
        const videoMultiKeywordCacheRes: TopVideoDao[] = topThreeUnwrap.map(
          (item) => {
            return new TopVideoDao(
              item.recommendedKeyword,
              undefined,
              current,
              current,
            );
          },
        );

        const topVideoResults = await Promise.all(
          videoMultiKeywordCacheRes.map((videoDao) =>
            this.topVideoAdapter.execute(videoDao),
          ),
        );

        const validResults = topVideoResults
          .filter((res) => res.isOk())
          .map((res, index) => {
            const videoHistoryGetTopViewsUnwrap = res.unwrap();
            return {
              search: videoMultiKeywordCacheRes[index].search,
              ...videoHistoryGetTopViewsUnwrap.items['0'],
            };
          });

        if (validResults) {
          const result = validResults.map((e) => ({
            search: e.search,
            videoId: e.video_id,
            videoTitle: e.video_title,
            channelName: e.channel_name,
            videoViews: e.video_views,
            videoPublished: e.video_published,
          }));
          return Ok(result);
        }
      }
      return Err(topThree.unwrapErr());
    } catch (e) {
      return Err(e);
    }
  }
}
