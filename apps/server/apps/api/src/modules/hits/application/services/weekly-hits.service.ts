import { WeeklyHitsV2InboundPort } from '@Apps/modules/hits/domain/ports/weekly-hits.inbound.port';
import { TGetWeeklyHitsRes } from '@Apps/modules/hits/application/queries/get-weekly-hits.query-handler';
import { Inject } from '@nestjs/common';
import { WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { WeeklyHitsV2OutboundPort } from '@Apps/modules/hits/domain/ports/weekly-hits.v2.outbound.port';
import { GetWeeklyViewsDaoV2 } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { Err, Ok } from 'oxide.ts';
import { GetWeeklyHitsListDto } from '@Apps/modules/hits/application/dtos/get-some-weekly-hits.dto';

export class WeeklyHitsService implements WeeklyHitsV2InboundPort {
  constructor(
    @Inject(WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN)
    private readonly weeklyHitsRepository: WeeklyHitsV2OutboundPort,
  ) {}

  private getNearestMonday(date: Date): string {
    const day = date.getDay();
    const diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is Sunday
    const nearestMonday = new Date(date.setDate(diff));
    return nearestMonday.toISOString().slice(0, 10); // convert to 'yyyy-mm-dd'
  }

  async execute(dto: GetWeeklyHitsListDto): Promise<TGetWeeklyHitsRes> {
    const dao = new GetWeeklyViewsDaoV2({
      ...dto,
      from: dto.from,
    });
    try {
      const result =
        await this.weeklyHitsRepository.getPaginatedWeeklyHitsByKeywordAndCount(
          dao,
        );
      if (result.isOk()) {
        const unwrap = result.unwrap();

        return Ok({
          success: true,
          body: {
            ...unwrap,
          },
        });
      }
      return Err(result.unwrapErr());
    } catch (e) {
      return Err(e);
    }
  }
}
