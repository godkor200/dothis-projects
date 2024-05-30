import { Inject } from '@nestjs/common';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { Err, Ok } from 'oxide.ts';
import { RankingRelatedWordAggregateService } from '@Apps/modules/related-word/application/service/ranking-related-word.aggregate.service';
import { GetRankingRelatedWordsV2Dto } from '@Apps/modules/related-word/application/dtos/get-ranking-related-words.dto';
import { GetVideosMultiRelatedWordsCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { RelatedWordsRepositoryPort } from '@Apps/modules/related-word/infrastructure/repositories/db/rel-words.repository.port';
import {
  VIDEO_CACHE_MULTI_RELATE_WORDS_ADAPTER_DI_TOKEN,
  VIDEO_HISTORY_GET_LAST_ADAPTER_IGNITE_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import { VideosMultiRelatedWordsCacheOutboundPorts } from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
import { TGetRankingRelatedWordsRes } from '@Apps/modules/related-word/application/service/get-ranking-related-words.service';

import {
  IGetVideoHistoryGetMultipleByIdV2OutboundPort,
  IGetVideoHistoryLastOneByIdsOutboundPort,
} from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN } from '@Apps/modules/channel-history/channel-history.di-token.constants';
import { ChannelHistoryByChannelIdOutboundPort } from '@Apps/modules/channel-history/domain/ports/channel-history.outbound.port';
import {
  GetChannelHistoryByChannelIdV2Dao,
  GetVideoHistoryMultipleByIdAndRelatedWordsDao,
} from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { VideoHelper } from '@Apps/modules/video/application/service/helpers/video.helper';

export class GetRankingRelatedWordsV2Service {
  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE)
    private readonly relWordsRepository: RelatedWordsRepositoryPort,

    @Inject(VIDEO_CACHE_MULTI_RELATE_WORDS_ADAPTER_DI_TOKEN)
    private readonly videoCache: VideosMultiRelatedWordsCacheOutboundPorts,

    @Inject(VIDEO_HISTORY_GET_LAST_ADAPTER_IGNITE_DI_TOKEN)
    private readonly videoHistoryAdapter: IGetVideoHistoryLastOneByIdsOutboundPort,

    @Inject(CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN)
    private readonly getChannelHistoryByChannelId: ChannelHistoryByChannelIdOutboundPort,
  ) {}

  /**
   * 1. mysql 에서 탐색어에서 연관어 받아오기
   * 2. 탐색어 + 연관어 조합으로 채널 히스토리 인덱스
   * 3. 탐색어 + 연관어 조합으로 가져온 평균 기대조회수 계산해서 결과 배열에 푸쉬
   * 4. 결과 리턴
   * @param query
   */
  async execute(
    query: GetRankingRelatedWordsV2Dto,
  ): Promise<TGetRankingRelatedWordsRes> {
    try {
      const relWordsEntity = await this.relWordsRepository.findOneByKeyword(
        query.search,
      );
      if (relWordsEntity.isOk()) {
        const resRelWordsEntity = relWordsEntity.unwrap();
        const relatedWords = resRelWordsEntity.relWords
          .split(',')
          .map((item) => item.trim());

        const dao = new GetVideosMultiRelatedWordsCacheDao({
          words: relatedWords,
        });

        console.time('비디오 캐시 조회 시간');
        const videoCache = await this.videoCache.execute(dao);
        console.timeEnd('비디오 캐시 조회 시간');
        if (videoCache.isOk()) {
          const unwrapData = videoCache.unwrap();
          console.log(unwrapData);
          console.time('비디오 dao 시간 converter');
          const videoHistoryDao =
            new GetVideoHistoryMultipleByIdAndRelatedWordsDao({
              videoIds: unwrapData,
            });
          console.timeEnd('비디오 dao 시간 converter');
          console.time('채널 히스토리 조회 시간');
          const channelHistoryDao = new GetChannelHistoryByChannelIdV2Dao({
            channelIds: Object.values(unwrapData).flat(),
          });
          const channelHistoryPromise =
            this.getChannelHistoryByChannelId.execute(channelHistoryDao);
          console.timeEnd('채널 히스토리 조회 시간');
          console.time('비디오 히스토리 조회 시간');
          const videoHistoryPromise =
            this.videoHistoryAdapter.execute(videoHistoryDao);
          const [videoHistoryResult, channelHistoryResult] = await Promise.all([
            videoHistoryPromise,
            channelHistoryPromise,
          ]);

          console.timeEnd('비디오 히스토리 조회 시간');
          if (videoHistoryResult.isOk() && channelHistoryResult.isOk()) {
            const res = VideoHelper.mergeVideoByRelateWords(
              unwrapData,
              channelHistoryResult.unwrap(),
              videoHistoryResult.unwrap(),
            );
            const cul =
              RankingRelatedWordAggregateService.analyzeRelatedWordStatistics(
                res,
              );

            return Ok({
              keyword: query.search,
              ranking: cul.map((e) => ({
                word: e.word,
                sortFigure: e.sortFigures,
                expectedViews: e.expectedViews,
              })),
            });
          }
          if (videoHistoryResult.isErr()) {
            return Err(videoHistoryResult.unwrapErr());
          }
          if (channelHistoryResult.isErr()) {
            return Err(channelHistoryResult.unwrapErr());
          }
        }
        return Err(videoCache.unwrapErr());
      }
      return Err(relWordsEntity.unwrapErr());
    } catch (e) {
      return Err(e);
    }
  }
}
