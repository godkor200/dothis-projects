import { WeeklyHitsInboundPort } from '@Apps/modules/hits/domain/ports/weekly-hits.inbound.port';
import { GetWeeklyViewsDto } from '@Apps/modules/hits/application/dtos/get-weekly-views-list.dto';
import { GetWeeklyViewsDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { TGetWeeklyHitsRes } from '@Apps/modules/hits/application/queries/get-weekly-hits.v1.query-handler';
import { Inject } from '@nestjs/common';
import { WeeklyHitsOutboundPort } from '@Apps/modules/hits/domain/ports/weekly-views.outbound.port';
import { WEEKLY_VIEWS_REPOSITORY_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { Err, Ok } from 'oxide.ts';

export class WeeklyHitsService implements WeeklyHitsInboundPort {
  constructor(
    @Inject(WEEKLY_VIEWS_REPOSITORY_DI_TOKEN)
    private readonly weeklyHitsRepository: WeeklyHitsOutboundPort,
  ) {}

  private getNearestMonday(date: Date): string {
    const day = date.getDay();
    const diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is Sunday
    const nearestMonday = new Date(date.setDate(diff));
    return nearestMonday.toISOString().slice(0, 10); // convert to 'yyyy-mm-dd'
  }

  async getPagination(dto: GetWeeklyViewsDto): Promise<TGetWeeklyHitsRes> {
    const dao = new GetWeeklyViewsDao({
      ...dto,
      from: this.getNearestMonday(new Date(dto.from)),
    });

    const list =
      await this.weeklyHitsRepository.getPaginatedWeeklyHitsByKeyword(dao);
    const total = await this.weeklyHitsRepository.getWeeklyHitsCount(dao);
    if (list.isOk() && total.isOk()) {
      return Ok({
        success: true,
        data: { total: total.unwrap(), data: list.unwrap() },
      });
    }
    return Err(list.unwrapErr());
  }
}
