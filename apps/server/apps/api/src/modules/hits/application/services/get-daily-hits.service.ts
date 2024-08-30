import { DailyHitsServiceInboundPort } from '@Apps/modules/hits/domain/ports/daily-hits-service.inbound.port';
import { FindDailyViewsDto } from '@Apps/modules/hits/application/dtos/find-daily-view.v1.dto';
import { TFindDailyView } from '@Apps/modules/hits/application/queries/get-daily-hits.query-handler';
import { Err, Ok } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { GET_VIDEO_HISTORY_RANGE_DI_TOKEN } from '@Apps/modules/video-history/video_history.di-token';
import { IRangeVideoHistoryOutboundPort } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import dayjs from 'dayjs';
import { VideoAggregateHelper } from '@Apps/modules/video/application/service/helpers/video.aggregate.helper';
export class GetDailyHitsService implements DailyHitsServiceInboundPort {
  constructor(
    @Inject(GET_VIDEO_HISTORY_RANGE_DI_TOKEN)
    private readonly videoHistoryRange: IRangeVideoHistoryOutboundPort,
  ) {}

  async execute(dto: FindDailyViewsDto): Promise<TFindDailyView> {
    const { from } = dto;

    // from 날짜의 전날을 계산
    const adjustedFrom = dayjs(from).subtract(1, 'day').format('YYYY-MM-DD');

    const adjustedDto = { ...dto, from: adjustedFrom };

    try {
      const histories = await this.videoHistoryRange.execute(adjustedDto);

      if (histories.isOk()) {
        const historiesUnwrap = histories.unwrap();
        const data = VideoAggregateHelper.calculateDailyIncreases(
          historiesUnwrap.items,
        );
        return Ok({
          success: true,
          ...data,
        });
      }
    } catch (e) {
      return Err(e);
    }
  }
}
