import { FindPerformanceLengthInboundPort } from '@Apps/modules/video/domain/ports/find-performance-length.inbound.port';
import { FindPerformanceLengthDto } from '@Apps/modules/video/application/dtos/find-performance-length.dto';
import { TFindPerformanceLengthResult } from '@Apps/modules/video/application/queries/v1/find-performance-length.query-handler';
import { Err, Ok } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { VIDEO_VIEWS_BY_DATE_KEYWORD_IGNITE_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';

import { IGetVideoViewsMatchingSearchOnSpecificDateOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetVideoViewsMatchingSearchOnSpecificDateDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { GetVideoViewsPerformanceMatchingSearchOnSpecificDate } from '@Apps/modules/video/application/dtos/video.res';

/**
 * - 기획 내용
 * - 통계 분포3 - 영상 길이별 조회수/성과 분포
 *     - Line graph 사용
 *     - 길이 분석 구간
 *         - start : 120초
 *         - interval : 60초
 *         - end : 1080초
 *     - x축에 숫자는 5번만 표시
 *         - 120,360,600,840,1080
 *     - 실제 분석 구간은 18개
 *         - mouse hover tooltip은 구간마다 표시
 *     - 계산 방법 : 60초 단위로 +-30초씩의 포함된 영상의 조회수 합계
 *         - 예시)
 *         - 120초 → 영상 길이 90~150초에 해당하는 영상들의 조회수 평균
 *         - 180초 → 영상 길이 150~210초에 해당하는 영상들의 조회수 평균
 *         - 420초 → 영상 길이 390~450초에 해당하는 영상들의 조회수 평균
 *
 *     ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/63679602-3fcd-4348-97f8-66259c0213d5/84ff84f8-4d2d-4d86-88d6-2352786adbd1/Untitled.png)
 *
 *     빨강선 - 조회수 평균
 *
 *     파랑선 - 성과 평균
 */
export class FindPerformanceLengthService
  implements FindPerformanceLengthInboundPort
{
  constructor(
    @Inject(VIDEO_VIEWS_BY_DATE_KEYWORD_IGNITE_DI_TOKEN)
    private readonly videoHistoryListAdapter: IGetVideoViewsMatchingSearchOnSpecificDateOutboundPort,
  ) {}
  async execute(
    dto: FindPerformanceLengthDto,
  ): Promise<TFindPerformanceLengthResult> {
    try {
      const dao = new GetVideoViewsMatchingSearchOnSpecificDateDao({
        from: dto.from,
        to: dto.to,
        related: dto.related,
        search: dto.search,
        relatedCluster: dto.clusterNumber,
        columns: [
          'VH.VIDEO_ID',
          'VH.VIDEO_VIEWS',
          'VH.VIDEO_PERFORMANCE',
          'VD.VIDEO_DURATION',
        ],
      });
      const data =
        await this.videoHistoryListAdapter.execute<GetVideoViewsPerformanceMatchingSearchOnSpecificDate>(
          dao,
        );

      if (data.isOk()) {
        const dataUnwrap = data.unwrap();
        // 길이 구간별로 데이터를 분류하고 계산
        const start = 120; // 시작 길이 (초)
        const interval = 60; // 간격 (초)
        const end = 1080; // 종료 길이 (초)
        const segments = this.generateSegments(start, interval, end);

        // 각 구간별 조회수 및 성과 계산
        const results = segments.map((segment) => {
          const filteredVideos = dataUnwrap.filter((video) => {
            const videoDuration = video.videoDuration; // 영상 길이
            return (
              videoDuration >= segment.start && videoDuration <= segment.end
            );
          });

          // viewCounts와 performanceScores를 단일 순회로 계산
          const viewCounts: number[] = [];
          const performanceScores: number[] = [];

          filteredVideos.forEach((video) => {
            // videoViews와 videoPerformance 값이 null인 경우 0으로 처리
            const views =
              video.videoViews != null ? Number(video.videoViews) : 0;
            const performance =
              video.videoPerformance != null
                ? Number(video.videoPerformance)
                : 0;

            viewCounts.push(views);
            performanceScores.push(performance);
          });

          const averageViews =
            viewCounts.length > 0 ? this.calculateAverage(viewCounts) : 0;
          const averagePerformance =
            performanceScores.length > 0
              ? this.calculateAverage(performanceScores)
              : 0;

          return {
            segment: `${segment.start}-${segment.end}`,
            midpoint: segment.midpoint,
            averageViews,
            averagePerformance,
          };
        });

        return Ok({
          success: true,
          data: { segments: results, totalVideos: dataUnwrap.length },
        });
      }
      return Err(data.unwrapErr());
    } catch (e) {
      return Err(e);
    }
  }

  private generateSegments(
    start: number,
    interval: number,
    end: number,
  ): { start: number; end: number; midpoint: number }[] {
    const segments = [];
    for (let current = start; current <= end; current += interval) {
      // 각 구간의 중간점을 계산하여 기준점으로 사용
      const midpoint = current;
      segments.push({ start: current - 30, end: current + 30, midpoint });
    }
    return segments;
  }
  private calculateAverage(values: number[]): number {
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    return sum / values.length;
  }
}
