import { VideoOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { VideoServiceInterface } from '@Apps/modules/video/interfaces/video.service.interface';
import { FindDailyViewsV1Dto } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { SearchRelationVideoAndHistoryDao } from '@Apps/modules/hits/infrastructure/daos/video.dao';
import { Inject } from '@nestjs/common';
import { VIDEO_IGNITE_DI_TOKEN } from '@Apps/modules/video/constants/video.di-token';

export class VideoService implements VideoServiceInterface {
  constructor(
    @Inject(VIDEO_IGNITE_DI_TOKEN)
    private readonly videoAdapter: VideoOutboundPort,
  ) {}

  async getRelatedVideoAndHistory(props: FindDailyViewsV1Dto) {
    const dao = new SearchRelationVideoAndHistoryDao(props);
    const res = await this.videoAdapter.getRelatedVideoAndVideoHistory(dao);
    return res;
  }
}
