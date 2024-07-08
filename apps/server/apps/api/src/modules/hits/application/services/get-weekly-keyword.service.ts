import { GetWeeklyKeywordInboundPort } from '@Apps/modules/hits/domain/ports/get-weekly-keyword.inbound.port';
import { GetWeeklyKeywordDto } from '@Apps/modules/hits/application/dtos/get-weekly-keyword.dto';
import { TGetWeeklyKeywordRes } from '@Apps/modules/hits/application/queries/get-weekly-keyword.query-handler';
import { WeeklyHitsV2OutboundPort } from '@Apps/modules/hits/domain/ports/weekly-hits.v2.outbound.port';
import { GetWeeklyKeyword } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { Inject } from '@nestjs/common';
import { WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { Err, Ok } from 'oxide.ts';

export class GetWeeklyKeywordService implements GetWeeklyKeywordInboundPort {
  constructor(
    @Inject(WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN)
    private readonly weeklyKeywordRepository: WeeklyHitsV2OutboundPort,
  ) {}
  async execute(query: GetWeeklyKeywordDto): Promise<TGetWeeklyKeywordRes> {
    const dao = new GetWeeklyKeyword(query);
    const res = await this.weeklyKeywordRepository.getWeeklyKeywords(dao);
    if (res.isOk()) {
      return Ok({ success: true, data: res.unwrap() });
    }
    return Err(res.unwrapErr());
  }
}
