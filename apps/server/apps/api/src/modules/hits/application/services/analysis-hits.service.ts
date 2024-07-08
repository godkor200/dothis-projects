import {
  AnalysisHitsServiceInboundPort,
  TAnalysisHitsServiceRes,
} from '@Apps/modules/hits/domain/ports/analysis-hits.service.inbound.port';
import { GetAnalysisHitsDto } from '@Apps/modules/hits/application/dtos/get-analysis-hits.dto';
import { IGetRelatedVideoChannelHistoryOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { Inject } from '@nestjs/common';
import { HITS_VIDEO_CHANNEL_HISTORY_IGNITE_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { Err, Ok } from 'oxide.ts';
import { GetRelatedVideoChannelHistoryDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { VideoAggregateHelper } from '@Apps/modules/video/application/service/helpers/video.aggregate.helper';

/**
 * api: 데일리뷰와 기대조회수 병합
 */
export class AnalysisHitsService implements AnalysisHitsServiceInboundPort {
  constructor(
    @Inject(HITS_VIDEO_CHANNEL_HISTORY_IGNITE_DI_TOKEN)
    private readonly getRelatedVideoChannelHistory: IGetRelatedVideoChannelHistoryOutboundPort,
  ) {}
  async execute(dto: GetAnalysisHitsDto): Promise<TAnalysisHitsServiceRes> {
    try {
      const dao = new GetRelatedVideoChannelHistoryDao(dto);

      const data = await this.getRelatedVideoChannelHistory.execute(dao);

      if (data.isOk()) {
        const dataUnwrap = data.unwrap();
        const metrics = VideoAggregateHelper.calculateMetrics(dataUnwrap);
        return Ok({ success: true, data: metrics });
      }
      return Err(data.unwrapErr());
    } catch (err) {
      return Err(err);
    }
  }
}
