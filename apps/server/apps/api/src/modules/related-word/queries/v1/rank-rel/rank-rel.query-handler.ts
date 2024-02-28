import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TRankRes } from '@dothis/dto';
import { Inject } from '@nestjs/common';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/related-word/constants/rel-words.enum.di-token.constant';
import { FindRelAdapter } from '@Apps/modules/related-word/interface/find-rel.adapter';
import { RankRelQueryDto } from '@Apps/modules/related-word/queries/v1/rank-rel/rank-rel.http.controller';
import { Err, Ok, Result } from 'oxide.ts';
import { RelwordsNotFoundError } from '@Apps/modules/related-word/domain/relwords.errors';
import { CHANNEL_DATA_KEY } from '@Apps/modules/channel_history/application/dtos/expected-views.dtos';
import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/channel-history.di-token.constants';
import {
  IChannelHistoryWithoutChannelSubscribers,
  IRankingRelWords,
} from '@Apps/modules/related-word/interface/rank-rel.interface';
import { RankRelAggregateService } from '@Apps/modules/related-word/service/rank-rel.aggregate.service';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { ScrollApiError } from '@Apps/common/aws/domain/aws.os.error';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/infrastructure/repositories/database/channel-history.outbound.port';

@QueryHandler(RankRelQueryDto)
export class RankRelQueryHandler
  implements
    IQueryHandler<
      RankRelQueryDto,
      Result<
        TRankRes,
        RelwordsNotFoundError | VideoNotFoundError | ScrollApiError
      >
    >
{
  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE)
    private readonly relWordsRepository: FindRelAdapter,

    @Inject(CHANNEL_HISTORY_OS_DI_TOKEN)
    private readonly channelHistory: ChannelHistoryOutboundPort,

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
    query: RankRelQueryDto,
  ): Promise<
    Result<
      TRankRes,
      RelwordsNotFoundError | VideoNotFoundError | ScrollApiError
    >
  > {
    const relWordsEntity = await this.relWordsRepository.findOneByKeyword(
      query.keyword,
    );
    if (!relWordsEntity) return Err(new RelwordsNotFoundError());
    const relWordsArr = relWordsEntity.relWords.split(',');

    const channelVideoData: IRankingRelWords[] = (
      await Promise.all(
        relWordsArr.map(async (relWord) => {
          const data =
            await this.channelHistory.scanLatestChannelHistoryByKeywordAndRelWord<IChannelHistoryWithoutChannelSubscribers>(
              {
                keyword: query.keyword,
                relationKeyword: relWord,
                data: [CHANNEL_DATA_KEY.CHANNEL_AVERAGE_VIEWS],
              },
            );
          if (data instanceof ScrollApiError) {
            return null;
          }
          if (!data.length) {
            return null;
          }

          return {
            data,
            relWord,
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
      keyword: query.keyword,
      ranking: res,
    });
  }
}
