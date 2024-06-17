import { WeeklyHitsSomeInboundPort } from '@Apps/modules/hits/domain/ports/weekly-hits.inbound.port';
import { Inject } from '@nestjs/common';
import { WEEKLY_VIEWS_REPOSITORY_V1_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { WeeklyHitsV1OutboundPort } from '@Apps/modules/hits/domain/ports/weekly-hits.v1.outbound.port';
import { GetSomeWeeklyViewsDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { GetSomeWeeklyHitsDto } from '@Apps/modules/hits/application/dtos/get-some-weekly-hits.dto';
import { TGetSomeWeeklyHitsRes } from '@Apps/modules/hits/application/queries/get-some-weekly-hits.v1.query-handler';
import { Err, Ok } from 'oxide.ts';

export class SomeWeeklyHitsService implements WeeklyHitsSomeInboundPort {
  constructor(
    @Inject(WEEKLY_VIEWS_REPOSITORY_V1_DI_TOKEN)
    private readonly weeklyHitsRepository: WeeklyHitsV1OutboundPort,
  ) {}
  async execute(dto: GetSomeWeeklyHitsDto): Promise<TGetSomeWeeklyHitsRes> {
    try {
      const dao = new GetSomeWeeklyViewsDao({
        keywords: dto.keywords,
        category: dto.category,
        limit: dto.limit,
        page: dto.page,
        from: dto.from,
        order: dto.order,
        sort: dto.sort,
      });

      const result = await this.weeklyHitsRepository.filterWeeklyKeywordHits(
        dao,
      );
      if (result.isOk()) {
        return Ok({ success: true, data: result.unwrap() });
      }
      return Err(result.unwrapErr());
    } catch (e) {
      return Err(e);
    }
  }
}
