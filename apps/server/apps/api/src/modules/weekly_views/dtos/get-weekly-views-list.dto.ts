import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zGetWeeklyViewsQuery } from '@dothis/dto';
import { IPickDateFromLimitLast } from '@Apps/modules/daily_views/dtos/find-daily-views.dtos';

export class GetWeeklyViewsQuery extends createZodDto(
  extendApi(zGetWeeklyViewsQuery),
) {}
export class GetWeeklyViewsDto implements IPickDateFromLimitLast {
  readonly from: string;
  readonly limit: number;
  readonly last?: string;
  constructor(props: GetWeeklyViewsDto) {
    Object.assign(this, props);
  }
}
