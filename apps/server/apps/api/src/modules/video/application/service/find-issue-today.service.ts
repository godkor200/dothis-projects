import { FindIssueTodayInboundPort } from '@Apps/modules/video/domain/ports/find-issue-today.inbound.port';
import { TIssueTodayRes } from '@Apps/modules/video/application/queries/v1/find-issue-today.query-handler';
import { Inject, Logger } from '@nestjs/common';
import { WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { WeeklyHitsV2OutboundPort } from '@Apps/modules/hits/domain/ports/weekly-hits.v2.outbound.port';
import { Err } from 'oxide.ts';
import { GetWeeklyKeyword } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { VideoMultiKeywordCacheOutboundPorts } from '@Apps/modules/video/domain/ports/video.multi-keyword.cache.outbound.ports';
import { GetVideoMultiKeywordCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { VIDEO_MULTI_KEYWORD_WORDS_ADAPTER_DI_TOKEN } from '@Apps/modules/video/video.di-token';

export class FindIssueTodayService implements FindIssueTodayInboundPort {
  constructor(
    @Inject(WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN)
    private readonly weeklyKeywordRepository: WeeklyHitsV2OutboundPort,

    @Inject(VIDEO_MULTI_KEYWORD_WORDS_ADAPTER_DI_TOKEN)
    private readonly videoMultiKeywordCache: VideoMultiKeywordCacheOutboundPorts,
  ) {}

  async execute(): Promise<TIssueTodayRes> {
    try {
      // const dao = new GetWeeklyKeyword({ limit: '3' });
      // const topThree = await this.weeklyKeywordRepository.getWeeklyKeywords(
      //   dao,
      // );
      // if (topThree.isOk()) {
      //   const topThreeUnwrap = topThree.unwrap();
      //   const res: GetVideoMultiKeywordCacheDao[] = topThreeUnwrap.map(
      //     (item) => {
      //       const firstTopAssociatedWord = item.topAssociatedWord
      //         .split(',')[0]
      //         .trim();
      //       return new GetVideoMultiKeywordCacheDao({
      //         search: item.recommendedKeyword,
      //         related: firstTopAssociatedWord,
      //       });
      //     },
      //   );
      //   console.log(res);
      // }
      // return topThree.unwrapErr();
    } catch (e) {
      return Err(e);
    }
  }
}

/**
 *  [
 *   { search: '뮤직비디오', related: '뮤직비디오도' },
 *   { search: '브이로그', related: '미국' },
 *   { search: '영화', related: '도그빌' }
 * ]
 */
