import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TRankRes } from '@dothis/dto';
import { Inject } from '@nestjs/common';
import {
  RELWORDS_DI_TOKEN,
  RELATED_WORD_TOKEN_GET_VIDEO_HISTORY_MULTIPLE,
} from '@Apps/modules/related-word/rel-words.enum.di-token.constant';
import { FindRelatedWordOutboundPort } from '@Apps/modules/related-word/domain/ports/find-related-word.outbound.port';
import { Err, Ok, Result } from 'oxide.ts';
import { RelwordsNotFoundError } from '@Apps/modules/related-word/domain/errors/relwords.errors';
import { RankingRelatedWordAggregateService } from '@Apps/modules/related-word/application/service/ranking-related-word.aggregate.service';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { GetRankingRelatedWordsDto } from '@Apps/modules/related-word/application/dtos/get-ranking-related-words.dto';

import { IGetRelatedLastVideoHistory } from '@Apps/modules/video/domain/ports/video.outbound.port';

import { GetRelatedLastVideoAndVideoHistory } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { CacheDoesNotFoundException } from '@Libs/commons/src/exceptions/exceptions';

export type TGetRankingRelatedWordsRes = Result<
  TRankRes,
  RelwordsNotFoundError | VideoNotFoundError | CacheDoesNotFoundException
>;
@QueryHandler(GetRankingRelatedWordsDto)
export class GetRankingRelatedWordsService
  implements
    IQueryHandler<GetRankingRelatedWordsDto, TGetRankingRelatedWordsRes>
{
  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE)
    private readonly relWordsRepository: FindRelatedWordOutboundPort,

    @Inject(RELATED_WORD_TOKEN_GET_VIDEO_HISTORY_MULTIPLE)
    private readonly getRelatedVideoHistory: IGetRelatedLastVideoHistory,

    private readonly rankingRelatedWordAggregateService: RankingRelatedWordAggregateService,
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
      if (!relWordsEntity) return Err(new RelwordsNotFoundError());
      const relatedWords = relWordsEntity.relWords.split(',');
      const relatedCluster = JSON.parse(relWordsEntity.cluster);

      const dao = new GetRelatedLastVideoAndVideoHistory({
        search: query.search,
        relatedWords,
        relatedCluster,
      });

      const data = await this.getRelatedVideoHistory.execute(dao);

      if (data.isOk()) {
        const unwrapData = data.unwrap();
        const res = this.rankingRelatedWordAggregateService.calculateWordStats(
          relatedWords,
          unwrapData,
        );

        return Ok({
          keyword: query.search,
          ranking: res.map((e) => ({
            word: e.word,
            sortFigure: 0,
            expectedViews: e.avg,
          })),
        });
      }
      return Err(new VideoNotFoundError());
    } catch (e) {
      return Err(e);
    }
  }
}
