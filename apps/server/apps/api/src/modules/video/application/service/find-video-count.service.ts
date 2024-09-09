import { findVideoCountByDateServiceInboundPort } from '@Apps/modules/video/domain/ports/find-video-count.inbound.port';
import { FindVideoCountDto } from '@Apps/modules/video/application/dtos/find-video-count.dto';
import { TFindVideoCount } from '@Apps/modules/video/application/queries/v1/find-video-count.query-handler';
import { Err, Ok } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { VIDEO_PUBILSHED_ADAPTER_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoPubilshedOutboundPort } from '@Apps/modules/video/domain/ports/video.pubilshed.outbound.port';
import dayjs from 'dayjs';

export class FindVideoCountService
  implements findVideoCountByDateServiceInboundPort
{
  constructor(
    @Inject(VIDEO_PUBILSHED_ADAPTER_DI_TOKEN)
    private readonly videoPubilshedAdapter: VideoPubilshedOutboundPort,
  ) {}

  async execute(dto: FindVideoCountDto): Promise<TFindVideoCount> {
    const fromDate = dayjs(dto.from);
    const toDate = dayjs(dto.to);

    // 날짜 범위 내의 모든 날짜 생성
    const dateRange: string[] = [];
    let currentDate = fromDate;

    while (currentDate.isBefore(toDate) || currentDate.isSame(toDate)) {
      dateRange.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'day');
    }

    try {
      const counts = await this.videoPubilshedAdapter.execute({
        search: dto.search,
        related: dto.related,
        from: dto.from,
        to: dto.to,
      });

      if (counts.isOk()) {
        const countUnwrap = counts.unwrap();

        const result = dateRange.map((date) => {
          const match = countUnwrap.find((e) => e.key_as_string === date);
          return {
            date: date,
            number: match ? match.doc_count : null, // 데이터 없는 날짜에 null 할당
          };
        });

        return Ok(result);
      }
    } catch (e) {
      console.error('Error executing FindVideoCountService:', e);
      return Err(e);
    }
  }
}
