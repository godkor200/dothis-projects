import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TRankRes } from '@dothis/dto';
import { Inject } from '@nestjs/common';
import {
  RELATED_WORD_GET_VIDEO_HISTORY,
  RELWORDS_DI_TOKEN,
} from '@Apps/modules/related-word/rel-words.enum.di-token.constant';
import { FindRelAdapter } from '@Apps/modules/related-word/interface/find-rel.adapter';

import { Err, Ok, Result } from 'oxide.ts';
import { RelwordsNotFoundError } from '@Apps/modules/related-word/domain/errors/relwords.errors';

import { IRankingRelWords } from '@Apps/modules/related-word/interface/rank-rel.interface';
import { RankRelAggregateService } from '@Apps/modules/related-word/service/rank-rel.aggregate.service';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { ScrollApiError } from '@Apps/common/aws/domain/aws.os.error';
import { GetRankingRelatedWordsDto } from '@Apps/modules/related-word/application/dtos/get-ranking-related-words.dto';

import { VIDEO_IGNITE_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import {
  IGetRelatedLastVideoHistory,
  VideoOutboundPort,
} from '@Apps/modules/video/domain/ports/video.outbound.port';

import { GetRelatedLastVideoAndVideoHistory } from '@Apps/modules/video/infrastructure/daos/video.dao';

export type TGetRankingRelatedWordsRes = Result<
  TRankRes,
  RelwordsNotFoundError | VideoNotFoundError | ScrollApiError
>;
@QueryHandler(GetRankingRelatedWordsDto)
export class GetRankingRelatedWordsService
  implements
    IQueryHandler<GetRankingRelatedWordsDto, TGetRankingRelatedWordsRes>
{
  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE)
    private readonly relWordsRepository: FindRelAdapter,

    @Inject(VIDEO_IGNITE_DI_TOKEN)
    private readonly video: VideoOutboundPort,

    @Inject(RELATED_WORD_GET_VIDEO_HISTORY)
    private readonly getRelatedVideoHistory: IGetRelatedLastVideoHistory,

    private readonly rankRelAggregateService: RankRelAggregateService,
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
    console.log('!!!!', query);
    const relWordsEntity = await this.relWordsRepository.findOneByKeyword(
      (query.search = '서울'),
    );
    console.log('!!!!relWordsEntity', relWordsEntity);

    if (!relWordsEntity) return Err(new RelwordsNotFoundError());
    const relatedWords = relWordsEntity.relWords.split(',');
    const relatedCluster = JSON.parse(relWordsEntity.cluster);
    const channelVideoData: IRankingRelWords[] = (
      await Promise.all(
        relatedWords.map(async (relatedWord) => {
          const dao = new GetRelatedLastVideoAndVideoHistory({
            search: '서울',
            relatedWord,
            relatedCluster,
          });
          const data =
            await this.getRelatedVideoHistory.getRelatedLastVideoAndVideoHistory(
              dao,
            );

          return {
            data,
            relatedWord,
          };
        }),
      )
    ).filter((item) => item !== null);

    if (!channelVideoData.length) return Err(new VideoNotFoundError());
    /**
     * 연관어별 기대조회수와 정렬 수치를 계산하는 집계 함수
     */
    const res =
      this.rankRelAggregateService.calculationExpectationNumberRelatedWord(
        channelVideoData,
      );

    return Ok({
      keyword: query.search,
      ranking: res,
    });
  }
}
