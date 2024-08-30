import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TRankRes } from '@dothis/dto';
import { Inject } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { RankingRelatedWordAggregateService } from '@Apps/modules/related-word/application/service/ranking-related-word.aggregate.service';
import { GetRankingRelatedWordsDto } from '@Apps/modules/related-word/application/dtos/get-ranking-related-words.dto';
import {
  CacheDoesNotFoundException,
  ComplexQueryException,
  TableNotFoundException,
} from '@Libs/commons';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import {
  ExternalAiServerError,
  RelatedWordsNotFoundError,
} from '@Apps/modules/related-word/domain/errors/related-words.errors';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel-history/domain/events/channel_history.error';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { KeywordsNotFoundError } from '@Apps/modules/related-word/domain/errors/keywords.errors';
import { VIDEO_CACHE_MULTI_RELATE_WORDS_ADAPTER_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideosMultiRelatedWordsCacheOutboundPorts } from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
import { KeywordServiceHelper } from '@Apps/common/helpers/get-video-data.helper';
import {
  GET_RELATE_WORDS_API_DI_TOKEN,
  LATEST_VIDEO_HISTORY_ADAPTER,
} from '@Apps/modules/related-word/keyword.di-token.constant';
import { GetRelatedWordOutboundPort } from '@Apps/modules/related-word/domain/ports/find-related-word.outbound.port';
import { IRecentVideoHistoryOutboundPort } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';

export type TGetRankingRelatedWordsRes = Result<
  TRankRes,
  ExternalAiServerError
>;

@QueryHandler(GetRankingRelatedWordsDto)
export class GetRankingRelatedWordsService
  implements
    IQueryHandler<GetRankingRelatedWordsDto, TGetRankingRelatedWordsRes>
{
  constructor(
    @Inject(GET_RELATE_WORDS_API_DI_TOKEN)
    private readonly getRelatedWordAdapters: GetRelatedWordOutboundPort,

    @Inject(VIDEO_CACHE_MULTI_RELATE_WORDS_ADAPTER_DI_TOKEN)
    private readonly videoCache: VideosMultiRelatedWordsCacheOutboundPorts,

    @Inject(LATEST_VIDEO_HISTORY_ADAPTER)
    private readonly videoHistoryLatestAdapter: IRecentVideoHistoryOutboundPort,
  ) {}

  /**
   * 1. mysql 에서 탐색어에서 연관어 받아오기
   * 2. 탐색어 + 연관어 조합으로 채널 히스토리 인덱스
   * 3. 탐색어 + 연관어 조합으로 가져온 평균 기대조회수 계산해서 결과 배열에 푸쉬
   * 4. 결과 리턴
   * @param query
   */
  async execute(
    query: GetRankingRelatedWordsDto,
  ): Promise<TGetRankingRelatedWordsRes> {
    try {
      const relatedWords = await KeywordServiceHelper.getRelateWords(
        this.getRelatedWordAdapters,
        query.search,
      );
      if (relatedWords.isOk()) {
        //   const relateWordsUnwrap = relatedWords.unwrap();
        //   console.log(relateWordsUnwrap);
        //
        //   // 각 관련 단어마다 비디오 히스토리를 비동기로 가져오기
        //   const historiesResults = await Promise.all(
        //     relateWordsUnwrap.map(async (relatedWord) => {
        //       const histories = await this.videoHistoryLatestAdapter.execute({
        //         search: query.search,
        //         relatedWord,
        //       });
        //
        //       if (histories.isOk()) {
        //         const unwrapData = histories.unwrap();
        //         const resultForWord =
        //           RankingRelatedWordAggregateService.calculateWordStatsOs(
        //             unwrapData,
        //           );
        //
        //         // 관련 단어를 키로 하고 결과를 값으로 하는 객체 반환
        //         return {
        //           word: relatedWord,
        //           sortFigure: resultForWord.sortFigures,
        //         };
        //       } else {
        //         // 오류 발생 시 빈 객체 반환
        //         return {
        //           word: relatedWord,
        //           sortFigure: 0,
        //         };
        //       }
        //     }),
        //   );

        return Ok({
          keyword: query.search,
          ranking: relatedWords.unwrap().map((e) => ({
            sortFigure: e.score,
            word: e.keyword,
          })),
        });
      }
      return Err(relatedWords.unwrapErr());
    } catch (e) {
      return Err(new ExternalAiServerError(e.message));
    }
  }
}
