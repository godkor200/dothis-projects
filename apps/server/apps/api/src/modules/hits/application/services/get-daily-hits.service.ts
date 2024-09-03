import { DailyHitsServiceInboundPort } from '@Apps/modules/hits/domain/ports/daily-hits-service.inbound.port';
import { FindDailyViewsDto } from '@Apps/modules/hits/application/dtos/find-daily-view.v1.dto';
import { TFindDailyView } from '@Apps/modules/hits/application/queries/get-daily-hits.query-handler';
import { Err, Ok } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { GET_VIDEO_HISTORY_RANGE_DI_TOKEN } from '@Apps/modules/video-history/video_history.di-token';
import { IRangeVideoHistoryOutboundPort } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import dayjs from 'dayjs';
import { VideoAggregateHelper } from '@Apps/modules/video/application/service/helpers/video.aggregate.helper';
import { VIDEO_PUBILSHED_ADAPTER_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoPubilshedOutboundPort } from '@Apps/modules/video/domain/ports/video.pubilshed.outbound.port';
import { VideoAggregateUtils } from '@Apps/modules/video/application/service/helpers/video.aggregate.utils';
export class GetDailyHitsService implements DailyHitsServiceInboundPort {
  constructor(
    @Inject(GET_VIDEO_HISTORY_RANGE_DI_TOKEN)
    private readonly videoHistoryRange: IRangeVideoHistoryOutboundPort,

    @Inject(VIDEO_PUBILSHED_ADAPTER_DI_TOKEN)
    private readonly videoPubilshedAdapter: VideoPubilshedOutboundPort,
  ) {}

  async execute(dto: FindDailyViewsDto): Promise<TFindDailyView> {
    const { from } = dto;

    // from 날짜의 전날을 계산
    const adjustedFrom = dayjs(from).subtract(1, 'day').format('YYYY-MM-DD');

    const adjustedDto = { ...dto, from: adjustedFrom };

    try {
      const histories = await this.videoHistoryRange.execute(adjustedDto);
      const counts = await this.videoPubilshedAdapter.execute({
        search: dto.search,
        related: dto.related,
        from: dto.from,
        to: dto.to,
      });

      if (histories.isOk() && counts.isOk()) {
        const historiesUnwrap = histories.unwrap();
        const countUnwrap = counts.unwrap();

        // countUnwrap가 빈 배열인지 확인
        const data = VideoAggregateHelper.calculateDailyIncreases(
          historiesUnwrap.items,
        );

        const res = VideoAggregateUtils.generateDailyFakeViews(
          dto.from,
          dto.to,
          data.data,
        ).map((e) => {
          if (countUnwrap.length === 0) {
            return {
              ...e,
              publishVideosCount: null, // 모든 값에 대해 null 할당
            };
          }

          const matchingCount = countUnwrap.find(
            (count) => count.key_as_string === e.date,
          );
          return {
            ...e,
            publishVideosCount: matchingCount ? matchingCount.doc_count : null, // 조건이 맞으면 `doc_count`, 아니면 null
          };
        });

        return Ok({
          success: true,
          representativeCategory: data.representativeCategory,
          data: res,
        });
      }
    } catch (e) {
      return Err(e);
    }
  }
}
