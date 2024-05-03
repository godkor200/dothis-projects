import { ExpectedViewsV1Dto } from '@Apps/modules/hits/application/dtos/expected-hits.dtos';
import { ExpectedHitsInboundPort } from '@Apps/modules/hits/domain/ports/expected-hits.inbound.port';
import { TExpectedViewsV1QueryHandlerRes } from '@Apps/modules/hits/application/queries/expected-views.v1.query-handler';
import { Err, Ok } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { HITS_VIDEO_CHANNEL_HISTORY_IGNITE_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { IGetRelatedVideoChannelHistoryOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetRelatedVideoChannelHistoryDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { ChannelHistoryAggregateService } from '@Apps/modules/channel-history/application/service/channel-history.aggregate.service';

export class ExpectedHitsService implements ExpectedHitsInboundPort {
  constructor(
    @Inject(HITS_VIDEO_CHANNEL_HISTORY_IGNITE_DI_TOKEN)
    private readonly getRelatedVideoChannelHistory: IGetRelatedVideoChannelHistoryOutboundPort,

    private readonly channelHistoryAggregateService: ChannelHistoryAggregateService,
  ) {}
  /**
   * 1. video를 다 찾음
   * 2. 선별된 video_id로 video 히스토리를 찾음
   * 3. 채널 히스토리도 찾음
   * 4. 채널, 비디오 히스토리에서 각각 채널아이디, 날짜를 비교해서 맞으면 비디오 히스토리의 조회수/채널의 제일 최근 평균조회수 계산
   * 5. 날짜 별로 계산된 것을 모두 더하고 평균을 내어 리턴
   * @param dto
   */
  async execute(
    dto: ExpectedViewsV1Dto,
  ): Promise<TExpectedViewsV1QueryHandlerRes> {
    /**
     * 비디오의 조회수를 알기 위해 비디오 히스토리를 가져옴
     */
    try {
      const dao = new GetRelatedVideoChannelHistoryDao(dto);
      const joinData = await this.getRelatedVideoChannelHistory.execute(dao);
      if (joinData.isOk()) {
        const data = joinData.unwrap();

        const dailyPerformance =
          this.channelHistoryAggregateService.calculateDailyPerformance(data);

        const result =
          this.channelHistoryAggregateService.calculateKeywordPerformance(
            dailyPerformance,
          );
        return Ok(result);
      }
      return Err(joinData.unwrapErr());
    } catch (e) {
      return Err(e);
    }
  }
}
