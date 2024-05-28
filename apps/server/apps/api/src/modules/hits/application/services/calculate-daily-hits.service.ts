import {
  IGetRelatedVideoAndVideoHistoryOutBoundPort,
  IGetRelatedVideosCountByDayOutBoundPort,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { ICalculateDailyHitsMetricsServiceInboundPort } from '@Apps/modules/hits/domain/ports/daily-hits-service.inbound.port';
import { FindDailyViewsV1Dto } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { SearchRelationVideoAndHistoryDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { Inject } from '@nestjs/common';
import {
  VIDEO_COUNT_DAY_IGNITE_DI_TOKEN,
  VIDEO_HISTORY_LIST_IGNITE_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import { Err, Ok } from 'oxide.ts';
import { VideoAggregateService } from '@Apps/modules/video/application/service/helpers/video.aggregate.service';
import { TFindDailyView } from '@Apps/modules/hits/application/queries/get-daily-hits.v1.query-handler';

export class CalculateDailyHitsMetricsService
  implements ICalculateDailyHitsMetricsServiceInboundPort
{
  constructor(
    @Inject(VIDEO_COUNT_DAY_IGNITE_DI_TOKEN)
    private readonly getRelatedVideosCountByDay: IGetRelatedVideosCountByDayOutBoundPort,

    @Inject(VIDEO_HISTORY_LIST_IGNITE_DI_TOKEN)
    private readonly getRelatedVideoAndVideoHistory: IGetRelatedVideoAndVideoHistoryOutBoundPort,
  ) {}

  async execute(props: FindDailyViewsV1Dto): Promise<TFindDailyView> {
    const dao = new SearchRelationVideoAndHistoryDao(props);

    try {
      /**
       * 관련된 비디오 가져와서 리스트업
       */
      const [res, counts] = await Promise.all([
        await this.getRelatedVideoAndVideoHistory.execute(dao),
        await this.getRelatedVideosCountByDay.execute(dao),
      ]);

      if (res.isOk() && counts.isOk()) {
        const hitsData = VideoAggregateService.calculateIncreaseByIgnite(
          res.unwrap(),
        );

        const data = hitsData.map((viewData) => {
          /**
           * 날짜 매칭 해서 넣는 로직 start
           */
          const date = new Date(viewData.date);
          const day = date.getDate();

          const match = counts
            .unwrap()
            .find((countData) => countData.day === day);

          const uniqueVideoCount = match ? match.uniqueVideoCount : 0;
          /**
           * 날짜 매칭 해서 넣는 로직 end
           */
          return {
            ...viewData,
            uniqueVideoCount,
          };
        });

        return Ok({ success: true, data });
      }
      if (counts.isErr()) {
        return Err(counts.unwrapErr());
      }
      return Err(res.unwrapErr());
    } catch (e) {
      return Err(e);
    }
  }
}
