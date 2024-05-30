import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TRankRes } from '@dothis/dto';
import { Inject } from '@nestjs/common';
import {
  RELWORDS_DI_TOKEN,
  RELATED_WORD_TOKEN_GET_VIDEO_HISTORY_MULTIPLE,
} from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { Err, Ok, Result } from 'oxide.ts';
import { RankingRelatedWordAggregateService } from '@Apps/modules/related-word/application/service/ranking-related-word.aggregate.service';
import { GetRankingRelatedWordsDto } from '@Apps/modules/related-word/application/dtos/get-ranking-related-words.dto';
import { IGetRelatedLastVideoHistory } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetRelatedLastVideoAndVideoHistory } from '@Apps/modules/video/infrastructure/daos/video.dao';
import {
  CacheDoesNotFoundException,
  TableNotFoundException,
} from '@Libs/commons/src/exceptions/exceptions';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import { RelatedWordsRepositoryPort } from '@Apps/modules/related-word/infrastructure/repositories/db/rel-words.repository.port';
import { RelatedWordsNotFoundError } from '@Apps/modules/related-word/domain/errors/related-words.errors';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel-history/domain/events/channel_history.error';

export type TGetRankingRelatedWordsRes = Result<
  TRankRes,
  | TableNotFoundException
  | CacheDoesNotFoundException
  | VideoHistoryNotFoundError
  | RelatedWordsNotFoundError
  | ChannelHistoryNotFoundError
>;
@QueryHandler(GetRankingRelatedWordsDto)
export class GetRankingRelatedWordsService
  implements
    IQueryHandler<GetRankingRelatedWordsDto, TGetRankingRelatedWordsRes>
{
  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE)
    private readonly relWordsRepository: RelatedWordsRepositoryPort,

    @Inject(RELATED_WORD_TOKEN_GET_VIDEO_HISTORY_MULTIPLE)
    private readonly getRelatedVideoHistory: IGetRelatedLastVideoHistory,
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
      const relWordsEntity = await this.relWordsRepository.findOneByKeyword(
        query.search,
      );
      if (relWordsEntity.isOk()) {
        const resRelWordsEntity = relWordsEntity.unwrap();
        const relatedWords = resRelWordsEntity.relWords
          .split(',')
          .map((item) => item.trim());
        const relatedCluster = resRelWordsEntity.cluster
          .split(',')
          .map((item) => item.trim())
          .slice(0, 5);

        const dao = new GetRelatedLastVideoAndVideoHistory({
          search: query.search,
          relatedWords,
          relatedCluster,
        });

        const data = await this.getRelatedVideoHistory.execute(dao);

        if (data.isOk()) {
          const unwrapData = data.unwrap();

          const res = RankingRelatedWordAggregateService.calculateWordStats(
            relatedWords,
            unwrapData,
          );
          return Ok({
            keyword: query.search,
            ranking: res.map((e) => ({
              word: e.word,
              sortFigure: e.sortFigures,
              expectedViews: e.expectedViews,
            })),
          });
        }
        return Err(data.unwrapErr());
      }
      return Err(relWordsEntity.unwrapErr());
    } catch (e) {
      return Err(e);
    }
  }
}
