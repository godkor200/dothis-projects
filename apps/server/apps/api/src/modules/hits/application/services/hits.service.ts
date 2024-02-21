import { VideoOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { HitsInboundPort } from '@Apps/modules/hits/domain/ports/hits.inbound.port';
import { FindDailyViewsV1Dto } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { SearchRelationVideoAndHistoryDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { Inject } from '@nestjs/common';
import { VIDEO_IGNITE_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { Err, Ok } from 'oxide.ts';
import { VideoAggregateService } from '@Apps/modules/video/application/service/video.aggregate.service';
import { TFindDailyView } from '@Apps/modules/hits/application/queries/get-daily-hits.v1.query-handler';

export class HitsService implements HitsInboundPort {
  constructor(
    @Inject(VIDEO_IGNITE_DI_TOKEN)
    private readonly videoAdapter: VideoOutboundPort,

    private readonly videoAggregateService: VideoAggregateService,
  ) {}

  async calculateDailyHitsMetrics(
    props: FindDailyViewsV1Dto,
  ): Promise<TFindDailyView> {
    const dao = new SearchRelationVideoAndHistoryDao(props);
    const res = await this.videoAdapter.getRelatedVideoAndVideoHistory(dao);

    if (res.isOk()) {
      const hitsData = this.videoAggregateService.calculateIncreaseByIgnite(
        res.unwrap(),
      );
      const counts = await this.videoAdapter.getRelatedVideosCountByDay(dao);

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
    return Err(res);
  }
}
