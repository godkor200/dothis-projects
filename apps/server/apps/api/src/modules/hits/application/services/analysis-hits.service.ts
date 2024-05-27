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
import { VideoAggregateService } from '@Apps/modules/video/application/service/video.aggregate.service';
import { IGetVideoChannelHistoryRes } from '@Apps/modules/video/infrastructure/daos/video.res';

/**
 * api: 데일리뷰와 기대조회수 병합
 * VideoChannelHistoryAdapter 어뎁터만 들어가면될까?
 */
export class AnalysisHitsService implements AnalysisHitsServiceInboundPort {
  constructor(
    @Inject(HITS_VIDEO_CHANNEL_HISTORY_IGNITE_DI_TOKEN)
    private readonly getRelatedVideoChannelHistory: IGetRelatedVideoChannelHistoryOutboundPort,

    private readonly videoAggregateService: VideoAggregateService,
  ) {}
  async execute(dto: GetAnalysisHitsDto): Promise<TAnalysisHitsServiceRes> {
    try {
      const dao = new GetRelatedVideoChannelHistoryDao(dto);

      const data = await this.getRelatedVideoChannelHistory.execute(dao);

      if (data.isOk()) {
        const dataUnwrap = data.unwrap();
        const groupedData =
          this.videoAggregateService.groupDataByDate(dataUnwrap);
        const metrics = this.calculateMetrics(groupedData);

        return Ok({ success: true, data: metrics });
      }
      return Err(data.unwrapErr());
    } catch (err) {
      return Err(err);
    }
  }
  private calculateMetrics(groupedData: {
    [key: string]: IGetVideoChannelHistoryRes[];
  }) {
    return Object.entries(groupedData).map(([date, videos]) => {
      const uniqueVideoCount = videos.length;
      let sumViews = 0;
      let prevVideoViews = 0;
      let increaseViews = 0;
      let totalPerformance = 0;
      let maxPerformance = -Infinity;
      let minPerformance = Infinity;

      for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        const { videoViews, channelAverageViews } = video;
        sumViews += videoViews;
        const averageIncreaseViews = sumViews / (i + 1);

        if (channelAverageViews !== 0 && videoViews !== 0) {
          const performance = videoViews / channelAverageViews;
          totalPerformance += performance;

          if (performance > maxPerformance) {
            maxPerformance = performance;
          }
          if (performance < minPerformance) {
            minPerformance = performance;
          }
        }

        if (i > 0) {
          if (video.videoViews !== 0) {
            increaseViews += video.videoViews - prevVideoViews;
          } else {
            increaseViews += averageIncreaseViews;
          }
        } else {
          increaseViews += videoViews;
        }

        prevVideoViews = videoViews;
      }

      return {
        date,
        uniqueVideoCount,
        increaseViews,
        expectedHits: totalPerformance / uniqueVideoCount,
        maxPerformance,
        minPerformance,
      };
    });
  }
}
