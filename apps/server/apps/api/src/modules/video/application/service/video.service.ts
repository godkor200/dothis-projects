import { VideoOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { VideoServiceInterface } from '@Apps/modules/video/domain/ports/video.service.interface';
import { FindDailyViewsV1Dto } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { SearchRelationVideoAndHistoryDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { Inject } from '@nestjs/common';
import { VIDEO_IGNITE_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { TFindDailyView } from '@Apps/modules/hits/application/queries/find-daily-view.v1.query-handler';

import { Err, Ok } from 'oxide.ts';
import { VideoAggregateService } from '@Apps/modules/video/application/service/video.aggregate.service';

export class VideoService implements VideoServiceInterface {
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
      const data = this.videoAggregateService.calculateIncreaseByIgnite(
        res.unwrap(),
      );
      return Ok({ success: true, data });
    }
    return Err(res);
  }
}
