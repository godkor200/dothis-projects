import {
  AnalysisHitsServiceInboundPort,
  TAnalysisHitsServiceRes,
} from '@Apps/modules/hits/domain/ports/analysis-hits.service.inbound.port';
import { GetAnalysisHitsDto } from '@Apps/modules/hits/application/dtos/get-analysis-hits.dto';
import { Inject } from '@nestjs/common';
import { Err, Ok } from 'oxide.ts';
import { GET_VIDEO_HISTORY_RANGE_DI_TOKEN } from '@Apps/modules/video-history/video_history.di-token';
import { IRangeVideoHistoryOutboundPort } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { VideoAggregateHelper } from '@Apps/modules/video/application/service/helpers/video.aggregate.helper';
import dayjs from 'dayjs';
import { VideoAggregateUtils } from '@Apps/modules/video/application/service/helpers/video.aggregate.utils';

/**
 * api: 데일리뷰와 기대조회수 병합
 *
 */
export class AnalysisHitsService implements AnalysisHitsServiceInboundPort {
  constructor(
    @Inject(GET_VIDEO_HISTORY_RANGE_DI_TOKEN)
    private readonly videoHistoryRange: IRangeVideoHistoryOutboundPort,
  ) {}
  async execute(dto: GetAnalysisHitsDto): Promise<TAnalysisHitsServiceRes> {
    const { from, to, separation } = dto;
    // from 날짜의 전날을 계산
    const adjustedFrom = dayjs(from).subtract(1, 'day').format('YYYY-MM-DD');

    const adjustedDto = { ...dto, from: adjustedFrom };
    try {
      const histories = await this.videoHistoryRange.execute(adjustedDto);
      if (histories.isOk()) {
        const historiesUnwrap = histories.unwrap();
        if (!separation) {
          const metrics = VideoAggregateHelper.calculateMetrics(
            historiesUnwrap.items,
          );
          return Ok({
            success: true,
            data: [
              {
                clusterNumber: null,
                data: VideoAggregateUtils.generateDailyFakeViewsAndExpectedViews(
                  dto.from,
                  dto.to,
                  metrics,
                ),
              },
            ],
          });
        }
        const clusterMap = historiesUnwrap.items.reduce((map, item) => {
          const cluster = item.video_cluster;
          if (!map[cluster]) {
            map[cluster] = [];
          }
          map[cluster].push(item);
          return map;
        }, {} as Record<number, any[]>);

        // 각 클러스터에 대해 Metrics 계산
        const clusterData = Object.entries(clusterMap).map(
          ([cluster, items]) => {
            const metrics = VideoAggregateHelper.calculateMetrics(items);
            return {
              clusterNumber: parseInt(cluster, 10),
              data: VideoAggregateUtils.generateDailyFakeViewsAndExpectedViews(
                dto.from,
                dto.to,
                metrics,
              ),
            };
          },
        );

        return Ok({ success: true, data: clusterData });
      }
    } catch (err) {
      return Err(err);
    }
  }
}
