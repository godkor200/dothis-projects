import { WeeklyHitsV2InboundPort } from '@Apps/modules/hits/domain/ports/weekly-hits.v2.inbound.port';
import { GetWeeklyViewsDto } from '@Apps/modules/hits/application/dtos/get-weekly-views-list.dto';
import { TGetWeeklyHitsRes } from '@Apps/modules/hits/application/queries/get-weekly-hits.v2.query-handler';
import { Inject } from '@nestjs/common';
import { WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { WeeklyHitsV2OutboundPort } from '@Apps/modules/hits/domain/ports/weekly-hits.v2.outbound.port';
import { GetWeeklyViewsDaoV2 } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { Err, Ok } from 'oxide.ts';

export class WeeklyHitsV2Service implements WeeklyHitsV2InboundPort {
  constructor(
    @Inject(WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN)
    private readonly weeklyHitsRepository: WeeklyHitsV2OutboundPort,
  ) {}
  async execute(dto: GetWeeklyViewsDto): Promise<TGetWeeklyHitsRes> {
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
