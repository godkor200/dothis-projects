import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetWeeklyKeywordDto } from '@Apps/modules/hits/application/dtos/get-weekly-keyword.dto';
import { Result } from 'oxide.ts';
import { IRes } from '@Libs/types';
import { TKeywordThisWeeklyRes } from '@dothis/dto';
import { Inject } from '@nestjs/common';
import { GET_WEEKLY_KEYWORD_SERVICE_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { GetWeeklyKeywordInboundPort } from '@Apps/modules/hits/domain/ports/get-weekly-keyword.inbound.port';
import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';
export type TGetWeeklyKeywordRes = Result<
  IRes<TKeywordThisWeeklyRes>,
  WeeklyViewsError
>;
@QueryHandler(GetWeeklyKeywordDto)
export class GetWeeklyKeywordQueryHandler
  implements IQueryHandler<GetWeeklyKeywordDto, TGetWeeklyKeywordRes>
{
  constructor(
    @Inject(GET_WEEKLY_KEYWORD_SERVICE_DI_TOKEN)
    private readonly weeklyKeywordService: GetWeeklyKeywordInboundPort,
  ) {}
  async execute(query: GetWeeklyKeywordDto): Promise<TGetWeeklyKeywordRes> {
    return await this.weeklyKeywordService.execute(query);
  }
}
