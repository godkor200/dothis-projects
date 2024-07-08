import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindDailyViewsV2Dto } from '@Apps/modules/hits/application/dtos/find-daily-view.v1.dto';
import { TFindDailyView } from '@Apps/modules/hits/application/queries/get-daily-hits.v1.query-handler';
import { DAILY_HITS_V2_SERVICE_IGNITE_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { DailyHitsServiceInboundPort } from '@Apps/modules/hits/domain/ports/daily-hits-service.inbound.port';
import { Inject } from '@nestjs/common';

@QueryHandler(FindDailyViewsV2Dto)
export class GetDailyHitsV2QueryHandler
  implements IQueryHandler<FindDailyViewsV2Dto, TFindDailyView>
{
  constructor(
    @Inject(DAILY_HITS_V2_SERVICE_IGNITE_DI_TOKEN)
    private readonly _service: DailyHitsServiceInboundPort,
  ) {}

  async execute(props: FindDailyViewsV2Dto): Promise<TFindDailyView> {
    return await this._service.execute(props);
  }
}
